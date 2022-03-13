<template>
<div class="container-fluid bg-primary">
<div class="row">
  <div class="col-md-3">
  <div class="about  text-center text-light p-3">
    <img class=" profile" :src="profile.picture" alt="" />
    <h5 class="">{{ profile.name }}</h5>
 <div>
 <a :href="profile.github">
   <i class="mdi mdi-github selectable text-light"></i>
 </a>
 <a :href="profile.linkedin">
   <i class="mdi mdi-linkedin selectable text-light"></i>
 </a>
 <i v-if="profile.graduated" class="mdi mdi-school"></i>
 </div>
  </div>
  </div>
<div class="col-md-7 text-light text-center p-5">
  {{profile.bio}}
</div>
</div>
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

.profile{
 height: 25vh;
  width: 25vh;
  border-radius: 50%;
}
</style>
