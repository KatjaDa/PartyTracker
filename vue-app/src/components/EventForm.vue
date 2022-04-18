
<template>
  <div id="event-form">
    <form @submit.prevent="handleSubmit">
      <label>Event name</label>
      <input v-model.trim="event.name" type="text" placeholder="add event name" />
      <label>Date</label>
      <input v-model.trim="event.date" type="text" placeholder="add event date DDMMYY"/>
      <label>Time</label>
      <input v-model.trim="event.time" type="text" placeholder="add event time XX:XX"/>
      <label>Address</label>
      <input v-model.trim="event.address" type="text" placeholder="add event address"/>
      <label>City</label>
      <input v-model.trim="event.city" type="text" placeholder="add event city"/>
      <button>Add Event</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'event-form',
  data() {
    return {
      event: {
        name: '',
        date: '',
        time: '',
        address: '',
        city: '',
      },
    }
  },
  methods: {
    handleSubmit() {
      this.$emit('add:events', this.event)
      console.log('handleSubmit click EvenForm.vue')
    },
  },
}
</script>

<style scoped>
form {
  margin-bottom: 2rem;
}
</style>