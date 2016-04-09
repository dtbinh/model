__author__ = 'sapphire'
from django.conf.urls import patterns, url
import views
urlpatterns = patterns('cps.views',
    #url(r'^get_data$','get_data'),
    url(r'^get_bus$','get_bus'),
    url(r'^get_branch$','get_branch'),
    url(r'^get_all_bus','get_all_bus'),
    url(r'^get_all_branch','get_all_branch'),
    url(r'^command','command')
    )