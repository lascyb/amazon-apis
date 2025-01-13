<script setup lang="ts">

import Home from "./view/Home.vue";
import Index from "./view/Index.vue";
import {useSwaggerAndRedocStore} from "./store/SwaggerAndRedoc.ts";

const store = useSwaggerAndRedocStore()


</script>

<template>
  <div>
    <index v-if="store.route=='index'"></index>
    <home v-if="store.route=='home'"></home>
  </div>
</template>

<style scoped>

</style>
