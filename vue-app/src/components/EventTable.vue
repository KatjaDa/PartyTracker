<template>
  <div id="event-table">
    <h2>Search for events</h2>
    <p v-if="events.length < 1" class="empty-table">No events</p>
    <table v-else>
      <thead>

      <label>Min date:</label>
      <input ref="mindate" type="text" placeholder="Ex: 2022-01-01"/>
      <br><label>Max date:</label>
      <input ref="maxdate" type="text" placeholder="2022-12-01"/>
      <br>
      <button @click="searchEvent()">Search events</button>
      <h2>Events</h2>
      <tr>
        <th>Event name</th>
        <th>Event date</th>
        <th>Event time</th>
        <th>Event address</th>
        <th>Event city</th>
        <th v-if="editing != null" >Event X coordinate</th>
        <th v-if="editing != null" >Event Y coordinate</th>
        <th>Actions</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="event in events" :key="event.id">
        <td v-if="editing === event.id">
          <input type="text" v-model="event.name">
        </td>
        <td v-else>{{ event.name }}</td>
        <td v-if="editing === event.id">
          <input type="text" v-model="event.date">
        </td>
        <td v-else>{{ event.date }}</td>
        <td v-if="editing === event.id">
          <input type="text" v-model="event.time">
        </td>
        <td v-else>{{ event.time }}</td>
        <td v-if="editing === event.id">
          <input type="text" v-model="event.address">
        </td>
        <td v-else>{{ event.address }}</td>
        <td v-if="editing === event.id">
          <input type="text" v-model="event.city">
        </td>
        <td v-else>{{ event.city }}</td>
        <td v-if="editing === event.id">
          <input type="text" v-model="event.xcoord">
        </td>
        <td v-if="editing === event.id">
          <input type="text" v-model="event.ycoord">
        </td>
        <td v-if="editing === event.id">
        <button id="saveBtn" @click="editEvent(event)">Save</button>
        <button id="cancelBtn" class="muted-button" @click="editing = null">Cancel</button>
        </td>
        <td v-else>
          <button @click="editMode(event.id)">Edit</button>
          <button @click="$emit('delete:event', event.id)">Delete</button>
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
export default {
  name: "event-table",
  props: {
    events: Array,
  },
  data () {
    return {
      editing: null,
    }
  },
  methods: {
    editMode(id){
      this.editing = id;
    },
    editEvent(event){
      if (event.name ==='' || event.date === '') return
      this.$emit('edit:event', event.id, event)
      this.editing = null
    },
    searchEvent(){
      let mindate = this.$refs.mindate.value;
      let maxdate = this.$refs.maxdate.value;
  let baseurl = "http://localhost:8081/api/parties/date";
  let xmlhttp = new XMLHttpRequest();
  xmlhttp.open("GET",baseurl + "?min="+mindate+"&max="+maxdate,true);
  xmlhttp.onreadystatechange = function () {
    if(xmlhttp.readyState ===4 && xmlhttp.status ===200){
      /*tallentaa "specificEvents" muuttujaan saadut tiedot tietokannasta
      * Pitäisikö taulu tyhjentää, kun tiedot etsitään, ja lisätä sen jälkeen löydetyt tiedot taulukkoon?*/
      let specificEvents = JSON.parse(xmlhttp.responseText);
      console.log(specificEvents);
    }
  }
  xmlhttp.send();
    },
  }
}
</script>

<style scoped>

</style>