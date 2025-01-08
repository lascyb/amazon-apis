<script setup lang="ts">
import SwaggerUI from 'swagger-ui'
import "swagger-ui/dist/swagger-ui.css"
import {onMounted} from "vue";
const model = defineModel({
  type:String
})

onMounted(() => {
  SwaggerUI({
    dom_id: '#swagger',
    url:model.value
  })
})


</script>

<template>
  <div>
    <div id="swagger"></div>
  </div>
</template>

<style scoped>

</style>
