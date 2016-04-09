
from django.shortcuts import render
#coding=utf-8
import socket
def Get_local_ip():
 try:
  csock = socket.socket(socket.AF_INET, socket.SOCK_DGRAM)
  csock.connect(('8.8.8.8', 80))
  (addr, port) = csock.getsockname()
  csock.close()
  return addr
 except socket.error:
  return "127.0.0.1"
ip=Get_local_ip()
from django.http import HttpResponse
import copy
from data_templates import *
import json
from connector import get_bus_data,get_all_data,get_att_data,get_lock
import socket
import random
import os
BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
path=BASE_DIR.replace('map','/log/log_operation')
f=open(path+'/log_operation','a')
bus_num=9
import time

PORT=50007
s=socket.socket(socket.AF_INET,socket.SOCK_STREAM)
# BRANCH=[{"status": 1,"type": 3,'fbus':0,'tbus':0,"pf":0,"qf":0,"pt":0,"qt":0} for k in range(9)]
BUS=[{} for i in range(bus_num)]
BRANCH=[{} for i in range(len(branch_data))]
attacked=[1,8]
import datetime
import time
def format_all_bus_data(data):
    '''
    :param data:data from mongodb
    :return:
    '''
    tmp=copy.deepcopy(feature_collection)
    for item in data:
        BUS[item['bus_id']-1]=item
        if item['type']==2 or item['type']==3:
            tmp2=format_Gen_data(item)
            tmp2["properties"]['pgmax']=P_max[item['gen_id']]
            tmp['features'].append(tmp2)

        elif item['type']==1:
            tmp2=format_Load_data(item)
            tmp['features'].append(tmp2)
        else:
            pass
        #att=get_att_data(item['bus_id'])
        #if att['attack']==1:
        #    tmp2["properties"]['attacked']=1
    return tmp
def get_time_for_chart():
    bus_idw=datetime.datetime.now()
    return [str((bus_idw-datetime.timedelta(seconds=3*i)).minute)+":"+str((bus_idw-datetime.timedelta(seconds=3*i)).second) for i in range(7)]

def format_all_branch_data(data):
    tmp=copy.deepcopy(feature_collection)
    for item in branch_data:
        tmp3=format_Branch_data(item[0],item[1],item[2],BUS[item[1]-1],BUS[item[2]-1])
        BRANCH[item[0]-1]=tmp3["properties"]
        tmp['features'].append(tmp3)
    #print 'bran num is',len(tmp['features'])
    return tmp

def format_Load_data(data):
    '''
    :param data:[id,status,type,pd,qd,pg,qg,vm,va]
    :return:a feature
    '''
    tmp=copy.deepcopy(Load_features)
    p_t_sum=0
    p_f_sum=0
    for i in data['branchdata']:
        if i[0]==1:
            p_f_sum+=i[5]
        elif i[0]==0:
            p_t_sum+=i[5]
    tmp["properties"]['realGet']=-(p_t_sum+p_f_sum)
    # if data['bus_id']==3:
    #     print data['branchdata']
    #     print p_f_sum,p_t_sum
    if data['status']==0:
        print "here is 0"
        tmp["properties"]['Status']=0
    elif (float(tmp["properties"]['realGet'])/(float(data['pd'])+0.1))>=1.0:
        tmp["properties"]['Status']=4
    elif (float(tmp["properties"]['realGet'])/(float(data['pd'])+0.1))>=0.7:
        tmp["properties"]['Status']=3
    elif (float(tmp["properties"]['realGet'])/(float(data['pd'])+0.1))>=0.4:
        tmp["properties"]['Status']=2
    else:# float(tmp["properties"]['realGet'])/float(data['pd'])>=0:
        tmp["properties"]['Status']=1
    if (data['pd']-tmp["properties"]['realGet'])>=data['pd']/3.0:
        tmp["properties"]['powerDeficit']=1
    else: tmp["properties"]['powerDeficit']=0
    tmp["geometry"]["coordinates"]=x_y[data['bus_id']-1]
    tmp["properties"]['No']=data['bus_id']
    #tmp["properties"]['Status']=data['status']
    tmp["properties"]['Pd']=data['pd']
    tmp["properties"]['Qd']=data['qd']
    tmp["properties"]['Vm']=data['vm']
    tmp["properties"]['Va']=data['va']
    return tmp
def format_Gen_data(data):
    '''
    :param data:[id,status,type,pd,qd,pg,qg,vm,va]
    :return:a feature
    '''
    tmp=copy.deepcopy(Gen_features)
    if abs(P_max[data['gen_id']]-data['pg'])<=10:
        tmp["properties"]['overLoad']=1
    else: tmp["properties"]['overLoad']=0
    if data['status']==0:
        tmp["properties"]['Status']=0
    elif float(data['pg'])/float(P_max[data['gen_id']])>=1.0:
        tmp["properties"]['Status']=4
    elif float(data['pg'])/float(P_max[data['gen_id']])>=0.7:
        tmp["properties"]['Status']=3
    elif float(data['pg'])/float(P_max[data['gen_id']])>=0.4:
        tmp["properties"]['Status']=2
    else:#(data['pg'])/float(P_max[data['gen_id']])>=0:
        tmp["properties"]['Status']=1
    #tmp["properties"]['Status']=data['status']
    tmp["geometry"]["coordinates"]=x_y[data['bus_id']-1]
    tmp["properties"]['No']=data['bus_id']

    tmp["properties"]['Pg']=data['pg']
    tmp["properties"]['Qg']=data['qg']
    tmp["properties"]['Vm']=data['vm']
    tmp["properties"]['Va']=data['va']
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
    for i in bus_f["branchdata"]:
        if i[0]==1 and i[3]==t:
            tmp["properties"]["pf"]=i[5]
            tmp["properties"]["qf"]=i[6]
            tmp["properties"]["status"]=i[1]
    for i in bus_t["branchdata"]:
        if i[0]==0 and i[2]==f:
            tmp["properties"]['pt']=i[5]
            tmp["properties"]['qt']=i[6]
    tmp["properties"]["powerLevel"]=int((abs(tmp["properties"]["pf"])+ abs(tmp["properties"]["pt"]))/70)+1
    if tmp["properties"]["powerLevel"]>7:
        tmp["properties"]["powerLevel"]=7
    return tmp
def get_all_bus(request):
    tmp=format_all_bus_data(get_all_data())
    return HttpResponse(json.dumps(tmp))
def get_all_branch(request):
    tmp=format_all_branch_data(get_all_data())
    return HttpResponse(json.dumps(tmp))
def get_bus(request):
    id=int(request.POST.get('id'))
    type=int(request.POST.get('type'))
    sensorArr=[]
    time_list=get_time_for_chart()
    result={'status':1,'type':1,'title':0,'sensorArr':[],'chartData':{}}
    if type ==1:
            his=get_gen_history()
            lineCharData['labels']=time_list
            result['status']=BUS[id-1]['status']
            sensorArr.append(float("%.5f"%BUS[id-1]['pg']))
            sensorArr.append(float("%.5f"%BUS[id-1]['qg']))
            sensorArr.append(float("%.5f"%BUS[id-1]['va']))
            sensorArr.append(float("%.5f"%BUS[id-1]['vm']))
            for i in range(len(get_gen_key)):
                lineCharData['datasets'][i]['label']='Pg'
                lineCharData['datasets'][i]['data']=his[i]
            result['sensorArr']=sensorArr
            result['title']="gen "+str(id)
            result['chartData']=lineCharData
    elif type==2:
        his=get_load_history()
        lineCharData['labels']=time_list
        result['status']=BUS[id-1]['status']
        sensorArr.append(float("%.5f"%BUS[id-1]['pd']))
        sensorArr.append(float("%.5f"%BUS[id-1]['qd']))
        sensorArr.append(float("%.5f"%BUS[id-1]['va']))
        sensorArr.append(float("%.5f"%BUS[id-1]['vm']))
        for i in range(len(get_load_key)):
                lineCharData['datasets'][i]['label']='Pg'
                lineCharData['datasets'][i]['data']=his[i]
        result['type']=2
        result['sensorArr']=sensorArr
        result['title']="load "+str(id)
        result['chartData']=lineCharData
    elif type==3:
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
        result['chartDatapowerLevel']=lineCharData
    return HttpResponse(json.dumps(result))
def get_branch(request):
    id=request.POST.get('id')
    return HttpResponse(json.dumps(BRANCH[id-1]))
import cPickle
import struct
def command(request):
    x=get_lock()
    if x==1:
        return
    _id=int(request.POST.get('id'))
    type=int(request.POST.get('type'))
    if type==1 or type ==2:
        s=socket.socket()
        s.connect((ip,6399+_id))
        x=struct.pack('3i',_id,type,0)
        s.send(x)
        s.close()
        if(type==2):
            op='shutdown bus'
        else:
            op='start bus'
        ty=1
    elif type==3 or type==4:
        print _id,type,branch_data[_id]
        bus1=socket.socket()
        bus1.connect((ip,6399+branch_data[_id][1]))
        x=struct.pack('3i',branch_data[_id][1],type,_id,)
        bus1.send(x)
        bus1.close()
        if(type==3):
            op='shutdown branch'
        else:
            op='start branch'
        ty=2
    return HttpResponse("success")
def get_load_history():
    return [[float('%.4f'%(120+random.random()*30)) for i in range(7)] for k in range(4)]
def get_gen_history():
    return [[float('%.4f'%(120+random.random()*30)) for i in range(7)] for k in range(4)]
def get_branch_history():
    return [[float('%.4f'%(120+random.random()*30)) for i in range(7)] for k in range(4)]
import cPickle
format_all_bus_data(get_all_data())