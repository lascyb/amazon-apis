<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import menu from "../generated/folderDetails_zh.json"
import {useSwaggerAndRedocStore} from "../store/SwaggerAndRedoc.ts";
import Swagger from "../components/SwaggerView.vue";
import Redoc from "../components/RedocView.vue";

const store = useSwaggerAndRedocStore()

const showSwaggerOrRedoc = ref(false)
if (store.url != "") {
  showSwaggerOrRedoc.value = true
}
const click_menu = (node: any) => {
  if (node.isDirectory) {
    return
  }
  store.url = node.path
  updateRedoc()

}
const scroll = reactive({
  top: 0
})
const headerTop = ref(8)
onMounted(function () {

  document.addEventListener('scroll', () => {
    let scrollTop = scroll.top
    scroll.top = window.scrollY || document.documentElement.scrollTop;
    if (scroll.top < scrollTop) { //向上滚
      console.log("向上滚")
      if (headerTop.value < 0) {
        headerTop.value += 10
      }
    } else { //向下滚
      console.log("向下滚")
      if (scroll.top > 100) {
        if (headerTop.value > -80) {
          headerTop.value -= 10
        }
      }
    }
  });

})
const updateRedoc = () => {
  showSwaggerOrRedoc.value = false
  setTimeout(function () {
    showSwaggerOrRedoc.value = true
  }, 1)
}

</script>

<template>
  <div style="margin: 8px;">
    <el-row style="width: 100%;" :gutter="2">
      <el-col :span="4" v-if="store.menu.expand">
        <el-affix :offset="8">
          <el-scrollbar style="height: calc(100vh - 16px)">
            <el-card shadow="hover">
              <el-tree @node-click="click_menu" :data="menu" :props="{label:'name'}" node-key="path"
                       :default-expanded-keys="[store.url]"></el-tree>
            </el-card>
          </el-scrollbar>
        </el-affix>
      </el-col>
      <el-col :span="store.menu.expand?20:24" style="height: calc(100vh - 16px)">
        <el-affix :offset="headerTop">
          <el-card shadow="hover" style="margin-bottom: 2px">
            <div style="display: flex;justify-content: space-between;align-items: center;">
              <el-icon style="cursor: pointer" size="25" color="#909399"
                       @click="store.menu.expand = !store.menu.expand">
                <Expand v-if="!store.menu.expand"/>
                <Fold v-if="store.menu.expand"/>
              </el-icon>
              {{ store.url.replace("swagger/amazon/models/", "") }}

              <el-slider v-if="store.engine=='redoc'" v-model="store.redoc.rightPanel" @change="updateRedoc" style="width: 200px"/>

              <el-radio-group v-model="store.engine">
                <el-radio-button label="Swagger" value="swagger"/>
                <el-radio-button label="Redoc" value="redoc"/>
              </el-radio-group>
            </div>
          </el-card>
        </el-affix>
        <el-card shadow="hover">
          <swagger v-if="store.engine=='swagger'&&showSwaggerOrRedoc" v-model="store.url"></swagger>
          <redoc v-if="store.engine=='redoc'&&showSwaggerOrRedoc" v-model="store.url" v-model:right="store.redoc.rightPanel"></redoc>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<style scoped lang="scss">

</style>