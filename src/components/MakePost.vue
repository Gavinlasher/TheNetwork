<template>
  <form
    @submit.prevent="makePost"
    class="row bg-grey darken-20 justify-content-center elevation-3 p-2 m-5"
  >
    <div class="col-md-4 mb-2">
      <label for="" class="form-label">Post</label>
      <input
        v-model="state.editable.title"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-md-8 mb-2">
      <label for="" class="form-label">Blog Image</label>
      <input
        v-model="state.editable.imgUrl"
        required
        type="text"
        class="form-control"
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 mb-2">
      <label for="" class="form-label">Body</label>
      <textarea
        v-model="state.editable.body"
        required
        type="text"
        class="form-control"
        placeholder=""
        aria-describedby="helpId"
      />
    </div>

    <div class="col-12 d-flex justify-content-end">
      <button class="btn btn-primary">create</button>
    </div>
  </form>
</template>


<script>
export default {
  setup() {
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>