__author__ = 'sapphire'
from pymongo import MongoClient,collection,database
import  random

import xml.dom.minidom
def writexml(data):
    V = random.random() * 2 + data['va']
    I = data['pd'] / V
    DOMTree = xml.dom.minidom.parse("pdata.xml")
    tree = DOMTree.documentElement
    for i in range(6):
        devices = tree.getElementsByTagName("DEVICE_" + str(i + 1))
        items = devices[0].getElementsByTagName("item")
        for item in items:
            if item.getAttribute('D_LABEL') == 'Inst Van':
                item.setAttribute('D_VALUE',str(V + random.random() * 2) + 'k')
            elif item.getAttribute('D_LABEL') == 'Inst Vbn':
                item.setAttribute('D_VALUE',str(V + random.random() * 2) + 'k')
            elif item.getAttribute('D_LABEL') == 'Inst Vcn':
                item.setAttribute('D_VALUE',str(V + random.random() * 2) + 'k')
            elif item.getAttribute('D_LABEL') == 'Inst Ia':
                item.setAttribute('D_VALUE',str(I + random.random() * 2))
            elif item.getAttribute('D_LABEL') == 'Inst Ib':
                item.setAttribute('D_VALUE',str(I + random.random() * 2))
            elif item.getAttribute('D_LABEL') == 'Inst Ic':
                item.setAttribute('D_VALUE',str(I + random.random() * 2))
        f = open("pdata_x.xml",'w')
        f.write(DOMTree.toxml())
        f.close()

con=MongoClient("localhost",27017)
db=database.Database(con,'mydb')
def insert_bus_data(data):
    db.model.insert_one(data)


def update_bus_data(no,data):
    db.model.replace_one({'bus_id':no},data,True)
    writexml(data)
