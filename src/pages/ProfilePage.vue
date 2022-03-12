<template>
  <div class="about text-center">
    <h1>Welcome {{ profile.name }}</h1>
    <img class="rounded" :src="profile.picture" alt="" />
  </div>
  <div v-if="account.id == profile.id">
    <EditProfile />
  </div>
  <div>
    <MakePost v-if="account.id == profile.id" />
  </div>
  <div class="row justify-content-center">
    <div class="col-md-8 p-4" v-for="p in posts" :key="p.id">
      <Post :posts="p" />
    </div>
  </div>
   <div class="mt-3">
  <button @click="changePage(older)" 
  class="btn btn-primary me-5 text-light"
 :disabled="!older"
  
  >
    Previous

  </button>
  <button v-if="newer"
  @click="changePage(newer)"
   class="btn btn-primary text-light">
   next
   </button>
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
          AppState.profile = {}
          AppState.profile = {}
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

<style scoped>
img {
  max-width: 100px;
}
</style>
