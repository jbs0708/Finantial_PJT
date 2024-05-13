from django.urls import path
from . import views


urlpatterns = [
    path('userdetail/', views.userDetail_list),
    path('withdraw/', views.delete_user),
    path('checkUserID/', views.checkUserID)
]