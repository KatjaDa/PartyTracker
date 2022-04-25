<template>
  <h2>Search for events</h2>
  <label>Min date:</label>
  <input ref="mindate" type="date" value="2022-01-01" placeholder="Ex: 2022-01-01"/>


  <br><label>Max date:</label>
  <input ref="maxdate" type="date" value="2022-12-01" placeholder="2022-12-01"/>

  <label>Search by city:</label>
  <input ref="city" type="text" value="Helsinki" placeholder="Ex. Helsinki"/>


  <br>
  <button @click="searchEventsByDate()">Search events by date</button>

  <button @click="searchEventsByCity()">Search events by city</button>
</template>

<script>
export default {
  name: "search-event",


  methods: {

    searchEventsByDate(){
      let mindate = this.$refs.mindate.value;
      let maxdate = this.$refs.maxdate.value;
      this.$root.searchEventsByDate(mindate, maxdate);

    },

    searchEventsByCity(){
      let city = this.$refs.city.value;
      this.$root.searchEventsByCity(city);
    }
  }
}



</script>

<style scoped>

</style>