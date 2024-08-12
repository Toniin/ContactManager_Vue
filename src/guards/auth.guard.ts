<script setup lang="ts">
import {useRouter} from "vue-router";
import {useUserStore} from "@/stores/user.store.ts";

const router = useRouter()
const userStore = useUserStore()

router.beforeEach((to) => {
      const userStore = useUserStore()
      const isProtectedRoutes = to.meta.requiresAuth
      const isPublicRoutes = !to.meta.requiresAuth

      if (isProtectedRoutes) {
        if (userStore.isSignIn) {
          return true
        } else {
          router.push("/sign-in")
        }
      }

      if (isPublicRoutes) {
        if (userStore.isSignIn) {
          return router.push("/contacts")
        } else {
          return true
        }
      }
    }
)
</script>