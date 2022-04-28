<template>
  <section id="app">
    <div id =navbar>

      <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
        <div class="container-fluid">
          <a class="navbar-brand" href="#">PartyTracker</a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <a class="nav-link active" aria-current="page" href="#navbar">Home</a>
              <!-- Toggle between Edit mode & User mode -->
              <a id="AddEventNav" class="nav-link" href="#event-form" v-on:click="showitem=true">Add & edit events</a>
              <a id="SearchEventNav" class="nav-link" href="#event-table" v-on:click="showitem=false">Search events</a>
            </div>
          </div>
        </div>
      </nav>
    </div>
    <i-images/>
    <section id="content">
      <!-- Toggle between Edit mode & User mode, v-if showItem is true, Edit mode will be shown, if false then User mode -->
     <section v-if="showitem" id="addEvents">
    <event-form
        @add:events="addEvent"
        @addall:events="getAllEvents"
    />
       <event-table
           :events="events"
           @delete:event="deleteEvent"
           @edit:event="editEvent"
       />
     </section>
      <section v-if="!showitem" id ="searchEvents">
        <search-event
            @search:event="searchEventsByDate"
            @search2:event="searchEventsByCity"
            @addall:events="getAllEvents"
        />
      <event-table
        :events="events"
        @delete:event="deleteEvent"
        @edit:event="editEvent"
    />
      <map-map/>
      </section>
    </section>
    <footer-bar/>
  </section>
</template>

<script>
import EventTable from '@/components/EventTable'
import EventForm from "@/components/EventForm";
import FooterBar from "@/components/FooterBar";
import MapMap from "@/components/Map";
import SearchEvent from "@/components/SearchEvent";
import IImages from "@/components/Images";


export default {
  name: 'app',
  props:{

},
  components: {
    IImages,
    MapMap,
    EventTable,
    EventForm,
    FooterBar,
    SearchEvent,
  },
  methods: {
    // Adds event to event-table
    addEvent(event) {
      const id = 1;
      const newEvent = { ...event, id };
      this.events = [...this.events, newEvent];
    },
    // edits event that is in the event-table
    editEvent (id, updateEvent){
      this.events = this.events.map(event =>
          event.id === id ? updateEvent : event)
    },
    // deletes event that is in the event-table
    deleteEvent(id) {
      this.events = this.events.filter(
          event => event.id !== id
      )
    },
    // submitting form, button add event clicked in event-form
    handleSubmit() {
      this.$emit('add:events', this.event)
      console.log('handleSubmit click')
    },

    getAllEvents: function () {
      this.events.splice(0);
      let baseurl = "http://localhost:8081/api/parties";
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", baseurl, true);
      xmlhttp.send();
      this.searchEvent(xmlhttp)

    },

    searchEventsByDate: function (mindate, maxdate) {
      this.events.splice(0);
      let baseurl = "http://localhost:8081/api/parties/date";
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", baseurl + "?min=" + mindate + "&max=" + maxdate, true);
      xmlhttp.send();
      this.searchEvent(xmlhttp)

    },

    searchEventsByCity: function (city){
      this.events.splice(0);
      let baseurl = "http://localhost:8081/api/parties/city";
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", baseurl + "?city="+ city);
      xmlhttp.send();
      this.searchEvent(xmlhttp);
    },

    searchEvent: function(xmlhttp) {
      let self = this;
      xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200) {
          /*tallentaa "specificEvents" muuttujaan saadut tiedot tietokannasta
          * Pitäisikö taulu tyhjentää, kun tiedot etsitään, ja lisätä sen jälkeen löydetyt tiedot taulukkoon?*/
          let specificEvents = JSON.parse(xmlhttp.responseText);

          for(let i = 0; i < specificEvents.length; i++){
            let eventId = specificEvents[i].id;
            let eventName = specificEvents[i].name;
            let eventDate = specificEvents[i].date;
            console.log(eventDate);
            let eventTime = specificEvents[i].time;
            let eventAddress = specificEvents[i].address;
            let eventCity = specificEvents[i].city;
            let xcoord = specificEvents[i].x;
            let ycoord = specificEvents[i].y;

            self.events.push({id: eventId, name: eventName, date: eventDate.slice(0, 10), time: eventTime, address: eventAddress, city: eventCity, x: xcoord, y: ycoord});
          }
        }
      }
    },
    mounted() {
    this.getAllEvents();
    console.log("heh");
    },

  },
  data() {
    return {
      showitem: false,
      events: [
        {id: 1, name: "Tuska", date:"220701", time:"14:00", address: "Suvilahti", city:"Helsinki", xcoord:"65.11", ycoord:"65.1"},
        {id: 2, name: "Flow", date:"220701", time:"14:00", address: "Suvilahti", city:"Helsinki", xcoord:"65.11", ycoord:"65.1"},
        {id: 3, name: "Nummirock", date:"220622", time:"14:00", address: "Nummijärvi", city:"Kauhajoki", xcoord:"65.11", ycoord:"65.1"},
      ],
    }
  },
}

</script>

<style>
</style>
