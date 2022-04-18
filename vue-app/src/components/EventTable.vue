<template>
  <div id="event-table">
    <table>
      <!-- ...thead... -->
      <tbody>
      <tr v-for="event in events" :key="event.id">
        <td>{{ event.name }}</td>
        <td>{{ event.date }}</td>
        <td>{{ event.time }}</td>
        <td>{{ event.address }}</td>
        <td>{{ event.city }}</td>
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