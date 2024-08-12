import {createRouter, createWebHistory } from 'vue-router'
import ContactsRoute from "@/views/ContactsRoute.vue";
import AddContactRoute from "./views/AddContactRoute.vue";
import SignUpRoute from "@/views/SignUpRoute.vue";

const router = createRouter({
    history: createWebHistory (),
    routes: [
        {
            path: '/',
            name: 'app',
            redirect: '/sign-up',
            children: [
                {
                    path: '/sign-up',
                    name: 'sign-up',
                    component: SignUpRoute,
                },
                {
                    path: '/contacts',
                    name: 'contacts',
                    component: ContactsRoute,
                },
                {
                    path: '/contacts/add',
                    name: 'contacts/add',
                    component: AddContactRoute,
                },
            ],
        },
    ]
})

export default router
