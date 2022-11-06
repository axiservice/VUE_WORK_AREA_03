import { createStore } from 'vuex'

// firebase imports
import { auth, db } from '../firebase/config'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged
} from 'firebase/auth'

const store = createStore({
  state: {
    user: null,
    authIsReady: false
  },
  mutations: {
    setUser(state, payload) {
      state.user = payload
      console.log('user state changed:', state.user)
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    },
    addAllBooks(state, payload) {
      state.books.push(payload)
      console.log('ZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZZaddAllBooks():', state)
    },
    cleanStore(state) {
      state.books = []
    },
    dummy(){}
  },
  actions: {
    async signup(context, { email, password }) {
      console.log('signup action')

      const res = await createUserWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete signup')
      }
    },
    async login(context, { email, password }) {
      console.log('login action')

      const res = await signInWithEmailAndPassword(auth, email, password)
      if (res) {
        context.commit('setUser', res.user)
      } else {
        throw new Error('could not complete login')
      }
    },
    async logout(context) {
      console.log('logout action')

      await signOut(auth)
      context.commit('setUser', null)
    },

    addBook({ commit }, book) {
      db.collection('books').add(book).then((docref) => {

        db.collection('books').doc(docref.id).update({
          id: docref.id
        })

      })
      commit('dummy', book)
    },
    deleteBook({ commit }, book) {
      db.collection('books').doc(book.id).delete()
      commit('addAllBooks', book)
    },
    updateBook({ commit }, book) {
      db.collection('books').doc(book.id).update({
        title: book.title
      })
      commit('addAllBooks', book)
    },
    addAllBooks({ commit }, book) {
      commit('addAllBooks', book)
    },
    cleanStore({ commit }) {
      commit('cleanStore')
    },

  },
  getters: {
    getAllBooks(state) {
      return state.books
    }
  },
  modules: {

  }
})

// wait until auth is ready
const unsub = onAuthStateChanged(auth, (user) => {
  store.commit('setAuthIsReady', true)
  store.commit('setUser', user)
  unsub()
})


// export the store
export default store