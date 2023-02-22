import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'

import PrimeVue from 'primevue/config'

import 'primeflex/primeflex.css'
import 'primevue/resources/themes/arya-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext'
import Toolbar from 'primevue/toolbar';
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import ToastService from 'primevue/toastservice';
import Toast from 'primevue/toast';




const app = createApp(App)

app.component('Button', Button)
app.component('DataTable', DataTable)
app.component('Column', Column)
app.component('InputText', InputText)
app.component('Toolbar',Toolbar)
app.component('Dialog',Dialog)
app.component('Dropdown',Dropdown)
app.component('FileUpload',FileUpload)
app.component('Toast',Toast)


app.config.globalProperties.link = 'http://192.168.1.48:8888/new'

app.use(PrimeVue)
app.use(ToastService)
app.use(store).use(router).mount('#app')

