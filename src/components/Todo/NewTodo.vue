<template>
  <v-container fluid>
    <v-flex xs8>
      <v-text-field
        name='todo'
        label='Tarefa'
        id='testing'
        v-model='todo.description'
        @keyup.enter='createTodo'
      ></v-text-field>
    </v-flex>
  </v-container>
</template>

<script>
import api from '@/api/api'

export default {
  name: 'NewTodo',
  data () {
    return {
      todo: {
        description: '',
        completed: false
      }
    }
  },
  methods: {
    createTodo () {
      api.methods.newTodo(this.todo)
      this.todo.description = ''
    }
  }
}
</script>

<style type="text/css">

</style>
