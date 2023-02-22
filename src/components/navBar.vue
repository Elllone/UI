<template>
    <Menubar :model="items">
    </Menubar>
</template>

<script>

import Menubar from 'primevue/menubar';

export default {
    name: "navBar",
    components: {
        Menubar
    },
    data() {
        return {
            items: [
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
        }
    }
}
</script>