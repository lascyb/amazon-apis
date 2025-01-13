<script setup lang="ts">
import Desc from "../generated/amazon.desc.json"
import {useSwaggerAndRedocStore} from "../store/SwaggerAndRedoc.ts";

const store = useSwaggerAndRedocStore()


</script>

<template>
  <div>
    <el-radio-group v-model="store.route">
      <el-radio value="index" label="描述信息"></el-radio>
      <el-radio value="home" label="接口详情"></el-radio>
    </el-radio-group>
    <el-table :data="Desc" row-key="id" stripe
              border
              >
      <el-table-column label="name" prop="name"></el-table-column>
      <el-table-column label="path" prop="path"></el-table-column>
      <el-table-column label="desc" prop="desc"></el-table-column>
    </el-table>
  </div>
</template>

<style scoped>

</style>