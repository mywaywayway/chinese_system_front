<template>

</template>

<script lang="ts" setup>

import {useRouter} from "vue-router";
import {reactive} from "vue";

 interface pageInfo{
   personId:string
 }

const  pageData=reactive({
      personId :''
})

const myRouter =  useRouter()
  pageData.personId=<string>myRouter.currentRoute.value.params.customerId
    console.log(pageData.personId)
</script>

<style scoped>

</style>