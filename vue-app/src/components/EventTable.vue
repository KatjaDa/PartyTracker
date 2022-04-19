<template>
  <div id="event-table">
    <p v-if="events.length < 1" class="empty-table">No events</p>
    <table v-else>
      <thead>
      <tr>
        <th>Event name</th>
        <th>Event date</th>
        <th>Event time</th>
        <th>Event address</th>
        <th>Event city</th>
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
        <button @click="editEvent(event)">Save</button>
        <button class="muted-button" @click="editing = null">Cancel</button>
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