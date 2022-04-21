<template>
  <div id="app" class="small-container">
    <!-- <addForm /> -->
    <h1>Events</h1>
    <event-form @add:events="addEvent" />
    <event-table
        :events="events"
        @delete:event="deleteEvent"
        @edit:event="editEvent"/>
  </div>
</template>

<script>
// import addForm from '@/components/Addform.vue'
import EventTable from '@/components/EventTable'
import EventForm from "@/components/EventForm";

export default {
  name: 'app',
  components: {
    EventTable,
    EventForm,
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
button {
  background: #009435;
  border: 1px solid #009435;
}

.small-container {
  max-width: 680px;
}

</style>
