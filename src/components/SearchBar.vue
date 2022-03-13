<template>
  <form class="form-group row" @submit.prevent="search">
   <div class="input-group  col-md-6">
  <input v-model="searchTerm" type="text" class="form-control" placeholder="Search Post...." aria-label="Recipient's username" aria-describedby="button-addon2">
  <button class="btn btn-light" type="submit" id="button-addon2">Search</button>
</div>
  </form>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const searchTerm = ref("");
    return {
      searchTerm,
      async search() {
        try {
          await postsService.getAllPost({ query: searchTerm.value });
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style scoped>
</style>