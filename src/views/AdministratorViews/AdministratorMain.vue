<template>

  <div id="left" style="text-align: center;">
    <h2>{{ adminData.adminInfo.employeeName }}
    </h2>

    <el-button style="width: 100%;position: absolute;left: 0;top: 30%" @click="goToAdminInfo">个人信息</el-button>
    <br>
    <el-button style="width: 100%;position: absolute;left: 0;top: 40%" @click="goToMedicineInfo">药品信息</el-button>

  </div>

  <div id="right">
    <router-view/>
  </div>
</template>

<script setup lang="ts">

import {provide, reactive} from "vue";
import {useRouter} from "vue-router";
import request from "@/request/request";

interface AdminInfo{
  employeeId:string,
  employeeName:string,
  address:string,
  contactNumber:string,
  power:number,
  userName:string,
  password:string,
}

const adminData = reactive({
  adminInfo:{} as AdminInfo,
})

const myRouter = useRouter()
const adminId = <string>myRouter.currentRoute.value.params.adminId
provide("adminId",adminId)
request.get("/employees-entity/getEmployeeById/"+adminId).then(res=>{
  adminData.adminInfo = res.data
  goToAdminInfo()
})


const goToAdminInfo = () => {
  myRouter.push({name: "adminInfo"})
}

const goToMedicineInfo = () => {
  myRouter.push({name: "medicinesInfo"})
}

</script>

<style scoped>
#left {
  position: absolute;
  width: 15%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #a6a9de;
}
#right{
  position: absolute;
  width: 85%;
  height: 100%;
  top: 0;
  left: 15%;
  //background-color: #131cb6;
}
</style>