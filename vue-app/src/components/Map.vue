<template>
  <div id="map">
    <p>Map goes here</p>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
//import L from "leaflet";
export default {
  name: "Map-map",
  data() {
    return{
    }
    },
  methods: {
    setupLeafletMap: function () {
      console.log("Hello");
    },
  },
  mounted() {
    this.setupLeafletMap();
  },
}

</script>

<style scoped>
</style>