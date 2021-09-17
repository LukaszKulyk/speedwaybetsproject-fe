<template>
    <b-form @submit="sendEmail" @reset="onReset" v-if="show">
            <b-form-group
                id="input-group-1"
                label="Email address:"
                label-for="input-1"
                description="We'll never share your email with anyone else. We need it just to give you an answer."
            >
                <b-form-input
                id="input-1"
                v-model="form.email"
                type="email"
                placeholder="Enter email"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-2" label="Your Name:" label-for="input-2">
                <b-form-input
                id="input-2"
                v-model="form.name"
                placeholder="Enter name"
                required
                ></b-form-input>
            </b-form-group>

            <b-form-group id="input-group-3" label="Type:" label-for="input-3">
                <b-form-select
                id="input-3"
                v-model="form.type"
                :options="types"
                required
                description="What is the type of your message?"
                ></b-form-select>
            </b-form-group>

            <!---<b-form-group id="input-group-4" label="Message:" label-for="input-4">
                <b-form-input
                id="input-2"
                v-model="form.message"
                placeholder="Enter the message"
                size="lg"
                word-break
                required
                ></b-form-input>
            </b-form-group>--->

            <!---<b-form-group id="input-group-4" label="Message:" label-for="input-4">
                <b-form-textarea
                type='text'
                style='width:100%'
                rows='5'
                id="input-4"
                v-model="form.message"
                placeholder="Enter the message"
                size="lg"
                required
                ></textarea>
            </b-form-group>--->

            <b-form-group id="input-group-4" label="Message:" label-for="input-4">
                <b-form-textarea
                rows='5'
                max-rows='10'
                id="input-4"
                v-model="form.message"
                placeholder="What would like to tell us?"
                size="lg"
                required
                ></b-form-textarea>
            </b-form-group>

            <b-button type="submit" variant="primary">Submit</b-button>
            <b-button type="reset" variant="danger">Reset</b-button>
        </b-form>
</template>
<script>
/* eslint-disable */
import emailjs from 'emailjs-com'
emailjs.init('user_4iwTimrS4zS6UOR90kgp3')

export default {
    data() {
      return {
        form: {
          email: '',
          name: '',
          type: null,
          //checked: [],
          message: ''
        },
        types: [{ text: 'Select One', value: null }, 'Feedback', 'Question', 'Complain', 'Other'],
        show: true
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        // Reset our form values
        this.form.email = ''
        this.form.name = ''
        this.form.type = null
        this.form.message = ''
        //this.form.checked = []
        // Trick to reset/clear native browser form validation state
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      sendEmail(e) {
          //console.log(this.form)
          const formToBeSend = this.form
          console.log(formToBeSend)
          try {
              emailjs.sendForm('service_rke8a2t', 'template_hpn52ev', e.target, 'user_4iwTimrS4zS6UOR90kgp3', {
                  reply_to_email: formToBeSend.email,
                  from_name: formToBeSend.name,
                  type: formToBeSend.type,
                  message: formToBeSend.message
              })
          } catch(error) {
              console.log({error})
          }
          //Reset form field
          this.form.email = ''
          this.form.name = ''
          this.form.type = null
          this.form.message = ''
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