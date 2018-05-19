<template>
  <v-form v-model="valid" ref="form" lazy-validation>
    <v-text-field label="Name" v-model="user.name" :rules="nameRules" required/>

    <v-text-field label="E-mail" v-model="user.email" :rules="emailRules" required/>

    <v-text-field type="password" label="Senha" v-model="user.password" :rules="passwordRules" required/>

    <v-btn class="teste" @click="submit" :disabled="!valid"> Cadastrar </v-btn>

    <v-btn @click="clear">Limpar</v-btn>

    <p>Já tem uma conta? clique <router-link to="/login">aqui</router-link> para fazer login</p>
  </v-form>
</template>
<script>
import api from '@/api/api'
export default {
  name: 'NewUser',

  data () {
    return {
      valid: true,
      user: {
        name: '',
        email: '',
        password: ''
      },
      nameRules: [
        v => !!v || 'Nome é obrigatorio'
      ],
      emailRules: [
        v => !!v || 'E-mail é obrigatorio',
        v => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid'
      ],
      passwordRules: [
        v => !!v || 'Senha é obrigatorio'
      ]
    }
  },
  methods: {
    clear () {
      this.$refs.form.reset()
    },
    submit () {
      api.methods.createUser(this.user, response => {
        if (response.status) {
          this.$router.push('/login')
        } else {
          alert(response.message)
        }
      })
    }
  }
}
</script>
<style>
.teste {

}

</style>
