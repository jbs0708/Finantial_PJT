from rest_framework import serializers
from .models import DepositProducts, DepositOptions,SavingProducts,SavingOptions

# 예금 상품 옵션 API에서 받아오기 위한 serializer
class DepositOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = DepositOptions
        fields = '__all__'
        read_only_fields = ('deposit_product',)

# 예금 상품 API에서 받아오기 위한 serializer
class DepositProductsSerializer(serializers.ModelSerializer):
    deposit_options = DepositOptionsSerializer(many=True,read_only=True)
    class Meta:
        model = DepositProducts
        fields = '__all__'

# 예금 상세정보 가져오기 위한 serializer
class DepositProductDetailSerializer(serializers.ModelSerializer):
    deposit_options = DepositOptionsSerializer(many=True, read_only=True)
    class Meta:
        model = DepositProducts
        fields = '__all__'

# 적금 상품 옵션 API에서 받아오기 위한 serializer
class SavingOptionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = SavingOptions
        fields = '__all__'
        read_only_fields = ('saving_product',)

# 적금 상품 API에서 받아오기 위한 serializer
class SavingProductsSerializer(serializers.ModelSerializer):
    saving_options = SavingOptionsSerializer(many=True,read_only=True)
    class Meta:
        model = SavingProducts
        fields = '__all__'

# 예금 상세정보 가져오기 위한 serializer
class SavingProductDetailSerializer(serializers.ModelSerializer):
    saving_options = SavingOptionsSerializer(many=True, read_only=True)
    class Meta:
        model = SavingProducts
        fields = '__all__'

# 예금 상품 조회를 위한 데이터 병합 과정
class DepositProductsSerializerBank(serializers.ModelSerializer):
    class Meta:
        model = DepositProducts
        fields = ('fin_prdt_cd', 'kor_co_nm','fin_prdt_nm')  
# 예금 상품 조회를 위한 데이터 병합 과정 (실질적으로 view에서 사용)
class DepositOptionsSerializerCall(serializers.ModelSerializer):
    deposit_product = DepositProductsSerializerBank()  
    class Meta:
        model = DepositOptions
        fields = ('fin_prdt_cd', 'intr_rate_type_nm', 'intr_rate', 'intr_rate2', 'save_trm', 'deposit_product','deposit_product_id')


# 적금 상품 조회를 위한 데이터 병합 과정
class SavingProductsSerializerBank(serializers.ModelSerializer):
    class Meta:
        model = SavingProducts
        fields = ('fin_prdt_cd', 'kor_co_nm','fin_prdt_nm')  
# 적금 상품 조회를 위한 데이터 병합 과정 (실질적으로 view에서 사용)
class SavingOptionsSerializerCall(serializers.ModelSerializer):
    saving_product = SavingProductsSerializerBank()  
    class Meta:
        model = SavingOptions
        fields = '__all__'