<template>
  <div data-test-id="contact-page">
      <b-container>
          <h1>Contact</h1>
          <ContactFormComponent></ContactFormComponent>
      </b-container>
  </div>
</template>
<script>
/* eslint-disable */
import Spinner from 'vue-simple-spinner'
import ContactFormComponent from '../ContactFormComponent.vue'
//import ContactFormComponent from '../ContactFormComponent.vue'

export default {
  components: { 
    vueSpinner: Spinner,
    ContactFormComponent 
  },
}
</script>