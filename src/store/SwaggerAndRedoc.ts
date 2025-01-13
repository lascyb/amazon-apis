import {defineStore} from 'pinia'
import {reactive, type Ref, ref} from "vue";

export const useSwaggerAndRedocStore = defineStore('SwaggerAndRedoc', () => {
    const url = ref("")
    const engine: Ref<"swagger" | "redoc"> = ref("swagger")
    const menu = reactive({
        expand: true

    })
    const redoc = reactive({
        rightPanel: 60
    })
    const route = ref("index")
    return {url, engine, menu,redoc,route}
}, {
    persist: true
})
