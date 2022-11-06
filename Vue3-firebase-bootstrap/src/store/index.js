import { createStore } from 'vuex'

// firebase imports
import consoleDebugger from '../commonUtils.js'
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
      //console.log('user state changed:', state.user)
      //console.log('user state changed ', state.user!=null ? 'Login: '+state.user.email : " *** Logout ***")
      consoleDebugger('user state changed '+ (state.user!=null ? 'Login: '+state.user.email : ' *** Logout ***'));
    },
    setAuthIsReady(state, payload) {
      state.authIsReady = payload
    },
    addAllBooks(state, payload) {
      state.books.push(payload);
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
      commit
    },
    updateBook({ commit }, book) {
      db.collection('books').doc(book.id).update({
        title: book.title
      })
      commit
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