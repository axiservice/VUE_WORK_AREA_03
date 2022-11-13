<template>
    <crud />
</template>

<script>
import Crud from '../components/Crud.vue'
import { onMounted } from 'vue';
import { useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'EditUser',
  components: { Crud },
  setup() {
    const store = useStore()
    const router = useRouter()
    onMounted(()=>{
      //Verify user logged
      if(!store.state.user) router.push('/')

    })
    return { 
    }
  }
}
</script>