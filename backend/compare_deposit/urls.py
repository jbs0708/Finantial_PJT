from django.urls import path
from . import views

urlpatterns = [
    path('deposit_product/',views.deposit_product),
    path('saving_product/',views.saving_product),
]
