<script setup lang="ts">
// import Redoc from 'redoc'
import * as Redoc from "redoc/bundles/redoc.standalone.js"

import {onMounted} from "vue";

const model = defineModel({
  type: String
})
const rightPanel = defineModel("right", {
  type: Number,
  default:40
})
onMounted(() => {
  console.log(Redoc)
  Redoc.init(model.value, {
    scrollYOffset: 'nav',
    // hideMainMenu:true,
    // disableSearch:true,
    theme: {
      rightPanel: {
        width: (100-rightPanel.value) + "%"
      },
      colors: {
        primary: {
          main: '#5c6bc0',
        },
      },
    },
  }, document.getElementById('redoc'), function () {
    let menu: any = document.querySelector('#redoc .sc-dtBdUo.gdNLsg.scrollbar-container.undefined.ps');
    document.addEventListener('scroll', () => {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      // 如果页面滚动超过某个阈值时，使侧边栏固定
      if (scrollTop > 130) {
        menu.style.position = 'fixed';
        menu.style.top = '10px';  // 偏移量
        menu.style.height = '100vh';  // 偏移量
      } else {
        menu.style.position = 'relative';
        menu.style.top = 'auto';  // 回到原始位置
        menu.style.height = 'auto'
      }
    });
  })


})


</script>

<template>
  <div>
    <div id="redoc"></div>
  </div>
</template>

<style scoped>
/*:deep(.sc-dPZUQH.gHVyaI.menu-content){
  margin-top: 130px;
  position: fixed;
  top: 0px;
  max-height: 100vh;
}*/
:deep(.sc-dtBdUo.gdNLsg.scrollbar-container.undefined.ps) {
  width: 260px;
}
</style>
