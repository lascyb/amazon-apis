<script setup lang="ts">
import {onMounted, reactive, ref} from "vue";
import menu from "../generated/folderDetails_zh.json"
import {useSwaggerAndRedocStore} from "../store/SwaggerAndRedoc.ts";
import Swagger from "../components/SwaggerView.vue";
import Redoc from "../components/RedocView.vue";

const store = useSwaggerAndRedocStore()


const showSwaggerOrRedoc = ref(false)
if (store.url === "") {
  JSON.stringify(menu,function (_, value) {
    console.log(typeof value)
    if (typeof value=="object"){
      if ( store.url == "" && value.isDirectory === false ){
        store.url = value.path
      }
    }
    return value

  })
}
showSwaggerOrRedoc.value = true

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
              <div style="display: flex;justify-content: space-between;align-items: center;flex: 1">
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
              <div style="margin-left: 10px">
                <a href="https://github.com/lascyb/amazon-apis"><svg viewBox="0 0 24 24" width="1.2em" height="1.2em" data-v-87052479=""><path fill="currentColor" d="M12 2C6.475 2 2 6.475 2 12a9.994 9.994 0 0 0 6.838 9.488c.5.087.687-.213.687-.476c0-.237-.013-1.024-.013-1.862c-2.512.463-3.162-.612-3.362-1.175c-.113-.288-.6-1.175-1.025-1.413c-.35-.187-.85-.65-.013-.662c.788-.013 1.35.725 1.538 1.025c.9 1.512 2.338 1.087 2.912.825c.088-.65.35-1.087.638-1.337c-2.225-.25-4.55-1.113-4.55-4.938c0-1.088.387-1.987 1.025-2.688c-.1-.25-.45-1.275.1-2.65c0 0 .837-.262 2.75 1.026a9.28 9.28 0 0 1 2.5-.338c.85 0 1.7.112 2.5.337c1.912-1.3 2.75-1.024 2.75-1.024c.55 1.375.2 2.4.1 2.65c.637.7 1.025 1.587 1.025 2.687c0 3.838-2.337 4.688-4.562 4.938c.362.312.675.912.675 1.85c0 1.337-.013 2.412-.013 2.75c0 .262.188.574.688.474A10.016 10.016 0 0 0 22 12c0-5.525-4.475-10-10-10z"></path></svg></a>
              </div>
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