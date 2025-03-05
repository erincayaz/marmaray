<template>
  <div class="d-flex justify-content-center align-items-center vh-100">
    <div class="form-container p-5 shadow">
      <h1 class="mb-4 text-center">Marmaray Saatleri</h1>
      <div class="mb-3">
        <label for="station" class="form-label">Bulunduğunuz Durak</label>
        <select v-model="selectedStation" id="station" class="form-select">
          <option v-for="station in stations" :key="station" :value="station">
            {{ station }}
          </option>
        </select>
      </div>
      <div class="mb-3">
        <label for="direction" class="form-label">Gidilecek Yön</label>
        <select v-model="selectedDirection" id="direction" class="form-select">
          <option v-for="direction in directions" :key="direction" :value="direction">
            {{ direction }}
          </option>
        </select>
      </div>
      <div v-if="trainTimes.length > 0" class="mt-4">
        <h5 class="text-center">Next Trains</h5>
        <ul class="list-group">
          <li class="list-group-item text-center" v-for="(time, index) in trainTimes" :key="index">
            {{ time }}
          </li>
        </ul>
      </div>
      <div v-else class="mt-4 text-center text-muted">
        <p>Tren saatlerini görmek için bulunduğunuz durağı ve gidilecek yönü seçiniz.</p>
      </div>
    </div>
    <!-- GitHub Icon with Bootstrap Tooltip -->
    <a href="https://github.com/erincayaz/marmaray" target="_blank" class="github-icon" data-bs-toggle="tooltip" title="Öneriler ve hatalar için">
      <img src="/github.png" alt="GitHub Icon" class="icon-img" />
    </a>
  </div>
</template>

<script>
import { stations } from './constant';
import { getNextTrainTime } from './fetch';
import { Tooltip } from 'bootstrap';

export default {
  data() {
    return {
      stations: stations,
      directions: ["Gebze", "Halkali"],
      selectedStation: null,
      selectedDirection: null,
      trainTimes: []
    };
  },
  watch: {
    selectedStation: "fetchTrainTimes",
    selectedDirection: "fetchTrainTimes"
  },
  methods: {
    async fetchTrainTimes() {
      if (this.selectedStation && this.selectedDirection) {
        const nextTrains = await getNextTrainTime(this.selectedStation, this.selectedDirection);
        this.trainTimes = nextTrains;
      } else {
        this.trainTimes = [];
      }
    }
  },
  mounted() {
    // Initialize Bootstrap tooltips
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    tooltipTriggerList.forEach((tooltipEl) => new Tooltip(tooltipEl));
  }
};
</script>

<style>
.form-container {
  width: 100%;
  max-width: 500px;
  background-color: #fff;
  border-radius: 8px;
}
body {
  background-color: #f8f9fa;
}
.github-icon {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
}
.icon-img {
  width: 30px;
  height: 30px;
  transition: transform 0.2s;
}
.icon-img:hover {
  transform: scale(1.1);
}
</style>
