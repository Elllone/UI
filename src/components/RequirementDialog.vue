<template>
	<Dialog 
		header="Добавление требования" 
		:breakpoints="{ '960px': '75vw', '640px': '90vw' }" 
		:maximizable="true"
		:visible="isVisible" 
		:style="{ width: '70%' }" 
		:modal="true"
	>
		<form>
				<div class="grid p-fluid">
						<div class="col-12 md:col-12">
							<InputText v-model="requirementFormState.req" step="0.1" type="number" placeholder="Требование"/>
						</div>
						<div class="col-12 md:col-3">
							<Dropdown 
								optionLabel="name" 
								optionValue="id"
								placeholder="Тип"
								v-model="requirementFormState.types" 
								:options="typesOrders" 
							/>
						</div>
						<div class="col-12 md:col-3">
							<InputText v-model="requirementFormState.name" type="text" placeholder="Наименование"/>
						</div>
						<div class="col-12 md:col-3">
							<InputText v-model="requirementFormState.count" type="number" placeholder="Количество"/>
						</div>
						<div class="col-12 md:col-3" style="text-align: center;">
							<Button @click="addOrder" label="Добавить" icon="pi pi-plus" class="p-button-success"/>
						</div>
						<div class="col-12 md:col-12">
							<div v-for="index in countOrder" class="grid p-fluid">
								<div class="col-12 md:col-3">
									<Dropdown :options="typesOrders" optionLabel="name" optionValue="id" placeholder="Тип"/>
								</div>
								<div class="col-12 md:col-3">
									<InputText type="text" placeholder="Наименование"/>
								</div>
								<div class="col-12 md:col-3">
									<InputText type="number" placeholder="Количество"/>
								</div>
								<div class="col-12 md:col-3" style="text-align: center;">
									<Button @click="removeOrder" label="Удалить" icon="pi pi-minus" class="p-button-danger"/>
								</div>
							</div>
						</div>
						<div class="col-12 md:col-8">
							<InputText v-model="requirementFormState.customer" type="text" placeholder="Заказчик"/>
						</div>
						<div class="col-12 md:col-4">
							<InputText v-model="requirementFormState.groupId" type="number" placeholder="ID для группировок требований"/>
						</div>
						<div class="col-12 md:col-12" style="text-align: center;">
							<FileUpload 
								mode="basic" 
								cancelLabel="Отмена"
								choose-label="Примечание"
								:fileLimit=1 
								:showUploadButton="false"
								:customUpload="true"
								@select="fileUpload"
								@uploader="requirementFormState.fileMore = null" 
							/>
						</div>
						<div class="col-12 md:col-12">
							<InputText 
								type="text" 
								placeholder="Общее примечание к требованию"
								v-model="requirementFormState.description" 
							/>
						</div>
				</div>
		</form>
		<template #footer>
			<Button class="p-button-success" label="Сохранить" @click="emit('addNewRequirement')" />
			<Button class="p-button-danger" label="Закрыть" @click="emit('closeDialog')"/>
		</template>
	</Dialog>
</template>


<script setup>
import Button from 'primevue/button';
import InputText from 'primevue/inputtext'
import Dialog from 'primevue/dialog';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import { ref } from 'vue';

const emit = defineEmits(
	"closeDialog", 
	"addNewRequirement", 
	"uploadFile"
)
const props = defineProps({
  isVisible: Boolean,
	typesOrders: Array
})

const countOrder = ref(0)
const requirementFormState = ref({
	req: null,
	types: [],
	name: [],
	count: [],
	fileMore: null,
	customer: null,
	groupId: null,
	description: null,
})

function fileUpload(event) {
	requirementFormState.fileMore = event.files[0];
}
function addOrder() {
	countOrder++
}

</script>