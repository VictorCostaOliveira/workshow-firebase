<template>
  <v-layout row>
    <v-flex xs12 sm6 offset-sm3>
      <v-card>
        <v-list>
          <v-list-tile avatar v-for="item in todos" :key="item.id">
            <v-list-tile v-if="!item.completed" >
              <v-list-tile-action>
                <v-icon color="pink" @click="completeTodo(item.id)">star</v-icon>
              </v-list-tile-action>
              <v-list-tile-content>
                <v-list-tile-title v-text="item.description"></v-list-tile-title>
              </v-list-tile-content>
            </v-list-tile>
          </v-list-tile>
        </v-list>
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import api from '@/api/api'
export default {
  name: 'Index',
  props: ['todos'],
  methods: {
    completeTodo (idTodo) {
      api.methods.completeTodo(idTodo)
    }
  }
}
</script>
