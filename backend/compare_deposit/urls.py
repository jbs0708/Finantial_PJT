from django.urls import path
from . import views

urlpatterns = [
    path('deposit_product/',views.deposit_product),
    path('deposit_product/detail/<str:fin_prdt_cd>/',views.deposit_product_detail),
    path('deposit_product/call/',views.deposit_call),
    path('saving_product/',views.saving_product),
    path('saving_product/call/',views.saving_call),
    path('saving_product/detail/<str:fin_prdt_cd>/',views.saving_product_detail),

    path('<str:fin_prdt_cd>/joins_deposit/', views.deposit_joins),
    path('<str:fin_prdt_cd>/joins_deposit_check/', views.check_joins_user_deposit),
    path('<str:fin_prdt_cd>/joins_saving/', views.saving_joins),
    path('<str:fin_prdt_cd>/joins_saving_check/', views.check_joins_user_saving)
]

