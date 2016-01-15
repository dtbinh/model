__author__ = 'sapphire'
from pymongo import MongoClient,collection,database
con=MongoClient("localhost",27017)
db=database.Database(con,'mydb')
def insert_bus_data(data):
    db.model.insert_one(data)
def update_bus_data(no,data):
    db.model.replace_one({'bus_id':no},data,True)