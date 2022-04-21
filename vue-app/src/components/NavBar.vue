<template>
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
          <a class="nav-link" href="#event-form">Add a new event</a>
          <a class="nav-link" href="#event-table">List of events</a>
        </div>
      </div>
    </div>
  </nav>
</div>
</template>

<script>
export default {
  name: "nav-bar"
}
</script>

<style scoped>

</style>