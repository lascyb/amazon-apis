import {defineConfig} from 'vite'
import vue from '@vitejs/plugin-vue'
import fs from 'fs'
import path from 'path'
import {ElementPlusResolver} from "unplugin-vue-components/resolvers";
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
// https://vite.dev/config/

// 递归遍历文件夹并保存文件夹、文件信息
function traverseDirectoryWithDetails(dirPath: string, basePath: string) {
    const result: any = []

    const items = fs.readdirSync(dirPath)  // 获取目录下的所有文件和文件夹

    items.forEach(item => {
        const fullPath = path.join(dirPath, item)  // 获取文件的完整路径
        const relativePath = path.relative(basePath, fullPath)  // 计算相对路径
        const stat = fs.statSync(fullPath)  // 获取文件的状态信息

        if (stat.isDirectory() || (stat.isFile() && item.endsWith('.json'))) {
            // 保存文件或文件夹的详细信息
            let data: { path: any; children: any[] | undefined; name: any; isDirectory: boolean } = {
                name: item,  // 保存文件或文件夹的完整路径
                path: relativePath.replaceAll("\\", "/"),  // 保存文件或文件夹的完整路径
                isDirectory: stat.isDirectory(),  // 是否是文件夹
                children: undefined
            };

            // 如果是文件夹，递归遍历
            if (stat.isDirectory()) {
                data.children = traverseDirectoryWithDetails(fullPath, basePath)  // 递归调用，保留子文件夹信息
            }
            if (stat.isDirectory() && (data.children == undefined || data.children.length == 0)) {
                return
            }
            result.push(data)
        }

    })

    return result
}


export default defineConfig({
    base: process.env.NODE_ENV === 'production' ? '/amazon-apis/' : '/',
    build: {
        target: 'esnext',
        // 或者你也可以改用 'terser' 压缩器，这会提供更安全的压缩效果
        terserOptions: {
            compress: {
                // 不压缩常量
                booleans: true,
            },
        },
    },
    plugins: [
        vue(),
        AutoImport({
            resolvers: [ElementPlusResolver()],
        }),
        Components({
            resolvers: [ElementPlusResolver()],
        }),

        {
            name: 'generate-file-folder-details',
            buildStart() {
                const dirPath = path.resolve(__dirname, 'public', 'swagger', 'amazon', 'models')
                const folderDetails = traverseDirectoryWithDetails(dirPath, path.resolve(__dirname, "public"))

                // 打印结果
                // console.log('文件夹和文件的详细信息:', JSON.stringify(folderDetails, null, 2))

                // 将详细信息写入文件
                const outputFile = path.resolve(__dirname, "src", 'generated', 'folderDetails.json')
                fs.writeFileSync(outputFile, JSON.stringify(folderDetails, null, 2))
                console.log('文件夹信息已生成:', outputFile)
            }
        }
    ]

})
