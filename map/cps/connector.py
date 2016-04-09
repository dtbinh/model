__author__ = 'sapphire'
#coding=utf-8
import copy
BUSNUM=9
from pymongo import MongoClient,collection,database
con=MongoClient("localhost",27017)
db=database.Database(con,'mydb')
#collection.Collection(db,'sensor')
def get_bus_data(bus_id):
    '''
    :param bus_id:
    :return:[id,status,type,pd,qd,pg,qg,vm,va]
    '''
    return db.sensor.find_one({'bus_id':bus_id})
def get_all_data():
    return db.sensor.find().limit(BUSNUM)
def get_att_data(bus_id):
    '''
    :param bus_id:
    :return:[id,status,type,pd,qd,pg,qg,vm,va]
    '''
    return db.att.find_one({'bus_id':bus_id})
def get_lock():
    return db.lock.find()[0]['lock']
for i in  get_all_data():
     print i