<script setup lang="ts">
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import RadioButton from 'primevue/radiobutton';
import Button from "primevue/button";
import {useForm} from 'vee-validate';
import {toTypedSchema} from '@vee-validate/zod';
import {signUpFormSchema} from "@/models/User.model.ts";
import {useUserStore} from "@/stores/user.store.ts";
import {useToast} from "primevue/usetoast";
import {useRouter} from 'vue-router'
import {reactive} from "vue";

const userStore = useUserStore()
const errorForm = reactive({
  isError: false,
  message: ""
})
const toast = useToast();
const router = useRouter()

const {
  errors,
  defineField,
  handleSubmit,
  isSubmitting,
  resetForm
} = useForm({
  validationSchema: toTypedSchema(signUpFormSchema),
  initialValues: {
    username: '',
    password: '',
    role: 'USER'
  },
});

const [username, usernameAttrs] = defineField('username');
const [password, passwordAttrs] = defineField('password');
const [role, roleAttrs] = defineField('role');

const onSubmitNewUser = async (values) => {
  // Promise of 1s to show the loading button when form is submitting
  await new Promise((resolve) => {
    return setTimeout(() => {
      resolve(true)
    }, 1000)
  })

  console.log(values)

  userStore.addNewUser(values)
      .then(() => {
        errorForm.isError = false
        errorForm.message = ""
        resetForm()

        toast.add({
          severity: 'success',
          summary: "User sign up successfully",
          detail: `${values.username} is sign up with role : ${values.role}`,
          group: 'br',
          life: 3000
        });

        // router.push('/sign-in');
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
      <label for="name">Name</label>
      <InputText id="name" v-model="username" v-bind="usernameAttrs" autofocus :invalid="Boolean(errors.username)"/>
      <small v-if="Boolean(errors.username)" id="name-error" class="text-red-500">{{ errors.username }}</small>
    </div>

    <div class="flex flex-col gap-2">
      <Password v-model="password" v-bind="passwordAttrs" toggleMask :invalid="Boolean(errors.password)"/>
      <small v-if="Boolean(errors.password)" id="name-error" class="text-red-500">{{ errors.password }}</small>
    </div>

    <div class="flex flex-wrap gap-4">
      <div class="flex items-center">
        <RadioButton v-model="role" v-bind="roleAttrs" inputId="role-user" name="role-user" value="USER"/>
        <label for="role-user" class="ml-2">USER</label>
      </div>
      <div class="flex items-center">
        <RadioButton v-model="role" v-bind="roleAttrs" inputId="role-admin" name="role-admin" value="ADMIN"/>
        <label for="role-admin" class="ml-2">ADMIN</label>
      </div>
    </div>

    <!--    <div class="flex flex-col gap-2" @keyup.enter="onSubmit">-->
    <!--      <label for="phoneNumber">Phone number</label>-->
    <!--      <InputMask id="phoneNumber" v-model="phoneNumber" v-bind="phoneNumberAttrs" :autoClear="false"-->
    <!--                 mask="(+33)9 99 99 99 99"-->
    <!--                 placeholder="(+33)1 23 45 67 89"-->
    <!--                 fluid :invalid="Boolean(errors.phoneNumber)"/>-->
    <!--      <small v-if="Boolean(errors.phoneNumber)" id="phone-error" class="text-red-500">{{ errors.phoneNumber }}</small>-->
    <!--    </div>-->

    <small v-if="errorForm.isError" id="phone-error" class="text-red-500">{{ errorForm.message }}</small>

    <Button type="submit" label="Sign up" :disabled="isSubmitting" :loading="isSubmitting"/>
  </form>
</template>