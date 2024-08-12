import {defineStore} from 'pinia'
import {userService} from "@/services/user.service.ts";
import {UserSignIn} from "@/models/User.model.ts";

export const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            username: "",
            isSignIn: false
        }),
        actions: {
            async addNewUser(newUser: UserSignIn) {
                const data = await userService.addNewUser(newUser)

                if (data.isError) {
                    throw new Error(data.message)
                }
            },
        },
    })