import {contactsAPI} from "@/axios.vue";

export const getContacts = async() => {
    const response = await contactsAPI.get("")
    return response.data
}