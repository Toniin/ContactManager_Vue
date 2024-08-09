import {contactsAPI} from "@/axios.vue";
import {Contact} from "../models/Contact.model";

export const contactService = {
    getContacts: () => {
        return contactsAPI.get("")
            .then(response => response.data)
    },
    deleteContact: (phoneNumber: string) => {
        return contactsAPI.delete(`/delete/${phoneNumber}`)
            .then(response => response.data)
    },
    addContact: (newContact: Contact) => {
        return contactsAPI.post("/add", JSON.stringify(newContact))
            .then(response => response.data)
    },
    editContact: (editedContact: Contact) => {
        return contactsAPI.put(`/update/${editedContact.phoneNumber}`, JSON.stringify(editedContact))
            .then(response => response.data)
    }
}