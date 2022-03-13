<template>
  <div class="row bg-light shadow  rounded p-2">
    <div class="col-md-12">
      <div class="d-flex justify-content-between">
        <img
          @click="goTo('Profile')"
          class="img-fluid Profile-pic selectable"
          :src="posts.creator.picture"
          alt=""
          srcset=""
        />
        <h2 class="p-3">{{ posts.creator.name }}</h2>
        <i v-if="account.id == posts.creatorId" @click="remove(posts.id)" class="mdi mdi-delete selectable">
        </i>
    </div>
    <div class="col-12 text-center">
      <a v-if="posts.creator.linkedin != '' " :href="posts.creator.linkedin">
      <i class="mdi mdi-linkedin selectable"></i>
      </a>
      <a  v-if="posts.creator.github != '' " :href="posts.creator.github">
      <i class="mdi mdi-github selectable"></i>
      </a>
      <i v-if="posts.creator.graduated" class="mdi  mdi-school mdi-spin selectable"></i>
    </div>
    
    <div class="col-md-12 text-center p-3">
      {{ posts.body }}
    </div>
    <div class="">{{posts.updatedAt}}</div>
    <div class="col-md-12 text-center">
      <img class="post-img img-fluid rounded shadow" :src="posts.imgUrl" alt="" />
    </div>
    <div class="col-md-12 text-end p-3 me-5">
      <i @click="like(posts.id)" class="mdi mdi-thumb-up">
        {{ posts.likes.length }}
      </i>
    </div>
  </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
import { computed } from "@vue/reactivity";
export default {
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    const router = useRouter();
    return {
     
      likes: computed(()=> AppState.posts),
      account: computed(()=> AppState.account),
  
      async like(id){
try {
  await postsService.like(id)
} catch (error) {
  logger.error(error)
  Pop.error(error, 'message')
}
      },
      goTo(page) {
        router.push({
          name: page,
          params: { id: props.posts.creatorId },
        });
      },
      async getPost() {
        try {
          await postsService.getPost();
        } catch (error) {
          logger.log(error);
          Pop.error(error, "message");
        }
      },
      async remove(id){
try {
  if(await Pop.confirm())
  await postsService.remove(id)
} catch (error) {
  logger.error(error)
  Pop.error(error, 'message')
}
      }
    };
  },
};
</script>


<style lang="scss" scoped>
.Profile-pic {
  height: 10vh;
  width: 10vh;
  border-radius: 50%;
}
.post-img{
  height: 50vh;
  width: 70vh;
}
</style>