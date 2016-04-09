from django.db import models

# Create your models here.

class Bus(models.Model):
    bus_id = models.IntegerField('id',max_length=5)
    type = models.CharField('type', max_length=50)
    status = models.IntegerField('status', max_length=1)
    Pd=models.FloatField('Pd')
    Qd=models.FloatField('Qd')
    Pg=models.FloatField('Pg')
    Qg=models.FloatField('Qg')
    Vm=models.FloatField('Vm')
    Va=models.FloatField('Va')
    def __unicode__(self):
        return  '%d %s %d %f %f %f %f %f %f' %\
                (self.id,self.type,self.status,self.Pd,self.Qd,self.Pg,self.Qg,self.Vm,self.Va)
class Branch(models.Model):
    bus_id=models.IntegerField('id',max_length=5)
    status=models.IntegerField('status',max_length=1)
    Pf=models.FloatField('Pf')
    Qf=models.FloatField('Qf')
    Pt=models.FloatField('Pt')
    Qt=models.FloatField('Qt')
    injection=models.FloatField('injection')
    def __unicode__(self):
        return  '%d %s %f %f %f %f %f' %\
                (self.id,self.status,self.Pf,self.Qf,self.Pt,self.Qt,self.injection)
