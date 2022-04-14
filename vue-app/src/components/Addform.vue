<script setup>
import { ref } from 'vue'
const header = ref('Add event')
const eventsHeader = ref('List of events')
// tähän tulisi lisätä tietokannasta tulevat tiedot!!! Nyt kovakoodattu
const eventsData = ref([
  {id: 1, name: "Tuska", date:"220701", time:"14:00", address: "Suvilahti", city:"Helsinki"},
  {id: 2, name: "Flow", date:"220701", time:"14:00", address: "Suvilahti", city:"Helsinki"},
  {id: 3, name: "Nummirock", date:"220622", time:"14:00", address: "Nummijärvi", city:"Kauhajoki"},
])

const newEvent = ref(
    {id: "", newName: "", newDate:"", newTime:"", newAddress: "", newCity:""},
)
</script>

<template>
  <!--  -->
  <h1>{{ header}}</h1>
  <!--trim removes whitespace around-->

  <label>Event name:</label>
  <input v-model.trim="newEvent.newName" type="text" placeholder="add event name">
  <br>
  <label>Event date:</label>
  <input v-model.trim="newEvent.newDate" type="text" placeholder="add event date DDMMYY">
  <br>
  <label>Event time:</label>
  <input v-model.trim="newEvent.newTime" type="text" placeholder="add event time XX:XX">
  <br>
  <label>Event address:</label>
  <input v-model.trim="newEvent.newAddress" type="text" placeholder="add event address">
  <br>
  <label>Event city:</label>
  <input v-model.trim="newEvent.newCity" type="text" placeholder="add event city">
  <br>
  <button v-on:click="eventsData.push({id: eventsData.length+1., newName, newDate, newTime, newAddress, newCity : newEvent })" class="btn">
    Save Event
  </button>
  <br>
  {{newEvent}}
  <br>

  <!-- lista johon haetaan eventsData taulussa olevat tiedot ja tulostetaan ne näkyviin -->
  <h2>{{eventsHeader}}</h2>
  <ul>
    <li v-for="{id, date, name, address} in eventsData" :key ="id">{{name +" " +date+" "+address}}</li>
  </ul>
</template>

<script>
export default {
  name: 'add-form',
}
</script>