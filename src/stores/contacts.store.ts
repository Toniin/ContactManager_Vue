import {defineStore} from 'pinia'
import {contactService} from "../services/contact.service";
import {v4 as uuid} from "uuid";
import {contactsTable} from "../models/Contact.model";

export const useContactsStore = defineStore(
    'contacts',
    {
        state: () => ({
            contacts: [] as contactsTable[],
            message: ''
        }),
        actions: {
            async getContacts() {
                const data = await contactService.getContacts()

                this.contacts.splice(0, this.contacts.length)

                await data.forEach((contact) => {
                    this.contacts.push({
                        key: uuid().slice(0, 16),
                        data: {
                            name: contact.name,
                            phoneNumber: contact.phoneNumber,
                        }
                    })
                })
            },
            async deleteContact(phoneNumber) {
                const data = await contactService.deleteContact(phoneNumber)
                this.message = data.message

                const newContacts = this.contacts.filter(contact => contact.data.phoneNumber !== phoneNumber)
                this.contacts.splice(0, this.contacts.length)
                newContacts.forEach((contact) => {
                    this.contacts.push(contact)
                })
            },
            async addContact(newContact) {
                const data = await contactService.addContact(newContact)
                this.message = data.message
            },
        },
    })