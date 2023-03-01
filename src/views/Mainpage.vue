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
                                <Button 
                                    @click="openRequirementDialog" 
                                    label="Добавить требование" 
                                    class="p-button-success"
                                    icon="pi pi-plus"
                                />
                            </div>
                            <div class="col-12 md:col-4">
                                <Button 
                                    label="Удалить" 
                                    class="p-button-danger" 
                                    icon="pi pi-trash" 
                                    :disabled="!selectedReq || !selectedReq.length"
                                />
                            </div>
                            <div class="col-12 md:col-4">
                                <span class="p-input-icon-left">
                                    <i class="pi pi-search" />
                                    <InputText v-model="filters['global'].value" type="text" placeholder="Поиск..."/>
                                </span>
                            </div>
                        </div>
                    </template>
                </Toolbar>
                <DataTable 
                    paginator-template="CurrentPageReport FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink RowsPerPageDropdown"
                    responsiveLayout="scroll" breakpoint="960px" 
                    current-page-report-template="Записи с {first} до {last} из {totalRecords}" 
                    :value="req" 
                    :paginator="true" 
                    :rows="10" 
                    :rowsPerPageOptions="[10, 20, 50]"
                    :filters="filters"
                    :stripedRows="true"
                    v-model:selection="selectedReq"
                >
                    <template #header>
                        <p>Требования</p>
                    </template>
                    <Column selectionMode="multiple" style="width: 3rem" :exportable="false"/>
                    <Column :sortable="true" v-for="col in cols" :field="col" :header="col"/>
                </DataTable>
            </div>
        </div>
        <RequirementDialog 
            :isVisible="isRequirementDialogVisible"
            :typesOrders="typesOrders"
            @closeDialog="closeRequirementDialog" 
        />
    </div>
</template>

<script setup>
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import InputText from 'primevue/inputtext'
import Toolbar from 'primevue/toolbar';
import Toast from 'primevue/toast';
import RequirementDialog from '@/components/RequirementDialog.vue';
</script>

<script>
import { getData } from '@/api'
import { VUE_PRIME_DEFAULT_FILTERS } from '@/constants';

export default {
    data() {
        return {
            isRequirementDialogVisible: false,
            req: null,
            cols: null,
            selectedReq: null,
            filters: VUE_PRIME_DEFAULT_FILTERS(),
            typesOrders: null,
        };
    },
    methods: {
        async putData() {
            const data = await getData();
            this.typesOrders = data.typesOrders;
            this.cols = Object.keys(data.data[0]);
            this.req = data.data;
        },
        sendNewReq() {
            this.$toast.add({ severity: "success", summary: "Успешно", detail: "Требование добавлено в систему", life: 3000 });
            this.putData();
        },
        openRequirementDialog() {
            this.isRequirementDialogVisible = true
        },
        closeRequirementDialog() {
            this.isRequirementDialogVisible = false
        }
    },
    created() {
        this.putData();
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