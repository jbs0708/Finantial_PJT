<template>
  <div>
    <div>
      <v-autocomplete
      v-model="selectedBank"
      :items="bankOptions"
      label="은행 선택"
      clearable
    ></v-autocomplete>
      <input type="text" v-model="customBank" placeholder="직접 검색" @keyup.enter="searchCustomBank" />
      <button @click="moveToCurrentLocation">현재 위치로 이동 및 은행 검색</button>
    </div>
    <div id="map"></div>
    <div v-if="selectedPlace" class="detail-container">
        <v-card>
          <v-card-title>{{ selectedPlace.place_name }}</v-card-title>
          <v-card-subtitle>{{ selectedPlace.road_address_name }}</v-card-subtitle>
          <v-card-text>
            <p><strong>전화번호:</strong> {{ selectedPlace.phone }}</p>
            <p><strong>영업시간:</strong> {{ selectedPlace.opening_hours }}</p>
          </v-card-text>
        </v-card>
      </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect  } from 'vue';

const selectedBank = ref('');
const customBank = ref('');
const bankOptions = ['신한은행', '국민은행', '우리은행', '하나은행', '농협은행'];
const mapKey = import.meta.env.VITE_KAKAOMAP_API_KEY;
let map = null;
let markers = [];
let ps = null;
let selectedMarker = null;
let selectedInfoWindow = null;  // 선택된 인포윈도우 관리
const selectedPlace = ref(null); // 선택된 장소 정보 저장

const initMap = (lat, lon) => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(lat, lon),
    level: 8,
  };
  map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();

  // 지도 클릭 이벤트 등록
  kakao.maps.event.addListener(map, 'click', function(mouseEvent) {
    const latlng = mouseEvent.latLng;
    setLocation(latlng);
  });
};

const searchPlaces = (lat, lon, bankName) => {
  const loc = new kakao.maps.LatLng(lat, lon);
  const options = {
    location: loc,
    radius: 5000, // 반경 5km
  };
  ps.keywordSearch(bankName || '은행', placesSearchCB, options);
};

const placesSearchCB = (data, status, pagination) => {
  if (status === kakao.maps.services.Status.OK) {
    removeMarkers();
    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i]);
    }
  } else {
    alert('검색 결과가 없습니다.');
  }
};

const displayMarker = (place) => {
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  kakao.maps.event.addListener(marker, 'click', function () {
    fetchPlaceDetail(place); // 마커 클릭 시 장소 세부 정보 가져오기
  });

  markers.push(marker);
};

const removeMarkers = () => {
  for (let i = 0; i < markers.length; i++) {
    markers[i].setMap(null);
  }
  markers = [];
};

const moveToCurrentLocation = () => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;
      const currentLon = position.coords.longitude;
      const currentPos = new kakao.maps.LatLng(currentLat, currentLon);
      map.setCenter(currentPos);

      // 기존 마커 제거
      removeMarkers();

      // 현재 위치에 마커 추가
      const marker = new kakao.maps.Marker({
        map: map,
        position: currentPos,
      });
      markers.push(marker);

      const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;font-size:12px;">현재 위치</div>',
      });
      infowindow.open(map, marker);

      // 현재 위치 주변 은행 검색
      searchPlaces(currentLat, currentLon, selectedBank.value || customBank.value);
    });
  } else {
    alert('현재 위치를 찾을 수 없습니다.');
  }
};

const setLocation = (latlng) => {
  map.setCenter(latlng);

  // 기존 마커 및 인포윈도우 제거
  if (selectedMarker) {
    selectedMarker.setMap(null);
    selectedMarker = null;
  }
  if (selectedInfoWindow) {
    selectedInfoWindow.close();
    selectedInfoWindow = null;
  }

  // 클릭 위치에 마커 추가
  selectedMarker = new kakao.maps.Marker({
    map: map,
    position: latlng,
  });

  selectedInfoWindow = new kakao.maps.InfoWindow({
    content: '<div style="padding:5px;font-size:12px;">선택한 위치</div>',
  });
  selectedInfoWindow.open(map, selectedMarker);

  // 선택한 위치 주변 은행 검색
  searchPlaces(latlng.getLat(), latlng.getLng(), selectedBank.value || customBank.value);
};

const searchSelectedBank = () => {
  if (selectedMarker) {
    const banks = selectedBank.length > 0 ? selectedBank.join(',') : customBank.value;
    console.log(banks);
    searchPlaces(selectedMarker.getPosition().getLat(), selectedMarker.getPosition().getLng(), banks);
  } else {
    moveToCurrentLocation();
  }
};


watchEffect(() => {
  searchSelectedBank();
});

const searchCustomBank = () => {
  if (selectedMarker) {
    // 선택한 위치에서 은행 검색
    searchPlaces(selectedMarker.getPosition().getLat(), selectedMarker.getPosition().getLng(), customBank.value);
  } else {
    moveToCurrentLocation();
  }
};

const fetchPlaceDetail = (place) => {
  selectedPlace.value = {
    place_name: place.place_name,
    road_address_name: place.road_address_name,
    phone: place.phone,
    opening_hours: place.opening_hours || '정보 없음',
  };
};

onMounted(async () => {
  if (window.kakao && window.kakao.maps) {
    initMap(35.1010816, 128.8503296); // 초기 위치는 35.1010816,128.8503296
  } else {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${mapKey}&libraries=services`;
    document.head.appendChild(script);
    script.onload = () => kakao.maps.load(() => initMap(35.1010816, 128.8503296));
  }
});
</script>

<style scoped>
#map {
  width: 45rem;
  height: 45rem;
  border-radius: 10px;
  margin: 0 auto;
}

button {
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: white;
  border-radius: 5px;
  cursor: pointer;
  margin-left: 5px;
}

button:hover {
  background-color: #0056b3;
}

select, input[type="text"] {
  padding: 10px;
  margin-right: 10px;
  border-radius: 5px;
}

div#info {
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f9f9f9;
}
</style>
