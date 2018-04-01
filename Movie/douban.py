# coding:utf-8
import requests
import MySQLdb
from lxml import html
import sys

reload(sys)

#connect to MySQL
db = MySQLdb.connect(host='localhost', user='root', passwd='wqc960630', db="dmovie")


k = 1
for i in range(10):
    url = 'https://movie.douban.com/top250?start={}&filter='.format(i * 25)
    con = requests.get(url).content
    sel = html.fromstring(con)

    # 所有的信息都在class属性为info的div标签里，可以先把这个节点取出来
    for i in sel.xpath('//div[@class="info"]'):
        # 影片名称
        title = i.xpath('div[@class="hd"]/a/span[@class="title"]/text()')[0]

        info = i.xpath('div[@class="bd"]/p[1]/text()')
        # 导演演员信息
        info_1 = info[0].replace(" ", "").replace("\n", "")
        # 上映日期
        date = info[1].replace(" ", "").replace("\n", "").split("/")[0]
        # 制片国家
        country = info[1].replace(" ", "").replace("\n", "").split("/")[1]
        # 影片类型
        genres = info[1].replace(" ", "").replace("\n", "").split("/")[2]
        # 评分
        rate = i.xpath('div[@class="bd"]/div[@class="star"]/span[2]/text()')[0]
        # 评论人数
        comCount = i.xpath('//div[@class="star"]/span[4]/text()')[0]

        # 打印结果看看
        # print "TOP%s" % str(k)
        k += 1
        # print title, info_1, rate, date, country, genres, comCount

        # 存入数据库
        # 解决中文
        db.set_character_set('utf8')
        sql = "insert into top(name,actor,genre,rate,country) values('%s','%s','%s','%s','%s')" % (title,info_1,genres,rate,country)
        cursor = db.cursor()
        cursor.execute('SET NAMES utf8;')
        cursor.execute('SET CHARACTER SET utf8;')
        cursor.execute('SET character_set_connection=utf8;')

        try:
            cursor.execute(sql)
            db.commit()
            print 'success', k
        except Exception, error :
            db.rollback()
            print error
        cursor.close()








