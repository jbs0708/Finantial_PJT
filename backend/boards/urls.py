from django.urls import path
from boards import views


urlpatterns = [
    path('articles/', views.article_list),
    path('my_articles/', views.my_article_list),
    path('article_detail/<int:article_pk>/', views.article_detail),
    path('comment_create/<int:article_pk>/', views.comment_create),
    path('comment_detail/<int:article_pk>/<int:comment_pk>/', views.comment_detail),
]