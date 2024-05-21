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
    <v-row>
      <v-col cols="9">
        <div id="map"></div>
      </v-col>
      <v-col cols="3">
        <div class="detail-container">
          <div
            v-for="place in places"
            :key="place.id"
            :class="{ 'highlighted': place.id === highlightedPlaceId }"
            class="place-card"
          >
            <v-card>
              <v-card-title>{{ place.place_name }}</v-card-title>
              <v-card-subtitle>{{ place.road_address_name }}</v-card-subtitle>
              <v-card-text>
                <p><strong>전화번호:</strong> {{ place.phone }}</p>
                <p><strong>영업시간:</strong> {{ place.opening_hours }}</p>
              </v-card-text>
            </v-card>
          </div>
        </div>
      </v-col>
    </v-row>
  </div>
</template>

<script setup>
import { ref, onMounted, watchEffect } from 'vue';

const selectedBank = ref('');
const customBank = ref('');
const bankOptions = ['신한은행', '국민은행', '우리은행', '하나은행', '농협은행'];
const mapKey = import.meta.env.VITE_KAKAOMAP_API_KEY;
let map = null;
let markers = [];
let ps = null;
let selectedMarker = null;
let selectedInfoWindow = null;
const places = ref([]); // 검색된 장소들을 저장
const highlightedPlaceId = ref(null); // 강조할 장소의 ID
let mapReady = false;

onMounted(async () => {
  if (window.kakao && window.kakao.maps) {
    initMap(35.1010816, 128.8503296);
  } else {
    const script = document.createElement('script');
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${mapKey}&libraries=services&autoload=false`;
    document.head.appendChild(script);
    script.onload = () => {
      kakao.maps.load(() => {
        initMap(35.1010816, 128.8503296);
      });
    };
  }
});

const initMap = (lat, lon) => {
  const container = document.getElementById('map');
  const options = {
    center: new kakao.maps.LatLng(lat, lon),
    level: 8,
  };
  map = new kakao.maps.Map(container, options);
  ps = new kakao.maps.services.Places();
  mapReady = true;

  kakao.maps.event.addListener(map, 'click', function (mouseEvent) {
    const latlng = mouseEvent.latLng;
    setLocation(latlng);
  });
};

const searchPlaces = (lat, lon, bankName) => {
  const loc = new kakao.maps.LatLng(lat, lon);
  const options = {
    location: loc,
    radius: 5000,
  };
  ps.keywordSearch(bankName || '은행', placesSearchCB, options);
};

const placesSearchCB = (data, status, pagination) => {
  if (status === kakao.maps.services.Status.OK) {
    removeMarkers();
    places.value = []; // 검색 결과를 초기화
    for (let i = 0; i < data.length; i++) {
      displayMarker(data[i], i);
      fetchPlaceDetail(data[i], i);
    }
  } else {
    alert('검색 결과가 없습니다.');
  }
};

const displayMarker = (place, index) => {
  const marker = new kakao.maps.Marker({
    map: map,
    position: new kakao.maps.LatLng(place.y, place.x),
  });

  kakao.maps.event.addListener(marker, 'click', function () {
    highlightedPlaceId.value = index; // 클릭된 마커에 해당하는 장소 ID를 저장
    map.panTo(new kakao.maps.LatLng(place.y, place.x)); // 선택된 마커로 지도 이동
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
  if (!mapReady) {
    return;
  }

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const currentLat = position.coords.latitude;
      const currentLon = position.coords.longitude;
      const currentPos = new kakao.maps.LatLng(currentLat, currentLon);
      map.setCenter(currentPos);

      removeMarkers();

      const marker = new kakao.maps.Marker({
        map: map,
        position: currentPos,
      });
      markers.push(marker);

      const infowindow = new kakao.maps.InfoWindow({
        content: '<div style="padding:5px;font-size:12px;">현재 위치</div>',
      });
      infowindow.open(map, marker);

      searchPlaces(currentLat, currentLon, selectedBank.value || customBank.value);
    });
  } else {
    alert('현재 위치를 찾을 수 없습니다.');
  }
};

const setLocation = (latlng) => {
  map.setCenter(latlng);

  if (selectedMarker) {
    selectedMarker.setMap(null);
    selectedMarker = null;
  }
  if (selectedInfoWindow) {
    selectedInfoWindow.close();
    selectedInfoWindow = null;
  }

  selectedMarker = new kakao.maps.Marker({
    map: map,
    position: latlng,
  });

  selectedInfoWindow = new kakao.maps.InfoWindow({
    content: '<div style="padding:5px;font-size:12px;">선택한 위치</div>',
  });
  selectedInfoWindow.open(map, selectedMarker);

  searchPlaces(latlng.getLat(), latlng.getLng(), selectedBank.value || customBank.value);
};

const searchSelectedBank = () => {
  if (selectedMarker) {
    const banks = selectedBank.length > 0 ? selectedBank.join(',') : customBank.value;
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
    searchPlaces(selectedMarker.getPosition().getLat(), selectedMarker.getPosition().getLng(), customBank.value);
  } else {
    moveToCurrentLocation();
  }
};

const fetchPlaceDetail = (place, index) => {
  ps.keywordSearch(place.place_name, (data, status) => {
    if (status === kakao.maps.services.Status.OK && data.length > 0) {
      const detail = data[0];
      places.value[index] = {
        id: index,
        place_name: detail.place_name,
        road_address_name: detail.road_address_name,
        phone: detail.phone,
        opening_hours: detail.opening_hours || '정보 없음',
      };
    } else {
      places.value[index] = {
        id: index,
        place_name: place.place_name,
        road_address_name: place.road_address_name,
        phone: '정보 없음',
        opening_hours: '정보 없음',
      };
    }
  });
};
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

.detail-container {
  margin-top: 20px;
  height: 45rem;
  overflow-y: scroll;
}

.place-card {
  margin-bottom: 10px;
}

.highlighted {
  border: 2px solid #007bff;
  background-color: #e6f0ff;
}
</style>
