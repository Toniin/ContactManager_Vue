import {createRouter, createMemoryHistory} from 'vue-router'
import ContactsRoute from "@/views/ContactsRoute.vue";

const router = createRouter({
    history: createMemoryHistory(),
    routes: [
        {
            path: '/',
            name: 'app',
            redirect: '/contacts',
            children: [
                {
                    path: '/contacts',
                    name: 'contacts',
                    component: ContactsRoute,
                },
            ],
        },
    ]
})

export default router
