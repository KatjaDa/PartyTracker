
<template>
  <div id="event-form">
    <h2>Add a event</h2>
    <form @submit.prevent="handleSubmit">
      <label>Event name</label>
      <input ref="first" v-model.trim="event.name" type="text" placeholder="add event name"
          :class="{ 'has-error': submitting && invalidName }"
             @focus="clearStatus"
             @keypress="clearStatus">
      <br>
      <label>Date</label>
      <input v-model.trim="event.date" type="date" placeholder="add event date DDMMYY"
             :class="{ 'has-error': submitting && invalidDate }"
             @focus="clearStatus"/>
      <br>
      <label>Time</label>
      <input v-model.trim="event.time" type="time" placeholder="add event time XX:XX"
             :class="{ 'has-error': submitting && invalidTime }"
             @focus="clearStatus"/>
      <br>
      <label>Address</label>
      <input v-model.trim="event.address" type="text" placeholder="add event address"
             :class="{ 'has-error': submitting && invalidAddress }"
             @focus="clearStatus"/>
      <br>
      <label>City</label>
      <input v-model.trim="event.city" type="text" placeholder="add event city"
             :class="{ 'has-error': submitting && invalidCity }"
             @focus="clearStatus"/>
      <br>
      <label>X-coordinate</label>
      <input v-model.trim="event.x" type="text" placeholder="add event x-coordinate"
             :class="{ 'has-error': submitting}"
             @focus="clearStatus"/>
      <br>
      <label>Y-coordinate</label>
      <input v-model.trim="event.y" type="text" placeholder="add event y-coordinate"
             :class="{ 'has-error': submitting }"
             @focus="clearStatus"/>
      <br>
      <p v-if="error && submitting" class="error-message">❗ Form is filled incorrectly</p>
      <p v-if="success" class="success-message">✅ Event successfully added</p>
      <br>
      <button>Add Event</button>
      <br>
    </form>
  </div>
</template>

<script>
export default {
  name: 'event-form',
  data() {
    return {
      submitting: false,
      error: false,
      success: false,
      event: {
        name: '',
        date: '',
        time: '',
        address: '',
        city: '',
        x:'',
        y:'',
      },
    }
  },

  methods: {
      // Validating form fields max length
      checkValidation (){
      let valid = true;
      if (this.event.name.length > 50 || this.event.time.length > 6 || this.event.address.length > 51 || this.event.city.length > 26){
        valid = false;
        console.log("validation failed, :"+this.event.name+", "+this.event.time+", "+this.event.address+", "+this.event.city)
      }
      // checking if x / y coordinate is empty, if so, then valid returns false
      if (this.event.x <= 0 || this.event.y <= 0 || isNaN(this.event.x) || isNaN(this.event.y)) {
        valid = false;
      }
      return valid;
    },
    // method for checking and handling form submitS
    handleSubmit() {
      this.submitting = true
      this.clearStatus()
      this.checkValidation();
      // checking if fields are empty or form fields are incorrectly filled:
      if (this.invalidName || this.invalidDate || this.invalidTime || this.invalidAddress ||this.invalidCity || this.checkValidation() == false) {
        this.error = true
        return
      }

      this.$emit('add:events', this.event)

      this.addEventToDatabase();

      // focus on firs element after adding
      this.$refs.first.focus()
      this.event = {
        name: '',
        date: '',
        time: '',
        address: '',
        city: '',
        x:'',
        y:'',
      }
      this.error = false
      this.success = true
      this.submitting = false
    },

    clearStatus() {
      this.success = false
      this.error = false
    },

    addEventToDatabase() {
        let xhr = new XMLHttpRequest();
        xhr.open("POST", "http://localhost:8081/api/parties");
        xhr.setRequestHeader("Accept", "application/json");
        xhr.setRequestHeader("Content-Type", "application/json");

        xhr.onload = function() {
          console.log(xhr.responseText);
        }

        let eventString = JSON.stringify(this.event);
        xhr.send(eventString);
    }
  },
    computed: {
    // Datavalidation for empty fields
      invalidName() {
        return this.event.name === ''
      },
      invalidDate() {
        return this.event.date === ''
      },
      invalidTime(){
        return this.event.time === ''
      },
      invalidAddress(){
        return this.event.address === ''
      },
      invalidCity(){
        return this.event.city === ''
      },
    },
}
</script>

<style scoped>
</style>