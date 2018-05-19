<template>
  <div>
    <v-form ref="form" lazy-validation>

<!--       <v-text-field label="Name"   v-model="user.name" required></v-text-field>-->
      <v-text-field label="E-mail" v-model="user.email" required></v-text-field>
      <v-text-field label="Senha" type="password"  v-model="user.password"  required></v-text-field>

      <v-btn @click="login">Login</v-btn>
      <v-btn @click="clear">Limpar</v-btn>
      <p>Clique <router-link to="/cadastro">aqui</router-link> para criar sua conta</p>

    </v-form>
  </div>
</template>
<script>
import api from '@/api/api'

export default {
  name: 'Login',
  data () {
    return {
      user: {
        email: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      api.methods.login(this.user, response => {
        if (response.status) {
          this.$router.push('/hello-world')
          alert(response.message)
        } else {
          alert('Opa, ' + response.message)
        }
      })
    },
    clear () {
      this.$refs.form.reset()
    }
  }
}
</script>
<style>

</style>
