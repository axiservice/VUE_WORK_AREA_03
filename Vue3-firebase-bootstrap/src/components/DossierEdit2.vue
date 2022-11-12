<template>
    <div> 
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
  
        <button @click="updateDossier()" class="btn btn-primary mt-3" data-bs-dismiss="modal">
          Save changes
        </button>
      </form>
    </div>
  </template>
  
  <script>
  import { onMounted, reactive } from 'vue'
  //import { useRoute, useRouter } from 'vue-router'
  import { useStore } from "vuex";
  
  export default {
    props: ['id'],
    setup(props) {
      console.log(">2>>>>>>>>>>>>>>>>", props.id);
      const store = useStore();
      const form = reactive({id: '', name: '', email: '', livello: '' })
      onMounted(async () => {
        const user = await store.getters.getDossierById(props.id)   //await getDossier(idDossier.value)
        console.log(">3>>>>>>>>>>>>>>>>", props.id);
        form.id = props.id
        form.name = user.name
        form.email = user.email
        form.livello = user.livello
      })
  
/*       const onSubmit = async () => {
        store.dispatch("updateDossier", {  ...form });
        //router.push('/dossier')
        form.name = ''
        form.email = ''
        form.livello = ''
      } */
  
      function updateDossier() {
        //console.log("dossier:", dossier);
        store.dispatch("updateDossier", {  ...form });
      }
  
      //console.log("getDossierById:", idDossier);
      return { 
        updateDossier, 
        form
      }
    }
  }
  </script>
  