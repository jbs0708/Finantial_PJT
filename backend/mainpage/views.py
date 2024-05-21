from django.shortcuts import render
import re as ree
import json
from django.http import JsonResponse 

# 웹 크롤링을 위해
import requests
from bs4 import BeautifulSoup
from selenium import webdriver

# Create your views here.
import os
import sys
import urllib.request
import urllib.parse
from django.conf import settings

def get_news(request):
    # 네이버 API 요청을 위한 키와 시크릿 키
    client_id = "sI4FriO0gPQB1huOSMZF"
    client_secret =  settings.ARTICLE_API_KEY
    
    # 검색할 키워드
    keyword = "금융"
    
    # 검색할 키워드를 URL 인코딩
    enc_keyword = urllib.parse.quote(keyword)
    
    # 네이버 검색 API 요청 URL
    url = f"https://openapi.naver.com/v1/search/blog.json?query={enc_keyword}"
    
    # API 요청 헤더 설정
    headers = {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": settings.ARTICLE_API_KEY
    }
    
    # API 요청 및 응답 처리
    try:
        req = urllib.request.Request(url, headers=headers)
        response = urllib.request.urlopen(req)
        
        # 응답 데이터 읽기
        res_json = response.read().decode("utf-8")
        
        # JSON 형태로 변환하여 반환
        return JsonResponse(json.loads(res_json))
    
    except Exception as e:
        # 에러가 발생할 경우 에러 메시지를 JSON 형태로 반환
        return JsonResponse({"error": str(e)})