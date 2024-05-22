import json
import requests
import urllib.request
import urllib.parse
from django.shortcuts import render
from django.http import JsonResponse
from django.conf import settings

client_id = "sI4FriO0gPQB1huOSMZF"
client_secret = settings.ARTICLE_API_KEY
def get_news(request):
    # 네이버 API 요청을 위한 키와 시크릿 키
    
    # 검색할 키워드
    keyword = "금융"
    
    # 검색할 키워드를 URL 인코딩
    enc_keyword = urllib.parse.quote(keyword)
    
    # 네이버 뉴스 검색 API 요청 URL
    url = f"https://openapi.naver.com/v1/search/news.json?query={enc_keyword}"
    
    # API 요청 헤더 설정
    headers = {
        "X-Naver-Client-Id": client_id,
        "X-Naver-Client-Secret": client_secret
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


import json
import urllib.request
from django.http import JsonResponse

def get_stock_info(request):
    # 주식 종목 코드 리스트
    item_codes = ["005930", "000660", "373220", "207940", "005380"]
    
    try:
        # 각 주식 정보를 담을 리스트 초기화
        stock_data_list = []
        
        for item_code in item_codes:
            url = "https://m.stock.naver.com/api/stock/%s/integration" % (item_code)
            
            # urllib.request를 통해 링크의 결과를 가져옵니다.
            raw_data = urllib.request.urlopen(url).read()
            # 추후, 데이터 가공을 위해 json 형식으로 변경합니다.
            json_data = json.loads(raw_data)

            # 필요한 정보 추출
            stock_name = json_data['stockName']
            current_price = json_data['dealTrendInfos'][0]['closePrice']
            marketSum_value = next((code['value'] for code in json_data['totalInfos'] if code['code'] == 'marketValue'), None)
            per_value_str = next((i['value'] for i in json_data['totalInfos'] if i['code'] == 'per'), None)
            pbr_value_str = next((v['value'] for v in json_data['totalInfos'] if v['code'] == 'pbr'), None)
            yesterday_price = next((info['value'] for info in json_data['totalInfos'] if info['code'] == 'lastClosePrice'), None)
            start_price = next((info['value'] for info in json_data['totalInfos'] if info['code'] == 'openPrice'), None)
            high_price = next((info['value'] for info in json_data['totalInfos'] if info['code'] == 'highPrice'), None)
            low_price = next((info['value'] for info in json_data['totalInfos'] if info['code'] == 'lowPrice'), None)
            trading_volume = next((info['value'] for info in json_data['totalInfos'] if info['code'] == 'accumulatedTradingVolume'), None)
            
            # 각 주식 정보를 딕셔너리에 저장
            stock_data = {
                "stockCode": item_code,
                "stockName": stock_name,
                "currentPrice": current_price,
                "marketSum": marketSum_value,
                "PER": per_value_str,
                "PBR": pbr_value_str,
                "yesterdayPrice": yesterday_price,
                "startPrice": start_price,
                "highPrice": high_price,
                "lowPrice": low_price,
                "tradingVolume": trading_volume
            }
            
            # 리스트에 주식 정보 추가
            stock_data_list.append(stock_data)
        
        # 전체 주식 정보를 JSON 형태로 반환
        return JsonResponse(stock_data_list, safe=False)
    
    except Exception as e:
        # 에러가 발생할 경우 에러 메시지를 JSON 형태로 반환
        return JsonResponse({"error": str(e)})
                    