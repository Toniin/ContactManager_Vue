import {contactsAPI} from "@/utils/axios.vue";
import {UserSignIn, UserSignUp} from "@/models/User.model.ts";


export const userService = {
    signUp: (newUser: UserSignUp) => {
        return contactsAPI.post("/auth/register", JSON.stringify(newUser))
            .then(response => response.data)
            .catch(error => error.response.data);
    },
    signIn: (user: UserSignIn) => {
        return contactsAPI.post("/auth/login", JSON.stringify(user))
            .then(response => response.data)
            .catch(error => error.response.data);
    },
}