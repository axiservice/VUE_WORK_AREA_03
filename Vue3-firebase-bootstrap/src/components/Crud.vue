<template>
  <div class="mt-4 container">
    <div class="row">
      <div class="col-4">
        <form>
          <h4>Salvando el semestre - Youtube Channel</h4>
          <div class="mb-3 mt-3">
            <input
              v-model="book"
              type="text"
              class="form-control"
              placeholder="Title"
            />
          </div>

          <button
            v-if="!update"
            type="button"
            class="btn btn-success"
            @click="addBook"
          >
            Add
          </button>
          <button
            v-if="update"
            type="button"
            class="btn btn-success"
            @click="updateBook()"
          >
            Update
          </button>
        </form>
      </div>

      <div class="col-8">
        <div class="row">
          <div v-for="book in books" :key="book" class="col-6 mt-2">
            <div class="card" >
              <div class="card-body">
                <h5 class="card-title">Title: {{ book.title }}</h5>
                <p class="card-text">ID: {{ book.id }}</p>

                <button
                  @click="
                    update = true;
                    tmpBook = book;
                    this.book = tmpBook.title;
                  "
                  v-if="book.id"
                  class="btn btn-primary "
                  style="margin-right:10px;"
                >
                  Update
                </button>
                
                <button 
                v-if="book.id"
                @click="deleteBook(book)" class="btn btn-danger">
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import { ref } from "vue";
export default {
  name: "Crud",
  setup() {
    const store = useStore();
    const book = ref("");
    const update = ref(false);
    const tmpBook = ref({});
    function addBook() {
      store.dispatch("addBook", {
        title: book.value,
        id:'',
        timestamp: new Date().getTime()
      });
      book.value = "";
    }
    function updateBook() {
      store.dispatch("updateBook", {
        title: book.value,
        id: tmpBook.value.id,
      });

      update.value = false;
      book.value = "";
    }
    function deleteBook(book) {
      store.dispatch("deleteBook", book);
    }

    return {
      book,
      books: computed(() => store.getters.getAllBooks),
      //books: computed(() =>[{id:"AAA", timestamp:"123455", title:"ccccc"}]),
      addBook,
      deleteBook,
      updateBook,
      update,
      tmpBook,
    };
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped></style>
