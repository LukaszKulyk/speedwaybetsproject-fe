<template>
  <div>
    <div v-if="this.$store.getters.getCurrentAuthStatus === 'success'">
        <h3>New User has been created succesfully! You can now login and have fun!</h3>
    </div>
    <div v-if="this.$store.getters.getCurrentAuthStatus === 'error'">
        <h3>Something went wrong. Maybe email or username is already taken???</h3>
    </div>
    <b-form v-if="this.$store.getters.loggedIn === false" action="#" @submit.prevent="register">
        <b-form-group id="email-input-group" label="Email Adress" label-for="email-input" description="Please write an email.">
            <b-form-input id="email-input" v-model="user.email" type="email" required placeholder="email"></b-form-input>
        </b-form-group>
        <b-form-group id="username-input-group" label="Username" label-for="username-input" description="Please write your username.">
            <b-form-input id="username-input" v-model="user.username" type="text" required placeholder="username"></b-form-input>
        </b-form-group>
        <b-form-group id="password-input-group" label="Password" label-for="password-input" description="Please write your password.">
            <b-form-input id="password-input" v-model="user.password" type="password" required placeholder="password"></b-form-input>
        </b-form-group>
        <b-button type="submit" variant="success">Register</b-button>
        <b-button variant="danger">Clear</b-button>
    </b-form>
  </div>
</template>

<script>
/* eslint-disable */
export default {
    data() {
        return {
            user:{
                email: '',
                username: '',
                password: ''
            },
            submitted: false,
            //registerStatus: '',
            /*translations: {
                eng: 'Game Week',
                pol: 'Kolejka',
                lem: 'Teper'
            },
            bet: {
                nickName: '',
                games: {
                    first: {
                        homeTeamPoints: '',
                        awayTeamPoints: ''
                    },
                    second: {
                        homeTeamPoints: '',
                        awayTeamPoints: ''
                    },
                    third: {
                        homeTeamPoints: '',
                        awayTeamPoints: ''
                    },
                    fourth: {
                        homeTeamPoints: '',
                        awayTeamPoints: ''
                    },
                }
            }*/
        }
    },
    computed: {
		titleValidation() {
			return this.user.username.length > 0
		}
	},
	methods: {
		register() {
				this.$store.dispatch('createNewUser', {
					email: this.user.email,
					userName: this.user.username,
					password: this.user.password,
				})
					.then(this.submitted = true);
		},
		onReset() {
			this.user.email = ''
			this.user.username = ''
			this.user.password = ''
		}
	}
    /*methods: {
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
        this.form.password = ''
        // Trick to reset/clear native browser form validation state
        this.show = true
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
    }*/
}
</script>
<style>
* {box-sizing: border-box;}

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

input[type=text], [type=email], textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
  margin-top: 6px;
  margin-bottom: 16px;
  resize: vertical;
}

input[type=submit] {
  background-color: #4CAF50;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=submit]:hover {
  background-color: #45a049;
}

input[type=reset] {
  background-color: #dd211a;
  color: white;
  padding: 12px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

input[type=reset]:hover {
  background-color: #b91904;
}

label {
    padding: 5px;
}

.score-input-size {
    size: "sm";
}

b-form-row {
    width: 100%;
}

div {
    width: 100%;
}

</style>
