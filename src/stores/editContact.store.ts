import {defineStore} from 'pinia'
import {Contact} from "../models/Contact.model";

export const useEditContactStore = defineStore(
    'editContact',
    {
        state: () => ({
            isEditing: false,
            contact: [] as Contact,
        }),
        actions: {
            isEdit(name, phoneNumber) {
                this.isEditing = true
                this.contact = {
                    name: name,
                    phoneNumber: phoneNumber,
                }
            },
            cancel() {
                this.isEditing = false
                this.contact = {
                    name: '',
                    phoneNumber: '',
                }
            },
        },
    })