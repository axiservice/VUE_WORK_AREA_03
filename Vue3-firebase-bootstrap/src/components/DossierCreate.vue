<template>
  <div class="card card-body mt-4">
    <form @submit.prevent="onSubmit">
      <div class="form-group">
        <label>Dossier Name</label>
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

      <button type="submit" class="btn btn-success mt-3">
        Create Dossier
      </button>
    </form>
  </div>
</template>

<script>
//import { createDossier } from '@/services/DossierService'
import { reactive } from 'vue'
import { useRouter } from 'vue-router'
import { useStore } from "vuex";



export default {
  setup() {
    const store = useStore();
    const form = reactive({ name: '', email: '', livello: '' })
    const router = useRouter()
    const onSubmit = async () => {
      store.dispatch("addDossier", { ...form });
      router.push('/dossier')
      form.name = ''
      form.email = ''
      form.livello = ''
    }
    //this.router.push('Home')
    return { form, onSubmit }
  }
}
</script>
