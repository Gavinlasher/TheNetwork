<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
    <p>{{ profile.email }}</p>
  </div>
  <div class="row justify-content-center">
    <div class="col-md-8 p-4" v-for="p in posts.posts" :key="p.id">
      <Post :posts="p" />
    </div>
  </div>
</template>

<script>
import { computed, watchEffect } from "vue";
import { AppState } from "../AppState";
import { useRoute } from "vue-router";
import { logger } from "../utils/Logger";
import { profilesService } from "../services/ProfilesService";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  name: "Account",
  setup() {
    const route = useRoute();
    watchEffect(async () => {
      try {
        if (route.name == "Profile") {
          await profilesService.getProfile(route.params.id);
          await postsService.getAllPost({ creatorId: route.params.id });
        }
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    });
    return {
      posts: computed(() => AppState.posts),
      account: computed(() => AppState.account),
      profile: computed(() => AppState.profile),
    };
  },
};
</script>

<style scoped>
img {
  max-width: 100px;
}
</style>
