from rest_framework import serializers
from .models import DepositProducts, DepositOptions,SavingProducts,SavingOptions

class DepositOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositOptions
        fields = '__all__'
        read_only_fields = ('deposit_product',)

class DepositProductsSerializer(serializers.ModelSerializer):
    deposit_options = DepositOptionsSerializer(many=True,read_only=True)
    class Meta:
        model = DepositProducts
        fields = '__all__'


class SavingOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingOptions
        fields = '__all__'
        read_only_fields = ('saving_product',)

class SavingProductsSerializer(serializers.ModelSerializer):
    saving_options = SavingOptionsSerializer(many=True,read_only=True)
    class Meta:
        model = SavingProducts
        fields = '__all__'

