import os
import random
data=[]
for i in range(30):
	data.append({'pd':random.randint(30,60),'qd':random.randint(30,60),'pg':random.randint(30,60),'qg':random.randint(30,60)})
f=open('bus_data.log','w+')
for i in range(len(data)):
	f.writelines('"pd":'+str(data[i]['pd'])+', "qd":'+str(data[i]['qd'])+', "pg":'+str(data[i]['pg'])+ ',"qg":'+str(data[i]['qg'])+'\r\n')