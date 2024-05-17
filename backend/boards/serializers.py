from rest_framework import serializers
from .models import Article, Comment
from django.contrib.auth import get_user_model
from accounts.models import DetailUser

User = get_user_model()


class ArticleListSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='user.detailuser.nickname', read_only=True)

    class Meta:
        model = Article
        fields = ('id', 'title', 'content', 'nickname', 'created_at')


class ArticleSerializer(serializers.ModelSerializer):
    nickname = serializers.CharField(source='user.detailuser.nickname', read_only=True)
    userId = serializers.CharField(source='user.username', read_only=True)
    
    class Meta:
        model = Article
        fields = '__all__'
        read_only_fields = ('user',)

class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'
        read_only_fields = ('article', 'user')
