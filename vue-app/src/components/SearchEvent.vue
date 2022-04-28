<template>
  <h2>Search for events</h2>

  <span>Search criteria: </span>
  <select v-model="searchCriteria">
    <option>All</option>
    <option>Date</option>
    <option>City</option>
  </select>

  <section v-if="searchCriteria == 'Date'">
    <label>Min date:</label>
    <input ref="mindate" type="date" value="2022-01-01" placeholder="Ex: 2022-01-01"/>

    <br><label>Max date:</label>
    <input ref="maxdate" type="date" value="2022-12-01" placeholder="2022-12-01"/>
  </section>

  <section v-if="searchCriteria == 'City'">
    <label>Search by city:</label>
    <input ref="city" type="text" value="Helsinki" placeholder="Ex. Helsinki" maxlength="26"/>
  </section>

  <button @click="searchEvents()">Search events</button>
</template>

<script>
export default {
  name: "search-event",

  methods: {
    searchEventsByDate(){
      let mindate = this.$refs.mindate.value;
      let maxdate = this.$refs.maxdate.value;
      this.$emit('search:event', mindate, maxdate);
    },

    searchEventsByCity(){
      let city = this.$refs.city.value;
      let validationError = this.searchEventsValidation(city);
      if (validationError == true) {
        this.$refs.city.value = '';
        this.$refs.city.placeholder = "Search input incorrect!";
      }

      else {
        this.$emit('search2:event', city);
      }
    },

    searchEvents() {
      switch (this.searchCriteria) {
        case 'All':
          this.$emit('addall:events');
          break;
        case 'Date':
          this.searchEventsByDate();
          break;
        case 'City':
          this.searchEventsByCity();
          break;
      }
    },
    searchEventsValidation(city) {
      if(city.length > 26) {
        return true;
      }
      return false;
    }
  },



  data() {
    return {
      searchCriteria: 'All'
    }
  }
}

</script>
<style scoped>
</style>