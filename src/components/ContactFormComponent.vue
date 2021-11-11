<template>
<div>
    <b-alert
      data-test-id="message-has-been-sent-alert"
      :show="alert.dismissCountDown"
      dismissible
      variant="success"
      @dismissed="alert.dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >
      <h5>Your message has been sent!</h5>
      <p>This alert will dismiss after {{ alert.dismissCountDown }} seconds...</p>
      <b-progress
        variant="success"
        :max="alert.dismissSecs"
        :value="alert.dismissCountDown"
        height="4px"
      ></b-progress>
    </b-alert>
    <b-form ref="form" @submit.prevent="sendEmail" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else. We need it just to give you an answer."
            >
                <b-form-input
                id="input-1"
                v-model="email"
                name="reply_to_email"
                type="email"
                placeholder="Enter email"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="name"
                name="from_name"
                placeholder="Enter name"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Type:" label-for="input-3">
                <b-form-select
                id="input-3"
                v-model="type"
                name="type"
                :options="types"
                required
                description="What is the type of your message?"
                ></b-form-select>
            </b-form-group>

            <b-form-group id="input-group-4" label="Message:" label-for="input-4">
                <b-form-textarea
                rows='5'
                max-rows='10'
                id="input-4"
                v-model="message"
                name="message"
                placeholder="What would like to tell us?"
                size="lg"
                required
                ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
</div>
</template>
<script>
/* eslint-disable */
import emailjs from 'emailjs-com'
emailjs.init('user_4iwTimrS4zS6UOR90kgp3')

const axios = require('axios')

export default {
    data() {
      return {
        alert: {
          dismissSecs: 5,
          dismissCountDown: 0,
          showDismissibleAlert: false
        },
        email: '',
        name: '',
        type: null,
        message: '',
        types: [{ text: 'Select One', value: null }, 'Feedback', 'Question', 'Complain', 'Other'],
        show: true
      }
    },
    methods: {
      countDownChanged(dismissCountDown) {
        this.alert.dismissCountDown = dismissCountDown
      },
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.email = ''
        this.name = ''
        this.type = null
        this.message = ''
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      sendEmail(event) {
          try {
              emailjs.sendForm('service_rke8a2t', 'template_hpn52ev', this.$refs.form, 'user_4iwTimrS4zS6UOR90kgp3')
              .then(() => {
                this.alert.dismissCountDown = this.alert.dismissSecs
              });
          } catch(error) {
              console.log({error})
          }
          //Reset form field
          this.email = ''
          this.name = ''
          this.type = null
          this.message = ''
      }
    }
}
</script>
<style>
.container {
  display: block;
  margin:auto;
  text-align: center;
  border-radius: 5px;
  background-color: #f2f2f2;
  padding: 20px;
  width: 60%;
  margin-top: 5px;
  margin-bottom: 5px;
}

label {
  float: left;
}

p {
    display: inline-block;
}

div {
    width: 100%;
}

</style>