<template>
    <DossierList />
</template>
  
<script>
import { onMounted } from 'vue';
import { useStore } from 'vuex'
import { db } from '../firebase/config'
import DossierList from '../components/DossierList.vue'
  
export default {
    name: 'Home',
    components: { DossierList },
    setup() {
    const store = useStore()
    onMounted(()=>{
      db.collection("dossier").onSnapshot((querySnapshot) => {
        store.dispatch('cleanDossier')
        querySnapshot.forEach((doc) => {
          store.dispatch('addAllDossier',doc.data())
        });
      });
    })

    return { 
    }
  }
}
</script>