<script setup>
import Button from 'primevue/button';
import {useRouter} from "vue-router";
import SignUpForm from "@/components/forms/SignUpForm.vue";

const router = useRouter()
</script>

<template>
  <div class="flex flex-col items-center">
    <h2 class="text-3xl mb-7">Sign up</h2>
    <SignUpForm/>
<!--    <div className="flex items-center pt-8">-->
<!--      <p>Already have an account ?</p>-->
<!--      <Button variant="link" className="text-blue-500" @click="router.go('/sign-in')">-->
<!--        Sign in-->
<!--      </Button>-->
<!--    </div>-->
  </div>
</template>