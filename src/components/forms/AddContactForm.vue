<script setup lang="ts">
import InputText from 'primevue/inputtext';
import InputMask from 'primevue/inputmask';
import Button from "primevue/button";
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {contactSchema} from "@/models/Contact.model.ts";
import {phoneValidator_FR} from "@/utils/phone.validator.ts";
import {useContactsStore} from "@/stores/contacts.store.ts";
import {useToast} from "primevue/usetoast";
import {useRouter} from 'vue-router'

const contactsStore = useContactsStore()
const toast = useToast();
const router = useRouter()

const {
  errors,
  defineField,
  handleSubmit,
  isSubmitting
} = useForm({
  validationSchema: toTypedSchema(contactSchema),
  initialValues: {
    name: '',
    phoneNumber: '',
  },
});

const [name, nameAttrs] = defineField('name');
const [phoneNumber, phoneNumberAttrs] = defineField('phoneNumber');

const onSubmitNewContact = async (values) => {
  // Promise of 1s to show the loading button when form is submitting
  await new Promise((resolve) => {
    return setTimeout(() => {
      resolve(true)
    }, 1000)
  })

  if (!phoneValidator_FR(phoneNumber.value)) {
    errors.value.phoneNumber = "Please enter valid phone number"
    return;
  }

  contactsStore.addContact(values)
      .then(() => {
        toast.add({
          severity: 'success',
          summary: contactsStore.message,
          detail: `Contact with phone ${values.phoneNumber} is added`,
          group: 'br',
          life: 3000
        });

        router.push('/contacts');
      })
}

const onSubmit = handleSubmit(onSubmitNewContact);
</script>

<template>
  <form class="flex flex-col gap-10" @submit.prevent="onSubmit" @keydown.enter.prevent="onSubmit">
    <div class="flex flex-col gap-2">
      <label for="name">Name</label>
      <InputText id="name" v-model="name" v-bind="nameAttrs" autofocus :invalid="Boolean(errors.name)"/>
      <small v-if="Boolean(errors.name)" id="name-error" class="text-red-500">{{ errors.name }}</small>
    </div>

    <div class="flex flex-col gap-2" @keyup.enter="onSubmit">
      <label for="phoneNumber">Phone number</label>
      <InputMask id="phoneNumber" v-model="phoneNumber" v-bind="phoneNumberAttrs" :autoClear="false"
                 mask="(+33)9 99 99 99 99"
                 placeholder="(+33)1 23 45 67 89"
                 fluid :invalid="Boolean(errors.phoneNumber)"/>
      <small v-if="Boolean(errors.phoneNumber)" id="phone-error" class="text-red-500">{{ errors.phoneNumber }}</small>
    </div>

    <Button type="submit" label="Add contact" :disabled="isSubmitting" :loading="isSubmitting"/>
  </form>
</template>