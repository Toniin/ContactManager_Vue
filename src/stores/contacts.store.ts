import {defineStore} from 'pinia'
import {contactService} from "../services/contact.service";
import {contactsTable} from "../models/Contact.model";

export const useContactsStore = defineStore(
    'contacts',
    {
        state: () => ({
            contacts: [] as contactsTable[],
            message: '',
            isSearching: false,
        }),
        actions: {
            async getContacts() {
                const data = await contactService.getContacts()

                this.isSearching = false
                this.contacts.splice(0, this.contacts.length)

                await data.forEach((contact) => {
                    this.contacts.push({
                        data: {
                            name: contact.name,
                            phoneNumber: contact.phoneNumber,
                        }
                    })
                })
            },
            async getContact(phoneNumber: string) {
                const data = await contactService.getContact(phoneNumber)

                if (data.isError) {
                    throw new Error(data.message)
                }

                const filteredContacts = this.contacts.filter((contact: contactsTable) => contact.data.phoneNumber === data.phoneNumber)
                const contactFiltered = filteredContacts[0]

                this.isSearching = true
                this.contacts.splice(0, this.contacts.length)
                if (contactFiltered.data.name !== data.name) {
                    this.contacts.push({
                        data: {
                            name: data.name,
                            phoneNumber: data.phoneNumber,
                        }
                    })
                } else {
                    this.contacts.push(contactFiltered)
                }
            },
            async deleteContact(phoneNumber) {
                const data = await contactService.deleteContact(phoneNumber)
                this.message = data.message
            },
            async addContact(newContact) {
                const data = await contactService.addContact(newContact)
                this.message = data.message
            },
            async editContact(editedContact) {
                const data = await contactService.editContact(editedContact)
                this.message = data.message
            },
        },
    })