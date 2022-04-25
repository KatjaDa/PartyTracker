<template>
  <section id="app">
    <nav-bar/>
    <!-- <addForm /> -->
    <i-images/>
    <section id="content">
    <event-form @add:events="addEvent" />
    <search-event
        @search:event="searchEventsByDate"
    />
    <event-table
        :events="events"
        @delete:event="deleteEvent"
        @edit:event="editEvent"
    />
      <map-map/>
    </section>
    <footer-bar/>
  </section>
</template>

<script>
import EventTable from '@/components/EventTable'
import EventForm from "@/components/EventForm";
import NavBar from "@/components/NavBar.vue";
import FooterBar from "@/components/FooterBar";
import MapMap from "@/components/Map";
import SearchEvent from "@/components/SearchEvent";
import IImages from "@/components/Images";


export default {
  name: 'app',
  components: {
    IImages,
    MapMap,
    NavBar,
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

    searchEventsByDate: function (mindate, maxdate) {
      this.events.splice(0);
      let self = this;
      let baseurl = "http://localhost:8081/api/parties/date";
      let xmlhttp = new XMLHttpRequest();
      xmlhttp.open("GET", baseurl + "?min=" + mindate + "&max=" + maxdate, true);
      xmlhttp.send();
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

    }
  },
  data() {
    // TÄNNE PITÄISI LISÄTÄ DATA TIETOKANNASTA????
    return {
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
