from django.urls import path
from . import views

urlpatterns = [
    path('deposit_product/',views.deposit_product),
    path('deposit_product/call/',views.deposit_call),
    path('saving_product/',views.saving_product),
]

