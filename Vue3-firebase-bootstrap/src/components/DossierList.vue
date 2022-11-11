<template>
  <div class="card mt-4">
    <table class="table m-0">
      <thead>
        <tr>
          <th scope="col">Dossier Name</th>
          <th scope="col">Email</th>
          <th scope="col">Livello</th>
          <th scope="col">
            Action
            <router-link :to="`/createDossier`">
              <button class="btn btn-primary btn-sm me-2">
                Create Dossier
              </button>
            </router-link>
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="{ id, name, email, livello } in dossier" :key="id">
          <td>{{ name }}</td>
          <td>{{ email }}</td>
          <td>{{ livello }}</td>
          <td>
            <router-link :to="`/editDossier/${id}`">
              <button class="btn btn-primary btn-sm me-2">
                Edit
              </button>
            </router-link>
            <button class="btn btn-danger btn-sm" @click="deleteDossier(id)">
              Delete
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
//import { useLoadUsers, deleteUser } from '@/firebase'
//import { useLoadDossier } from '@/services/DossierService'
import { computed } from "vue";
import { useStore } from "vuex";

export default {
  setup() {
    const store = useStore();
    return { dossier: computed(() => store.getters.getAllDossier), }
  }
}
</script>
