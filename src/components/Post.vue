<template>
  <div class="row bg-secondary text-center p-3">
    <div class="col-md-12">
      <div class="d-flex">
        <img
          class="img-fluid Profile-pic"
          :src="posts.creator.picture"
          alt=""
          srcset=""
        />
        <h2>{{ posts.creator.name }}</h2>
      </div>
    </div>
    <div class="col-md-12">
      {{ posts.body }}
    </div>
    <div class="col-md-12">
      <img src="https://thiscatdoesnotexist.com/" alt="" />
    </div>
  </div>
</template>


<script>
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  props: {
    posts: {
      type: Object,
      required: true,
    },
  },
  setup(props) {
    return {
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