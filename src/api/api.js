// const path = require('../../config/index')
import firebase from 'firebase'

// Firebase config
// TODO tirar isso daqui e colocar em algum lugar das configs
let config = {
  apiKey: 'AIzaSyCX17tmQ1JMgNcx8PsynTXksOxYgaT0d3I',
  authDomain: 'workshow-24893.firebaseapp.com',
  databaseURL: 'https://workshow-24893.firebaseio.com',
  projectId: 'workshow-24893',
  storageBucket: 'workshow-24893.appspot.com',
  messagingSenderId: '684914678342'
}

firebase.initializeApp(config)
const auth = firebase.auth()
const database = firebase.database()
let todoRef = null
let todoTagetRef = null
let currentUser = auth.onAuthStateChanged(user => {
  todoRef = database.ref('users/' + user.uid + '/todos/')
  todoTagetRef = id => database.ref('users/' + user.uid + '/todos/' + id)
  return user
})

const methods = {
  login (user, calback) {
    auth.signInWithEmailAndPassword(user.email, user.password).then(res => {
      calback(setResponse(true, 'Usuario logado com sucesso'))
    }).catch(error => {
      calback(setResponse(false, error.message))
    })
  },

  createUser (user, calback) {
    auth.createUserWithEmailAndPassword(user.email, user.password).then(response => {
      firebase.database().ref('users/' + response.uid).set({
        username: user.name,
        email: user.email
      }).then(res => {
        calback(setResponse(true, 'Usuario criado com sucesso'))
      }).catch(error => {
        calback(setResponse(false, error.message))
      })
    }).catch(error => {
      calback(setResponse(false, error.message))
    })
  },

  logout (calback) {
    auth.signOut().then(res => {
      calback(setResponse(true, 'Usuario deslogado'))
    }).catch(error => {
      calback(setResponse(false, error.message))
    })
  },

  newTodo (todo, callback) {
    todoRef.push(todo).then(res => {
    }).catch(error => {
      console.log(error)
    })
  },

  getTodos (callback) {
    todoRef.on('child_added', data => {
      let todoData = {
        id: data.key,
        description: data.val().description,
        completed: data.val().completed
      }
      callback(todoData)
    })
  },

  completeTodo (idTodo) {
    todoTagetRef(idTodo).update({completed: true})
  },

  teste (callback) {
    todoRef.on('child_changed', data => {
      callback(data.key)
    })
  }
}

function setResponse (status, message) {
  let response = {
    status: status,
    message: message
  }
  return response
}

export default {
  methods,
  auth,
  currentUser
}
