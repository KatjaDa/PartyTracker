
<template>
  <div id="event-form">
    <form @submit.prevent="handleSubmit">
      <label>Event name</label>
      <input ref="first" v-model.trim="event.name" type="text" placeholder="add event name"
          :class="{ 'has-error': submitting && invalidName }"
             @focus="clearStatus"
             @keypress="clearStatus">
      <br>
      <label>Date</label>
      <input v-model.trim="event.date" type="text" placeholder="add event date DDMMYY"
             :class="{ 'has-error': submitting && invalidDate }"
             @focus="clearStatus"/>
      <br>
      <label>Time</label>
      <input v-model.trim="event.time" type="text" placeholder="add event time XX:XX"
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
      },
    }
  },

  methods: {
    // Validating form fields max length
      checkValidation (){
      let valid = true;
      if (this.event.name > 50 || this.event.time > 6 || this.event.address > 51 || this.event.city > 26){
        valid = false;
        console.log("validation failed, :"+this.event.name+", "+this.event.time+", "+this.event.address+", "+this.event.city)
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
      // focus on firs element after adding
      this.$refs.first.focus()
      this.event = {
        name: '',
        date: '',
        time: '',
        address: '',
        city: '',
      }
      this.error = false
      this.success = true
      this.submitting = false
    },

    clearStatus() {
      this.success = false
      this.error = false
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