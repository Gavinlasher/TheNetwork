<template>
  <form
    @submit.prevent="createPost"
    class="row bg-light  justify-content-center elevation-3 p-2 m-5"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Body</label>
      <input
        v-model="state.editable.body"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Image</label>
      <input
        v-model="state.editable.imgUrl"
        required
        type="text"
        class="form-control"
       
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary text-light">create</button>
    </div>
  </form>
</template>


<script>
import { reactive } from "@vue/reactivity";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { postsService } from "../services/PostsService";
export default {
  setup() {
    const state = reactive({
      editable: {}
    })
    return {
      state,
      async createPost(){
try {
  await postsService.createPost(state.editable)
  state.editable  = {}
} catch (error) {
  logger.error(error)
  Pop.error(error)
}
      }
    };
  },
};
</script>


<style lang="scss" scoped>
</style>