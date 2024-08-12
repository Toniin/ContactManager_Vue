import {useUserStore} from "@/stores/user.store.ts";
import router from "@/router.ts";

export const authGuard = (router) => {
    router.beforeEach((to, from, next) => {
            const userStore = useUserStore()
            const isProtectedRoutes = to.meta.requiresAuth
            const isPublicRoutes = !to.meta.requiresAuth
            const isNotFound = to.name === "page-not-found"

            if (isProtectedRoutes) {
                if (userStore.isSignIn) {
                    next()
                } else {
                    router.push("/sign-in")
                }
            }

            if (isPublicRoutes) {
                if (userStore.isSignIn && !isNotFound) {
                    router.push("/contacts")
                } else {
                    next()
                }
            }
        }
    )
}