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
        <td>{{ event.name }}</td>
        <td>{{ event.date }}</td>
        <td>{{ event.time }}</td>
        <td>{{ event.address }}</td>
        <td>{{ event.city }}</td>
        <td>
          <button>Edit</button>
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
}
</script>

<style scoped>

</style>