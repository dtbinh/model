__author__ = 'sapphire'
from django.shortcuts import render
#coding=utf-8
from django.http import HttpResponse
import copy
from data_templates import *
import json
from connector import get_bus_data,get_all_data
import socket
import random
import time
HOST='127.0.0.1'
PORT=50007
# BRANCH=[{"status": 1,"type": 3,'fbus':0,'tbus':0,"pf":0,"qf":0,"pt":0,"qt":0} for k in range(9)]
BUS=[{} for i in range(9)]
BRANCH=[{} for i in range(9)]
def format_all_bus_data(data):
    '''

    :param data:data from mongodb
    :return:
    '''
    tmp=copy.deepcopy(feature_collection)
    for item in data:
        all_data[item['No']-1]=item
        if item['Type']=='Gen':
            #print "1"
            tmp2=format_Gen_data(item)
            tmp2["properties"]['attacked']=random.randrange(0,2)
            #print tmp2["properties"]
            tmp2["properties"]['overLoad']=random.randrange(0,2)
            tmp2["properties"]['pgmax']=250
            BUS[item['No']-1]=tmp2["properties"]
            tmp['features'].append(tmp2)
        elif item['Type']=='Load':
            #print "2"
            tmp2=format_Load_data(item)
            tmp2["properties"]['realGet']=tmp2["properties"]['Pd']-random.randrange(1,30)
            tmp2["properties"]["powerDeficit"]=random.randrange(0,2)
            BUS[item['No']-1]=tmp2["properties"]
            tmp['features'].append(tmp2)
        else:
            print "item  is", item
    return tmp
def format_all_branch_data(data):
    tmp=copy.deepcopy(feature_collection)
    for i in get_all_data():
        all_data[i['No']-1]=i
    for item in branch_data:
        tmp3=format_Branch_data(item[0],item[1],item[2],all_data[item[1]-1],all_data[item[2]-1])
        BRANCH[item[0]-1]=tmp3["properties"]
        if item[0]==1:
            tmp3["properties"]['status']=0
        tmp3["properties"]['powerLevel']=random.randrange(1,4)
        tmp['features'].append(tmp3)
    return tmp

def format_Load_data(data):
    '''
    :param data:[id,status,type,pd,qd,pg,qg,vm,va]
    :return:a feature
    '''
    tmp=copy.deepcopy(Load_features)
    tmp["geometry"]["coordinates"]=x_y[data['No']-1]
    for key in Bus_key:
        tmp["properties"][key]=data[key]
    return tmp
def format_Gen_data(data):
    '''
    :param data:[id,status,type,pd,qd,pg,qg,vm,va]
    :return:a feature
    '''
    tmp=copy.deepcopy(Gen_features)
    tmp["geometry"]["coordinates"]=x_y[data['No']-1]
    for key in Bus_key:
        tmp["properties"][key]=data[key]
    return tmp
def format_Branch_data(id,f,t,bus_f,bus_t):
    '''
    :param
    :return:a feature
    '''
    tmp=copy.deepcopy(Branch_features)
    tmp["properties"]['id']=id
    tmp["properties"]["fbus"]=f
    tmp["properties"]["tbus"]=t
    tmp["geometry"]["coordinates"]=[x_y[f-1],x_y[t-1]]
    for i in bus_f["TbusData"]:
        if i[0]==t:
            tmp["properties"]["pf"]=i[1]
            tmp["properties"]["qf"]=i[2]
    for i in bus_t["FbusData"]:
        if i[0]==f:
            tmp["properties"]['pt']=i[1]
            tmp["properties"]['qt']=i[2]
    return tmp
def get_all_bus(request):
    tmp=format_all_bus_data(get_all_data())
    #print tmp
    return HttpResponse(json.dumps(tmp))
def get_all_branch(request):
    tmp=format_all_branch_data(get_all_data())
    #print tmp
    return HttpResponse(json.dumps(tmp))
def get_bus(request):
    id=int(request.POST.get('id'))
    type=int(request.POST.get('type'))
    print "id is ",id,type
    #get_bus_data(id)\
    sensorArr=[]
    print id
    time_list=get_time_for_chart()
    result={'status':1,'type':1,'title':0,'sensorArr':[],'chartData':{}}
    if id<=9 and type ==1:
        if BUS[id-1]['Type']==1:
            print "it is a bus"
            his=get_gen_history()
            lineCharData['labels']=time_list
            result['status']=BUS[id-1]['Status']
            for i,key in enumerate(get_gen_key):
                sensorArr.append(float("%.5f"%BUS[id-1][key]))
                lineCharData['datasets'][i]['label']=key
                lineCharData['datasets'][i]['data']=his[i]
            result['sensorArr']=sensorArr
            result['title']="gen "+str(id)
            result['chartData']=lineCharData
    elif id<=9 and type==2:
        if BUS[id-1]['Type']!=2:
            return
        print "it is a load"
        his=get_load_history()
        lineCharData['labels']=time_list
        result['status']=BUS[id-1]['Status']
        for i,key in enumerate(get_load_key):
            sensorArr.append(float("%.5f"%BUS[id-1][key]))
            lineCharData['datasets'][i]['label']=key
            lineCharData['datasets'][i]['data']=his[i]
        result['type']=2
        result['sensorArr']=sensorArr
        result['title']="load "+str(id)
        result['chartData']=lineCharData
    elif type==3:
        print 'type is',type
        result['status']=BRANCH[id-1]['status']
        lineCharData['labels']=time_list
        his=get_branch_history()
        for i,key in enumerate(get_branch_key):
            sensorArr.append(float("%.5f"%BRANCH[id-1][key]))
            lineCharData['datasets'][i]['label']=key
            lineCharData['datasets'][i]['data']=his[i]
        result['type']=3
        result['sensorArr']=sensorArr
        result['title']="branch "+str(id)
        result['chartData']=lineCharData
    return HttpResponse(json.dumps(result))
def get_branch(request):
    id=request.POST.get('id')
    print BRANCH,id
    return HttpResponse(json.dumps(BRANCH[id-1]))
import cPickle
# def shutdown(bus_id):
#     print "begin connect shut"
#     s.connect((HOST,10027))
#     print "shut send be"
#     s.send(cPickle.dumps([1,2]))
#     print "shut send over"
#     s.close()
# def startbus(bus_id):
#     print "begin to connect"
#     s.connect((HOST,10027))
#     print "start send be"
#     s.send(cPickle.dumps([1,1]))
#     print "start send over"
#     s.close()
def command(request):
    bus_id=int(request.POST.get('id'))
    type=int(request.POST.get('type'))
    isMarker=int(request.POST.get('isMarker'))
    s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
    # if type==2:
    #     print "shutdown"
    #     shutdown(bus_id)
    # elif type==1:
    #     print "startup"
    #     startbus(bus_id)
    print "over"
    command_li=[]
    command_li.append(bus_id)
    command_li.append(type)
    print "command is",command_li
    s.connect((HOST,9000+bus_id))
    s.sendall(cPickle.dumps(command_li))
    s.close()
    del s
    return HttpResponse("success")
def get_load_history():
    return [[float('%.4f'%(120+random.random()*30)) for i in range(7)] for k in range(4)]
def get_gen_history():
    return [[float('%.4f'%(120+random.random()*30)) for i in range(7)] for k in range(4)]
def get_branch_history():
    return [[float('%.4f'%(120+random.random()*30)) for i in range(7)] for k in range(4)]
# Create your views here.
# def test_command(id):
#     try:
#         s.connect((HOST,10027))
#         s.sendall(json.dumps([1,2]))
#         s.close()
#     except:
# test_command(1)
import datetime

def get_time_for_chart():
    now=datetime.datetime.now()
    return [str((now-datetime.timedelta(seconds=3*i)).minute)+":"+str((now-datetime.timedelta(seconds=3*i)).second) for i in range(7)]