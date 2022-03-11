<template>
  <header>
    <Navbar />
    <div class="row">
      <div class="col-md-6" v-for="p in paid" :key="p.banner">
        <Paid :paid="p" />
      </div>
    </div>
  </header>
  <main>
    <router-view />
  </main>
</template>

<script>
import { computed } from "vue";
import { AppState } from "./AppState";
export default {
  name: "App",
  setup() {
    return {
      appState: computed(() => AppState),
      paid: computed(() => AppState.paid),
    };
  },
};
</script>
<style lang="scss">
@import "./assets/scss/main.scss";
</style>
