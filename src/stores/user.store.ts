import {defineStore} from 'pinia'
import {userService} from "@/services/user.service.ts";
import {UserSignIn, UserSignUp} from "@/models/User.model.ts";

export const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            username: "",
            isSignIn: false
        }),
        persist: true,
        actions: {
            async signUp(newUser: UserSignUp) {
                const data = await userService.signUp(newUser)

                if (data.isError) {
                    throw new Error(data.message)
                }
            },
            async signIn(user: UserSignIn) {
                const data = await userService.signIn(user)

                if (data.isError) {
                    throw new Error(data.message)
                }

                this.username = data.user
                this.isSignIn = true

                return data
            },
            async signOut() {
                this.username = ""
                this.isSignIn = false
            },
        },
    })