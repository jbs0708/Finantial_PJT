import requests
from django.shortcuts import render
from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import api_view

# Create your views here.
# API_KEY = settings.API_KEY

# BASE_URL = 'http://finlife.fss.or.kr/finlifeapi/'

# @api_view(['GET'])
# def api_test(request):
#     URL = BASE_URL + 'depositProductsSearch.json'
#     params = {
#         'auth': settings.API_KEY,
#         'topFinGrpNo' : '020000',
#         'pageNo':1
#     }
#     respones = requests.get(URL,params=params).json()
#     return JsonResponse({'respones':respones})