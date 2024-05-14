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

class DepositProductsSerializerBank(serializers.ModelSerializer):
    class Meta:
        model = DepositProducts
        fields = ('fin_prdt_cd', 'kor_co_nm','fin_prdt_nm')  # 필요한 필드만 선택

class DepositOptionsSerializerCall(serializers.ModelSerializer):
    deposit_product = DepositProductsSerializerBank()  # DepositProductsSerializer를 사용하여 관련 모델의 필드 포함
    class Meta:
        model = DepositOptions
        fields = ('fin_prdt_cd', 'intr_rate_type_nm', 'intr_rate', 'intr_rate2', 'save_trm', 'deposit_product')

