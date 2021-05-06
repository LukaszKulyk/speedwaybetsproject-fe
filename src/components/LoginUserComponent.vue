<template>
  <div>
    <div v-if="this.$store.getters.getCurrentAuthStatus === 'error'">
        <h3>{{ $t('loginPage.loginError') }}</h3>
    </div>
    <b-form action="#" @submit.prevent="login">
      <b-form-group id="email" label="Email Adress" label-for="email-input">
        <b-form-input id="email-input" v-model="form.email" type="text" required placeholder="Email"></b-form-input>
      </b-form-group>
      <b-form-group id="password" label="Password" label-for="password-input">
        <b-form-input id="password-input" v-model="form.password" type="password" required placeholder="Password"></b-form-input>
      </b-form-group>
      <b-button id="login-component-button" type="submit">LOGIN</b-button>
    </b-form>
    <span>{{errorMessage}}</span>
  </div>
</template>

<script>
/* eslint-disable */
export default {
  data() {
    return {
      form: {
        email: '',
        password: ''
        },
      errorMessage: ''
    }
  },
  methods:{
    login() {
      var _this = this;
      _this.errorMessage = null;
      this.$store.dispatch('retrieveToken', {
        email: this.form.email,
        password: this.form.password
      })
        .then((response) => {
          if(response.status == 200) {
            this.$router.push('/')
          }
          else {
            _this.errorMessage = response.data.message
          }
        })
    }
  }
}
</script>

<style>
</style>
