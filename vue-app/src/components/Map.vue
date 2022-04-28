<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Icon }  from 'leaflet'

// icons didn't appear without first deleting and then adding:
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png')
});

export default {
  name: "map-map",
  data() {
    return{
      center: [60.166640739, 24.9493536799]
    }},
  methods: {

    setupLeafletMap: function () {
      // Setting the map view to coordinates given in center
      const map = L.map("mapContainer").setView(this.center, 13);
      //adding map tile and views to map
      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=3UTld98zTRPZcQ6xuZKv', {
        attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
            'Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      }).addTo(map);
      // creating a event and binding marker+popup to it
      let eventname ="Test test";
      const marker = L.marker([60.166640739, 24.9493536799]);
      marker.addTo(map);
      let text =`
        <p>${eventname}</p>
            <div style="text-align:center">
            </div>`;
    marker.bindPopup(text);
      //adding scaling to map
      L.control.scale().addTo(map);
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
};
</script>

<style scoped>
#mapContainer {
  height: 80vh;
}
</style>