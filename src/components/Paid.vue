<template>
  <div class="component">
    <div class="row">
      <div class="col-6">
        <img :src="paid.banner" alt="" srcset="" />
      </div>
    </div>
  </div>
</template>


<script>
import { computed, onMounted } from "@vue/runtime-core";
import { logger } from "../utils/Logger";
import Pop from "../utils/Pop";
import { paidService } from "../services/PaidService";
import { AppState } from "../AppState";
export default {
  props: {
    paid: {
      type: Object,
      required: true,
    },
  },
  setup() {
    onMounted(async () => {
      try {
        await paidService.getAllPaid();
      } catch (error) {
        logger.error(error);
        Pop.error(error);
      }
    });
    return {
      paid: computed(() => AppState.paid),
    };
  },
};
</script>


<style lang="scss" scoped>
</style>