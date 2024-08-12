import {contactsAPI} from "@/utils/axios.vue";
import {Contact} from "../models/Contact.model";
import {phoneFormatInternational_FR_fr, phoneFormatLocal_FR_fr} from "../utils/phone.validator";

export const contactService = {
    addContact: (newContact: Contact) => {
        return contactsAPI.post("/add", JSON.stringify(newContact))
            .then(response => response.data)
    },
    getContacts: () => {
        return contactsAPI.get("")
            .then(response => {
                return response.data.map((contact: Contact) => ({
                    name: contact.name,
                    phoneNumber: phoneFormatLocal_FR_fr(contact.phoneNumber)
                }))
            })
    },
    getContact: (phoneNumber: string) => {
        return contactsAPI.get(`/find/${phoneNumber}`)
            .then(response => ({
                name: response.data.name,
                phoneNumber: phoneFormatLocal_FR_fr(response.data.phoneNumber)
            }))
            .catch(error => error.response.data);
    },
    deleteContact: (phoneNumber: string) => {
        const phone = phoneFormatInternational_FR_fr(phoneNumber)

        return contactsAPI.delete(`/delete/${phone}`)
            .then(response => response.data)
    },
    editContact: (editedContact: Contact) => {
        return contactsAPI.put(`/update/${editedContact.phoneNumber}`, JSON.stringify(editedContact))
            .then(response => response.data)
    }
}