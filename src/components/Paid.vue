<template>
    <div class="col-12 p-3">
        <img class="img-fluid" :src="paid.banner" alt="" srcset="" />
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