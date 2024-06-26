import requests
from django.shortcuts import render
from django.shortcuts import get_object_or_404
from django.conf import settings
from django.http import JsonResponse

from rest_framework.response import Response
from rest_framework.decorators import api_view

from django.contrib.auth import get_user_model
from accounts.models import DetailUser
from rest_framework.decorators import permission_classes
from rest_framework.permissions import IsAuthenticated

from .models import DepositProducts,DepositOptions,SavingProducts,SavingOptions
from .serializers import DepositProductsSerializer,DepositOptionsSerializer,SavingOptionsSerializer,SavingProductsSerializer,DepositOptionsSerializerCall,SavingOptionsSerializerCall,DepositProductDetailSerializer,SavingProductDetailSerializer

# Create your views here.
# API_KEY = settings.API_KEY

BASE_URL = 'http://finlife.fss.or.kr/finlifeapi/'
# 예금 상품 API 호출
@api_view(['GET'])
def deposit_product(request):
    URL = BASE_URL + 'depositProductsSearch.json'
    params = {
        'auth': settings.API_KEY,
        'topFinGrpNo' : '020000',
        'pageNo':1
    }
    response = requests.get(URL,params=params).json()
    baseLists = response['result']['baseList']
    optionLists = response['result']['optionList']
    for baseList in baseLists:
       if not DepositProducts.objects.filter(fin_prdt_cd=baseList.get('fin_prdt_cd')).exists():
            serializer = DepositProductsSerializer(data = baseList)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

    for optionList in optionLists:
        deposit_product = DepositProducts.objects.get(fin_prdt_cd = optionList.get('fin_prdt_cd'))
        serializer = DepositOptionsSerializer(data=optionList)
        if serializer.is_valid(raise_exception=True):
            serializer.save(deposit_product=deposit_product)

    return JsonResponse({'message':'okay'})

# 예금 상품 조회
@api_view(['GET'])
def deposit_call(request):
    deposit_products = DepositOptions.objects.all()
    respo = DepositOptionsSerializerCall(deposit_products,many=True).data
    return Response(respo)

# 예금 상품 옵션 조회
@api_view(['GET'])
def deposit_options(request, fin_prdt_cd):
    deposit_products = DepositOptions.objects.filter(fin_prdt_cd=fin_prdt_cd)
    respo = DepositOptionsSerializerCall(deposit_products,many=True).data
    return Response(respo)

# 적금 상품 API 호출
@api_view(['GET'])
def saving_product(request):
    URL = BASE_URL + 'savingProductsSearch.json'
    params = {
        'auth': settings.API_KEY,
        'topFinGrpNo' : '020000',
        'pageNo':1
    }
    response = requests.get(URL,params=params).json()
    baseLists = response['result']['baseList']
    optionLists = response['result']['optionList']

    for baseList in baseLists:
        if not SavingProducts.objects.filter(fin_prdt_cd=baseList.get('fin_prdt_cd')).exists():
            serializer = SavingProductsSerializer(data = baseList)
            if serializer.is_valid(raise_exception=True):
                serializer.save()

    for optionList in optionLists:
        saving_product = SavingProducts.objects.get(fin_prdt_cd = optionList.get('fin_prdt_cd'))
        serializer = SavingOptionsSerializer(data=optionList)
        if serializer.is_valid(raise_exception=True):
            serializer.save(saving_product=saving_product)

    # return JsonResponse({'response':response})
    return JsonResponse({'message':'okay'})

# 적금 상품 조회
@api_view(['GET'])
def saving_call(request):
    saving_products = SavingOptions.objects.all()
    respo = SavingOptionsSerializerCall(saving_products,many=True).data
    return Response(respo)

# 적금 상세 옵션 조회
@api_view(['GET'])
def saving_options(request, fin_prdt_cd):
    saving_products = SavingOptions.objects.filter(fin_prdt_cd=fin_prdt_cd)
    respo = SavingOptionsSerializerCall(saving_products,many=True).data
    return Response(respo)

# 예금 상세 조회
@api_view(['GET'])
def deposit_product_detail(request, fin_prdt_cd):
    deposit_product = get_object_or_404(DepositProducts, fin_prdt_cd=fin_prdt_cd)
    detail = DepositProductDetailSerializer(deposit_product).data
    return Response(detail)

# 적금 상세 조회
@api_view(['GET'])
def saving_product_detail(request, fin_prdt_cd):
    saving_product = get_object_or_404(SavingProducts, fin_prdt_cd=fin_prdt_cd)
    detail = SavingProductDetailSerializer(saving_product).data
    return Response(detail)


# 적금 가입
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def saving_joins(request, fin_prdt_cd, save_trm, rsrv_type):
    saving = SavingOptions.objects.get(fin_prdt_cd=fin_prdt_cd, save_trm=save_trm, rsrv_type=rsrv_type)
    if request.user in saving.join_users.all():
        saving.join_users.remove(request.user)
        joined = False
    else:
        saving.join_users.add(request.user)
        joined = True
    return Response({'joined': joined})

# 적금 가입여부 조회
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def check_joins_user_saving(request, fin_prdt_cd, save_trm, rsrv_type):
    saving = SavingOptions.objects.get(fin_prdt_cd=fin_prdt_cd, save_trm=save_trm, rsrv_type=rsrv_type)
    if request.user in saving.join_users.all():
        return Response({'user' : True})
    else:
        return Response({'user': False})


# 예금 가입
@permission_classes([IsAuthenticated])
@api_view(['POST'])
def deposit_joins(request, fin_prdt_cd, save_trm):
    deposit = DepositOptions.objects.get(fin_prdt_cd=fin_prdt_cd, save_trm=save_trm)
    print(deposit)
    if request.user in deposit.join_users.all():
        deposit.join_users.remove(request.user)
        joined = False
    else:
        deposit.join_users.add(request.user)
        joined = True
    return Response({'joined': joined})


# 예금 가입여부 조회
@permission_classes([IsAuthenticated])
@api_view(['GET'])
def check_joins_user_deposit(request, fin_prdt_cd, save_trm):
    deposit = DepositOptions.objects.get(fin_prdt_cd=fin_prdt_cd, save_trm=save_trm)
    if request.user in deposit.join_users.all():
        print('-----------------------아니 뭐가 문젠데?')
        return Response({'user' : True})
    else:
        print('-----------------------말을해봐')
        return Response({'user': False})