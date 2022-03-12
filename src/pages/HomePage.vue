<template>
  <div class="row justify-content-center">
    <div class="col-md-8 p-4" v-for="p in posts" :key="p.id">
      <Post :posts="p" />
    </div>
  </div>
  <div class="mt-3">
  <button @click="changePage(older)" 
  class="btn btn-primary me-5"
 :disabled="!older"
  
  >
    Next

  </button>
  <button v-if="newer"
  @click="changePage(newer)"
   class="btn btn-primary">
   Previous
   </button>
  </div>
</template>

<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { AppState } from "../AppState";
export default {
  name: "Home",
  setup() {
    onMounted(async () => {
      try {
        await postsService.getAllPost();
      } catch (error) {
        logger.error(error);
        Pop.error(error, "message");
      }
    });
    return {
      posts: computed(() => AppState.posts),
       newer: computed(()=> AppState.nextPage),
      older: computed(()=> AppState.previousPage),
       async changePage(page){
        try {
          await postsService.changePage(page)
        } catch (error) {
          logger.error(error)
          Pop.error(error.message, 'error')
        }
      },
    };
  },
};
</script>

<style scoped lang="scss">
</style>
