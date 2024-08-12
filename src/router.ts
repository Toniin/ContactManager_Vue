import {createRouter, createWebHistory} from 'vue-router'
import ContactsRoute from "@/views/protected/ContactsRoute.vue";
import AddContactRoute from "./views/protected/AddContactRoute.vue";
import SignUpRoute from "@/views/public/SignUpRoute.vue";
import SignInRoute from "@/views/public/SignInRoute.vue";
import {authGuard} from "@/guards/auth.guard.ts";
import NotFoundRoute from "@/views/public/NotFoundRoute.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            name: 'app',
            redirect: '/sign-in',
        },
        {
            path: '/sign-up',
            name: 'sign-up',
            component: SignUpRoute,
        },
        {
            path: '/sign-in',
            name: 'sign-in',
            component: SignInRoute,
        },
        {
            path: '/contacts',
            name: 'contacts',
            component: ContactsRoute,
            meta: {requiresAuth: true},
        },
        {
            path: '/contacts/add',
            name: 'contacts/add',
            component: AddContactRoute,
            meta: {requiresAuth: true},
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'page-not-found',
            component: NotFoundRoute
        },
    ]
})

authGuard(router)

export default router
