<template>
  <div class="row bg-light shadow text-center rounded p-2">
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
      </div>
    </div>
    <div class="col-md-12">
      {{ posts.body }}
    </div>
    <div class="col-md-12">
      <img class="img-fluid rounded" :src="posts.imgUrl" alt="" />
    </div>
    <div class="col-md-12 text-end p-3 me-5">
      <i class="mdi mdi-thumb-up">
        {{ posts.likes.length }}
      </i>
    </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
import { useRouter } from "vue-router";
import { AppState } from "../AppState";
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
</style>