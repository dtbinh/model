from django.conf.urls import include, url
from django.contrib import admin
import settings
urlpatterns = [
    # Examples:
    # url(r'^$', 'map.views.home', name='home'),
    # url(r'^blog/', include('blog.urls')),
    url(r'^cps/',include('cps.urls')),
    url(r'(?P<path>.*)$', 'django.views.static.serve',{'document_root':settings.BASE_DIR+"/web"}),
    url(r'^admin/', include(admin.site.urls))
]
