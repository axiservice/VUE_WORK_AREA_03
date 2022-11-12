<template>
  <!-- Modal -->
  <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">DOSSIER Edit</h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <h6>ID: {{currentDialogItem.id}} </h6>
          <component :is="editComponent" :id="currentDialogItem.id" :key="componentKey" ></component>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Undo</button>
        </div>
      </div>
    </div>
  </div>


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
            <button class="btn btn-primary btn-sm me-2" @click="editDossier(id)" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Edit2
            </button>
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
import { ref, computed } from 'vue'
import { useStore } from "vuex";
import dossierEdit2 from '../components/DossierEdit2.vue'

export default {
  components: { dossierEdit2 },
  data(){
    return { 
       componentKey: ref(0),
       editComponent:"",
       show: false,
       currentDialogItem: {id:""}
    }
  },
  setup() {
    const store = useStore();
    return { store, dossier: computed(() => store.getters.getAllDossier)}
  },
  methods:{
    deleteDossier(id){
      this.store.dispatch("deleteDossier", id);
    },
    editDossier(id){
      this.editComponent="dossierEdit2"
      this.currentDialogItem.id = id //"MrhRorqwHBtRAtJnSUNs";
      console.log(">1>>>>>>>>>>>>>>>>>>>>>>>>>>>>",this.currentDialogItem.id)
      this.componentKey += 1;
    }
  }
}
</script>
