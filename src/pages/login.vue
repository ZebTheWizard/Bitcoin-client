<template lang="html">
  <div class="page-login">
    <form class="form-horizontal">
      <div class="form-group">
        <div class="col-3">
          <label class="form-label">Email</label>
        </div>
        <div class="col-9">
          <input class="form-input" type="email" placeholder="john@example.com" v-model="email"/>
        </div>
      </div>

      <div class="form-group">
        <div class="col-3">
          <label class="form-label">Password</label>
        </div>
        <div class="col-9">
          <input class="form-input" type="password" placeholder="Password" v-model="password"/>
        </div>
      </div>
    </form>

    <div class="form-group clearfix">
      <button class="btn col-4 float-right " @click="login">{{type}}</button>
    </div>
  </div>
</template>

<script>
import Api from '../classes/Api'
export default {
  data () {
    return {
      status: 'no user',
      type: 'login',
      name: '',
      email: '',
      password: '',
      password_confirm: ''
    }
  },
  methods: {
    login () {
      Api.setEnv({
        env: window.env,
        username: this.email,
        password: this.password
      }).then(() => {
        console.log('success', this.status);
        this.status = 'success'
      }).catch((err) => {
        console.log(err)
        this.status = 'failure'
      })
    }
  }
}
</script>

<style lang="css">
</style>
