<template>
<div class="p-5">
  <form class="d-flex flex-column p-5 rounded shadow bg-light">
    <label for="">Profile Name</label>
    <input v-model="editable.name" type="text" />
    <label for="">Profile Image</label>
    <input v-model="editable.picture" type="text" />
    <button type="button" class="btn btn-primary mt-3 text-light" @click="update">Edit Profile</button>
  </form>
</div>
</template>


<script>
import { AppState } from "../AppState";
import { computed, reactive, onMounted, ref, watchEffect } from "vue";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { accountService } from "../services/AccountService";
export default {
  setup() {
    const editable = ref({});
    watchEffect(() => {
      editable.value = AppState.account;
    });
    return {
      editable,
      async update() {
        try {
          await accountService.update(editable.value);
        } catch (error) {
          logger.error(error);
          Pop.toast(error.message, "error");
        }
      },
    };
  },
};
</script>


<style scoped>
</style>