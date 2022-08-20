<template>
  <div class="login">
    <b-container>
      <b-row v-if="isUser">
        <b-col class="login__error" col="12">Invalid Credentials</b-col>
      </b-row>
    <b-row align-h="around">
      <b-col md="12" lg="4">
    <b-form class="login__form" v-on:submit.prevent="onSubmit">
      <b-form-group
        id="input-group-1"
        label="Email"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="email"
          type="email"
          placeholder="Enter user email"
          required
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-2"
        label="password"
        label-for="input-2"
        class="mt-3"
      >
        <b-form-input
          id="input-2"
          v-model="password"
          type="password"
          placeholder="Enter password"
          required
        ></b-form-input>
      </b-form-group>

      <b-button
        :disabled="!email && !password"
        class="mt-3 w-100"
        type="submit"
        variant="primary"
        >Login</b-button
      >
    </b-form>
    </b-col>
    </b-row>
    </b-container>
  </div>
</template>
<script>
/* eslint-disable */
import axios from 'axios'

export default {
  name: 'LoginForm',
  data() {
    return {
      email: '',
      password: '',
      isUser: false
    }
  },
  methods: {
    async onSubmit() {
      const response = await axios.post('/api/login', {
        email: this.email,
        password: this.password
      }).catch((e) => {
        this.isUser = true
      })
      if (response.status === 200) {
        this.isUser = false
        localStorage.setItem('token', response.data.token)
        localStorage.setItem('isLogin', 'true')
        this.$store.dispatch('userToken', response.data.token)
        this.$router.push('/')
      } 
    }
  }
}
</script>
<style lang="scss" scoped>
.login {
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;

  &__error {
    font-size: 1.5rem;
    color: #fe070c
  }

  &__form {
    border: 1px solid #ced4da;
    padding: 2.5rem;
    border-radius: 0.4rem;
    text-align: left;

    @media (max-width: 1200px) {
      padding: 1.5rem;
    }
  }
}
</style>
