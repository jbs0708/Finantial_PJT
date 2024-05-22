from django.urls import path
from . import views

urlpatterns = [
    path('article/', views.get_news),
    path('stock/', views.get_stock_info),
 
]
