<template>
  <div id="container">
    <div id="mapContainer"></div>
  </div>
</template>
<script>
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import {Icon} from 'leaflet'

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
    return {
      center: [60.166640739, 24.9493536799],
      map: null,
      marker: null
    }
  },
  methods: {

    setupLeafletMap: function () {
      // Setting the map view to coordinates given in center
      this.map = L.map("mapContainer").setView(this.center, 13);
      //adding map tile and views to map
      L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=3UTld98zTRPZcQ6xuZKv', {
        attribution:
            'Map data (c) <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>,' +
            'Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
      }).addTo(this.map);

      this.marker = L.marker([30, 30]);
      this.marker.setOpacity(0);
      this.map.addLayer(this.marker);
      //adding scaling to map

      L.control.scale().addTo(this.map);
    },

    setupMarkerToMap: function (eventInfo) {
      this.map.removeLayer(this.marker);
      let eventText = "Event name: " + eventInfo[0].name + "<br>Event address: " + eventInfo[0].address + "<br>Event date: " + eventInfo[0].date + "<br>Event city: " + eventInfo[0].city + "<br>Event time: " + eventInfo[0].time;
      this.marker = L.marker([eventInfo[0].x, eventInfo[0].y]);
      this.map.setView([eventInfo[0].x, eventInfo[0].y], 16)
      this.map.addLayer(this.marker);
      let text = `
        <p>${eventText}</p>
            <div style="text-align:center">
            </div>`;
      this.marker.bindPopup(text);

    },

    showEventOnMap(data) {
      console.log(data);
      let baseurl = "http://localhost:8081/api/parties/id";
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", baseurl + "?id=" + data, true);
      xmlhttp.send();
      let self = this;

      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {

          let specificEvents = JSON.parse(xmlhttp.responseText);

          let eventName = specificEvents[0].name;
          let eventDate = specificEvents[0].date;
          let eventTime = specificEvents[0].time;
          let eventAddress = specificEvents[0].address;
          let eventCity = specificEvents[0].city;
          let xcoord = specificEvents[0].x;
          let ycoord = specificEvents[0].y;
          console.log(xcoord + " " + ycoord);
          let eventInformation = [];
          eventInformation.push({
            name: eventName,
            date: eventDate.slice(0, 10),
            time: eventTime,
            address: eventAddress,
            city: eventCity,
            x: xcoord,
            y: ycoord
          });
          self.setupMarkerToMap(eventInformation)


        }
      }
    },
  },


  mounted() {
    this.setupLeafletMap();
    this.emitter.on("send-data", data => {
      this.showEventOnMap(data);
    })
  },
};
</script>

<style scoped>
#mapContainer {
  height: 80vh;
}
</style>