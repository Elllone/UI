<template>
    <div class="card">
        <div class="grid p-fluid ">
            <Toast />
            <div class="col-12">
                <Toolbar>
                    <template #start>
                        <h2>Главная</h2>
                    </template>
                    <template #end>
                        <div class="grid p-fluid ">
                            <div class="col-12 md:col-4">
                                <Button @click="ReqAddDialog = true" label="Добавить требование" class="p-button-success"
                                    icon="pi pi-plus" />
                            </div>
                            <div class="col-12 md:col-4">
                                <Button label="Удалить" class="p-button-danger" icon="pi pi-trash"
                                    :disabled="!selectedReq || !selectedReq.length" />
                            </div>
                            <div class="col-12 md:col-4">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" type="text" placeholder="Поиск...">
                                    </InputText>
                                </span>
                            </div>
                        </div>
                    </template>
                </Toolbar>
                <DataTable :value="req" :paginator="true" :rows="10" :rowsPerPageOptions="[10, 20, 50]"
                    v-model:selection="selectedReq"
                    paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    responsiveLayout="scroll" breakpoint="960px" :filters="filters"
                    current-page-report-template="Записи с {first} до {last} из {totalRecords}" :stripedRows=true>
                    <template #header>
                        <p>Требования</p>
                    </template>
                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"></Column>
                    <Column :sortable="true" v-for="col in cols" :field="col" :header="col"></Column>
                </DataTable>
            </div>
        </div>

        <Dialog header="Добавление требования" :breakpoints="{ '960px': '75vw', '640px': '90vw' }" :maximizable="true"
            v-model:visible="ReqAddDialog" :style="{ width: '70%' }" :modal="true">
            <form>
                <div class="grid p-fluid">
                    <div class="col-12 md:col-12">
                        <InputText v-model="formAddReq.req" step="0.1" type="number" placeholder="Требование"></InputText>
                    </div>
                    <div class="col-12 md:col-3">
                        <Dropdown v-model="formAddReq.types" :options="typesOrders" optionLabel="name" optionValue="id"
                            placeholder="Тип"></Dropdown>
                    </div>
                    <div class="col-12 md:col-3">
                        <InputText v-model="formAddReq.name" type="text" placeholder="Наименование"></InputText>
                    </div>
                    <div class="col-12 md:col-3">
                        <InputText v-model="formAddReq.count" type="number" placeholder="Количество"></InputText>
                    </div>
                    <div class="col-12 md:col-3" style="text-align: center;">
                        <Button @click="addOrder" label="Добавить" icon="pi pi-plus" class="p-button-success"></Button>
                    </div>

                    <div class="col-12 md:col-12">
                        <div v-for="index in countOrder" class="grid p-fluid">
                            <div class="col-12 md:col-3">
                                <Dropdown :options="typesOrders" optionLabel="name" optionValue="id" placeholder="Тип">
                                </Dropdown>
                            </div>
                            <div class="col-12 md:col-3">
                                <InputText type="text" placeholder="Наименование"></InputText>
                            </div>
                            <div class="col-12 md:col-3">
                                <InputText type="number" placeholder="Количество"></InputText>
                            </div>
                            <div class="col-12 md:col-3" style="text-align: center;">
                                <Button @click="removeOrder" label="Удалить" icon="pi pi-minus"
                                    class="p-button-danger"></Button>
                            </div>
                        </div>
                    </div>
                    <div class="col-12 md:col-8">
                        <InputText v-model="formAddReq.customer" type="text" placeholder="Заказчик"></InputText>
                    </div>
                    <div class="col-12 md:col-4">
                        <InputText v-model="formAddReq.id_manag" type="number" placeholder="ID для группировок требований">
                        </InputText>
                    </div>
                    <div class="col-12 md:col-12" style="text-align: center;">
                        <FileUpload :fileLimit=1 :showUploadButton="false" mode="basic" :customUpload="true"
                            @select="fileUpload" @uploader="formAddReq.file_more = null" cancelLabel="Отмена"
                            choose-label="Примечание" />
                    </div>
                    <div class="col-12 md:col-12">
                        <InputText v-model="formAddReq.info_text" type="text" placeholder="Общее примечание к требованию">
                        </InputText>
                    </div>
                </div>
            </form>
            <template #footer>
                <Button @click="sendNewReq" class="p-button-success" label="Сохранить" />
                <Button @click="ReqAddDialog = false" class="p-button-danger" label="Закрыть" />
            </template>
        </Dialog>
    </div>
</template>

<script>
import { getDataBoss } from '@/assets/js/getData'
import { FilterMatchMode } from 'primevue/api';
import axios from 'axios'


export default {
    data() {
        return {
            req: null,
            cols: null,
            selectedReq: null,
            filters: {},
            ReqAddDialog: false,
            typesOrders: null,
            selectedTypes: null,
            countOrder: 0,
            //Переменные формы добавления требования
            formAddReq: {
                req: null,
                types: [],
                name: [],
                count: [],
                file_more: null,
                customer: null,
                id_manag: null,
                info_text: null,
            }
        }
    },
    methods: {
        async putData() {
            const data = await getDataBoss()
            this.typesOrders = data.typesOrders
            this.cols = Object.keys(data.data[0])
            this.req = data.data
        },
        initFiltres() {
            this.filters = {
                'global': { value: null, matchMode: FilterMatchMode.CONTAINS }
            }
        },
        fileUpload(event) {
            this.formAddReq.file_more = event.files[0]
        },
        sendNewReq() {
            // axios.post(`${this.link}/boss/get`, this.formAddReq, {
            //     headers: {
            //         'Content-Type': 'multipart/form-data',
            //     }
            // })
            this.$toast.add({ severity: 'success', summary: 'Успешно', detail: 'Требование добавлено в систему', life: 3000 });
            this.putData()
        },
        addOrder() {
            this.countOrder += 1
        },
        removeOrder() {
            this.countOrder -= 1
        }
    },
    mounted() {
    },
    created() {
        this.initFiltres()
        this.putData()
    }

}   
</script>

<style lang="scss" scoped>
.btn-group {
    float: right;
}

p {
    margin: 1px;
}
</style>