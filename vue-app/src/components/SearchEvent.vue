<template>
  <h2>Search for events</h2>
  <label>Min date:</label>
  <input ref="mindate" type="text" value="2022-01-01" placeholder="Ex: 2022-01-01"/>
  <br><label>Max date:</label>
  <input ref="maxdate" type="text" value="2022-12-01" placeholder="2022-12-01"/>

  <br>
  <button @click="searchEvents()">Search events</button>
</template>

<script>
export default {
  name: "search-event",


  methods: {

    searchEvents(){
      let mindate = this.$refs.mindate.value;
      let maxdate = this.$refs.maxdate.value;
      this.$root.searchEvents(mindate, maxdate);

    }
  }
}



</script>

<style scoped>

</style>