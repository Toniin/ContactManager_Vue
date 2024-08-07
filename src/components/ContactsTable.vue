<script setup>
import {ref, onMounted} from "vue";
import DataTable from 'primevue/treetable';
import Column from 'primevue/column';
import Avatar from 'primevue/avatar';
import {getContacts} from "@/services/contact.service.js";

const contacts = ref([])
let tableKey = 0

onMounted(async () => {
  const data = await getContacts()

  data.forEach((contact) => {
    contacts.value.push({
      key: `${contact.phoneNumber}_${tableKey++}`,
      data: {
        name: contact.name,
        phoneNumber: contact.phoneNumber,
      }
    })
  })
})

</script>

<template>
  <DataTable :value="contacts" tableStyle="min-width: 50vw">
    <Column style="width: 1%">
      <template #body="slotProps">
        <Avatar :image="`https://api.dicebear.com/9.x/personas/svg?seed=${slotProps.node.data.phoneNumber}`"
                size="xlarge" shape="circle"/>
      </template>
    </Column>
    <Column field="phoneNumber" header="Phone number" style="width: 30%"></Column>
    <Column field="name" header="Name"></Column>
  </DataTable>
</template>