<script setup>
import Button from 'primevue/button';
import {useRouter} from "vue-router";
import SignInForm from "@/components/forms/SignInForm.vue";

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center">
    <h2 class="text-3xl mb-7">Sign in</h2>
    <SignInForm/>
    <div className="flex items-center pt-8">
      <p>Don't have an account ?</p>
      <Button link label="Sign up" aria-label="Go to sign in" @click="router.push('/sign-up')"/>
    </div>
  </div>
</template>