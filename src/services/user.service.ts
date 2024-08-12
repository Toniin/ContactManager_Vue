import {contactsAPI} from "@/axios.vue";
import {UserSignUp} from "@/models/User.model.ts";


export const userService = {
    addNewUser: (newUser: UserSignUp) => {
        return contactsAPI.post("/auth/register", JSON.stringify(newUser))
            .then(response => response.data)
            .catch(error => error.response.data);
    },
}