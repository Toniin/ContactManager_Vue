<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from "primevue/button";
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {signInFormSchema, User} from "@/models/User.model.ts";
import {useUserStore} from "@/stores/user.store.ts";
import {useRouter} from 'vue-router'
import {reactive} from "vue";

const userStore = useUserStore()
const errorForm = reactive({
  isError: false,
  message: ""
})
const router = useRouter()

const {
  errors,
  defineField,
  handleSubmit,
  isSubmitting,
  resetForm
} = useForm({
  validationSchema: toTypedSchema(signInFormSchema),
  initialValues: {
    username: '',
    password: '',
  },
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');

const onSubmitNewUser = async (values) => {
  // Promise of 1s to show the loading button when form is submitting
  await new Promise((resolve) => {
    return setTimeout(() => {
      resolve(true)
    }, 1000)
  })

  userStore.signIn(values)
      .then((data) => {
        const token = data.token
        localStorage.setItem("Token", token);

        errorForm.isError = false
        errorForm.message = ""
        resetForm()

        router.push('/contacts');
      })
      .catch(error => {
        errorForm.isError = true
        errorForm.message = error.message
      })
}

const onSubmit = handleSubmit(onSubmitNewUser);
</script>

<template>
  <form class="flex flex-col gap-10" @submit.prevent="onSubmit" @keydown.enter.prevent="onSubmit">
    <div class="flex flex-col gap-2">
      <label for="username">Username</label>
      <InputText id="username" v-model="username" v-bind="usernameAttrs" autofocus :invalid="Boolean(errors.username)"/>
      <small v-if="Boolean(errors.username)" id="username-error" class="text-red-500">{{ errors.username }}</small>
    </div>

    <div class="flex flex-col gap-2">
      <label for="password">Password</label>
      <Password id="password" v-model="password" v-bind="passwordAttrs" toggleMask :invalid="Boolean(errors.password)"/>
      <small v-if="Boolean(errors.password)" id="password-error" class="text-red-500">{{ errors.password }}</small>
    </div>

    <small v-if="errorForm.isError" id="phone-error" class="text-red-500">{{ errorForm.message }}</small>

    <Button type="submit" label="Sign in" :disabled="isSubmitting" :loading="isSubmitting"/>
  </form>
</template>