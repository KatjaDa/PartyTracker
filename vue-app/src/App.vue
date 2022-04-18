<template>
  <div id="app" class="small-container">
    <!-- <addForm /> -->
    <h1>Events</h1>
    <event-form @add:events="addEvent" />
    <event-table :events="events" />
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
    addEvent(event) {
      const id = 1;
      const newEvent = { ...event, id };
      this.events = [...this.events, newEvent];
    },
    handleSubmit() {
      this.$emit('add:events', this.event)
      console.log('handleSubmit click EvenForm.vue')
    },
  },
  data() {
    // TÄNNE PITÄISI LISÄTÄ DATA TIETOKANNASTA????
    return {
      events: [
        {id: 1, name: "Tuska", date:"220701", time:"14:00", address: "Suvilahti", city:"Helsinki"},
        {id: 2, name: "Flow", date:"220701", time:"14:00", address: "Suvilahti", city:"Helsinki"},
        {id: 3, name: "Nummirock", date:"220622", time:"14:00", address: "Nummijärvi", city:"Kauhajoki"},
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
