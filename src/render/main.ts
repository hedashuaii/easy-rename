import { createApp } from "vue";
import ElementPlus from "element-plus";
import "element-plus/dist/index.css";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { createPinia } from "pinia";
import "./style.css";
import App from "./App.vue";

import * as ipcRendererEvents from './events'
import { ipcRenderer } from "electron";

// ipcRenderer
Object.keys(ipcRendererEvents).forEach(key => {
  // @ts-ignore
  ipcRenderer.on(key, ipcRendererEvents[key])
})

const app = createApp(App);

// 注册 element-plus 图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component);
}

app.use(createPinia())
app.use(ElementPlus)
app.mount("#app")
