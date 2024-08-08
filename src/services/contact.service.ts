import {contactsAPI} from "@/axios.vue";

export const contactService = {
    getContacts: () => {
        return contactsAPI.get("")
            .then(response => response.data)
    },
    deleteContact: (phoneNumber: number) => {
        return contactsAPI.delete(`/delete/${phoneNumber}`)
            .then(response => response.data)
    }
}