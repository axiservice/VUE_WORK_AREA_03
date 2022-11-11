<template>
  <div> 
    <h3>Edit Dossier</h3>
    <form @submit.prevent="update">
      <div class="form-group">
        <label>Name</label>
        <input v-model="form.name" class="form-control" required />
      </div>

      <div class="form-group mt-3">
        <label>Email</label>
        <input
          v-model="form.email"
          class="form-control"
          type="email"
          required
        />
      </div>

      <div class="form-group mt-3">
        <label>Livello</label>
        <input v-model="form.livello" class="form-control" required />
      </div>

      <button @click="updateDossier()" class="btn btn-primary mt-3">
        Update
      </button>
    </form>
  </div>
</template>

<script>
import { computed, onMounted, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useStore } from "vuex";

export default {
  setup() {
    //computed(() => store.getters.getAllDossier)
    //const form = ref("");
    const store = useStore();
    const router = useRouter()
    const route = useRoute()
    const idDossier = computed(() => route.params.id)

    //console.log("route.params.id:", idDossier);
    //const dossier = computed(() => store.getters.getDossierById(idDossier))  //ref("");

    const form = reactive({id: '', name: '', email: '', livello: '' })
    onMounted(async () => {
      const user = await store.getters.getDossierById(idDossier.value)   //await getDossier(idDossier.value)
      console.log(user, idDossier.value)
      form.id = idDossier
      form.name = user.name
      form.email = user.email
      form.livello = user.livello
    })

    const onSubmit = async () => {
      store.dispatch("updateDossier", {  ...form });
      router.push('/dossier')
      form.name = ''
      form.email = ''
      form.livello = ''
    }

    function updateDossier() {
      //console.log("dossier:", dossier);
      store.dispatch("updateDossier", {  ...form });
      router.push('/dossier')
      form.name = ''
      form.email = ''
      form.livello = ''
    }

    //console.log("getDossierById:", idDossier);
    return { 
      updateDossier, 
      form,  //: computed(() => store.getters.getDossierById(idDossier)), 
      onSubmit
    }
  }
}
</script>
