<template>
  <div id="event-table">
    <p v-if="events.length < 1" class="empty-table">No events</p>
    <table v-else>
      <thead>

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
  }
}
</script>

<style scoped>

</style>