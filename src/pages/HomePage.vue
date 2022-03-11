<template>
  <div class="row justify-content-center">
    <div class="col-md-8 p-4" v-for="p in posts.posts" :key="p.id">
      <Post :posts="p" />
    </div>
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
    };
  },
};
</script>

<style scoped lang="scss">
</style>
