<template>
  <div class="component">
    <div class="row p-3">
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
    return {};
  },
};
</script>


<style lang="scss" scoped>
</style>