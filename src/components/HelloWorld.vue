<template>
  <div class="hello">
    <NewTodo></NewTodo>
    <Index v-bind:todos="todos"></Index>
    <v-btn @click="logout">Deslogar</v-btn>
  </div>
</template>

<script>
import api from '@/api/api'
import NewTodo from '@/components/Todo/NewTodo'
import Index from '@/components/Todo/Index'

export default {
  name: 'HelloWorld',
  components: {NewTodo, Index},
  data () {
    return {
      user: {
        name: '',
        email: ''
      },
      todos: [],
      msg: 'Welcome to Your Vue.js App'
    }
  },
  mounted () {
    this.legal()
    this.show()
  },
  methods: {
    logout () {
      api.methods.logout(response => {
        if (response.status) {
          this.$router.push('/login')
          alert(response.message)
        } else {
          alert(response.message)
        }
      })
    },
    legal () {
      api.methods.getTodos(response => {
        this.todos.push(response)
      })
    },
    show () {
      let teste = this
      api.methods.teste(response => {
        teste.todos.splice(teste.todos.findIndex(res => res.id === response), 1)
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
