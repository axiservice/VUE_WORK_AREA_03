<template>
  <div class="home">
    <div v-for="blog in blogs" :key="blog.id">
      <div class="blog">
        <h3>{{ blog.title }}</h3>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Pariatur aspernatur consectetur doloremque sunt ducimus enim iure animi fugit nulla et! Perferendis autem deleniti quo eum corrupti reiciendis voluptatem ab ducimus?</p>
        <div class="icons" v-if="user">
          <span>upvote or downvote this article: </span>
          <span class="material-icons">thumb_up</span>
          <span class="material-icons">thumb_down</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted } from 'vue';
import { ref, computed } from 'vue'
import { useStore } from 'vuex'
//import {db} from './firebase'
import { db } from '../firebase/config'

export default {
  components: {
  },
  setup() {
    const blogs = ref([
      { title: 'Why Coffee is Better than Tea', id: 1 },
      { title: '...Then I Took an Arrow in the Knee', id: 2 },
      { title: 'Mario vs Luigi, Ultimate Showdown', id: 3 },
    ])

    const store = useStore()
    onMounted(()=>{
      db.collection("books").orderBy('timestamp').onSnapshot((querySnapshot) => {
        store.dispatch('cleanStore')
        querySnapshot.forEach((doc) => {
          store.dispatch('addAllBooks',doc.data())
        });
      });
    })

    return { 
      blogs,
      user: computed(() => store.state.user)
    }
  }
}
</script>
