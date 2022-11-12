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
    addAllDossier(state, payload) {
      state.dossier.push(payload);
    },
    cleanStore(state) {
      state.books = []
    },
    cleanDossier(state) {
      state.dossier = []
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
    addBook(context, book) {
      db.collection('books').add(book).then((docref) => {

        db.collection('books').doc(docref.id).update({
          id: docref.id
        })
      })
    },
    addDossier(context, fdata) {
      db.collection('dossier').add(fdata).then((docref) => {
        db.collection('dossier').doc(docref.id).update({
          id: docref.id
        })
      })
    },
    deleteBook(context, book) {
      db.collection('books').doc(book.id).delete()
    },
    updateBook(context, book) {
      db.collection('books').doc(book.id).update({
        title: book.title
      })
    },
    updateDossier(context, fdata) {
      console.log("dossier update:::", fdata.id);
      db.collection('dossier').doc(fdata.id).update(fdata)
    },
    deleteDossier(context, fdata) {
      console.log("dossier delete:::", fdata);
      db.collection('dossier').doc(fdata).delete()
    },
    addAllBooks(context, book) {
      context.commit('addAllBooks', book)
    },
    addAllDossier(context, fdata) {
      context.commit('addAllDossier', fdata)
    },
    cleanStore({ commit }) {
      commit('cleanStore')
    },
    cleanDossier({ commit }) {
      commit('cleanDossier')
    },
  },
  getters: {
    getAllBooks(state) {
      return state.books
    },
    getAllDossier(state) {
      return state.dossier
    },
    getDossierById:() => async (id) =>  {
      const fbDati = await db.collection('dossier').doc(id).get()
      return fbDati.exists ? fbDati.data() : null
    },
/*     getDossierById:(state) => (id) => {
      //console.log("state:::", state.dossier.find(dossier => dossier.id === id));
      console.log("state:::", state.dossier);
      return state.dossier.find(x => x.id === id)
      //return {id: id, name: "NNNNN", email: "xxxx",  }

    } */
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