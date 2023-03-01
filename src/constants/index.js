import { FilterMatchMode } from 'primevue/api';

export const NAVBAR_ITEMS = [
	{
			label: "Главная",
			icon: 'pi pi-home',
			to: "/",
	},
	{
			label: "Аккаунты",
			icon: "pi pi-user",
			to: "/profiles"
	},
	{
			label: "Отделы/Товары",
			icon: "pi pi-wrench"

	},
	{
			label: "Выйти",
			icon: "pi pi-power-off"
	}
]

export const VUE_PRIME_DEFAULT_FILTERS = () => ({
	"global": { value: null, matchMode: FilterMatchMode.CONTAINS }
})