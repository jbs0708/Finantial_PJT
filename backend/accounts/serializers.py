from rest_framework import serializers
from .models import User, DetailUser
from rest_framework import serializers
from django.contrib.auth import get_user_model
from compare_deposit.serializers import DepositOptionsSerializerCall, SavingOptionsSerializerCall

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email')

class UserDetailSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only = True)
    
    class Meta:
        model = DetailUser
        fields = '__all__'



class UserJoinListSerializer(serializers.ModelSerializer):
    deposit_list = serializers.SerializerMethodField()
    saving_list = serializers.SerializerMethodField()
    
    class Meta:
        model = User
        fields = ('deposit_list', 'saving_list')

    def get_deposit_list(self, obj):
        return DepositOptionsSerializerCall(obj.join_deposit.all(), many=True).data

    def get_saving_list(self, obj):
        return SavingOptionsSerializerCall(obj.join_saving.all(), many=True).data