
<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            药品购买
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
          </el-col>
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            <el-button style="margin-left: 300px" @click="router.push({path:'/'})">esc</el-button>
          </el-col>
        </el-row>
      </el-header>
      <el-container>
        <el-aside width="200px">

          <el-menu
              default-active="2"
              class="el-menu-vertical-demo"
              background-color="#a6a9de"

          >

            <el-sub-menu index="1">
              <template #title>
                <!--                <el-icon><location /></el-icon>-->
                <span>菜单</span>
              </template>
              <el-menu-item-group>
                <el-menu-item  @click="onPersonInfo">个人信息</el-menu-item>
                <el-menu-item  @click="onBuyMedicines">药品购买</el-menu-item>
                <el-menu-item  @click="onPersonPurchaseHistory">个人购买记录</el-menu-item>
              </el-menu-item-group>


            </el-sub-menu>

          </el-menu>
        </el-aside>
        <el-main>
              <div style="display: flex;margin-top: 100px">

                <el-input placeholder="请输入药品名称" v-model="search" style="width: 200px  " ></el-input>
              </div>
          <el-table :data="filterData" style="width: 100%">
            <el-table-column fixed prop="medicineId" label="药品ID" width="150" />
            <el-table-column prop="medicineName" label="药品名" width="120" />
            <el-table-column prop="stockQuantity" label="库存" width="120" />
            <el-table-column prop="stockUnit" label="单位" width="120" />
            <el-table-column prop="supplierId" label="供应商ID" width="120" />
            <el-table-column prop="unitPrice" label="单价" width="120" />
            <el-table-column property="photoUrl" label="图片" width="180">
              <template  #default="scope">
                  <el-image  style="width: 100px; height: 100px; margin-left:10px;"
                             :src="scope.row.photoUrl"
                  ></el-image>

                　　</template>

            </el-table-column>

            <el-table-column prop="introduction" label="介绍" width="600" />
            <el-table-column fixed="right" label="操作" width="120">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="onBuy(scope.row)"
                >购买</el-button
                >
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog v-model="BuyMedicinesDialogVisible" title="购买药品" width="30%" center>
    <el-form-item label="药品名称">
      <div>{{pageData.medicineName}}</div>
    </el-form-item>
    <el-form-item label="购买数量">
      <el-input v-model="saleData.saleInfo.quantity" ></el-input>
    </el-form-item>
    <el-form-item label="购买单位">
      <div >{{saleData.saleInfo.unit}}</div>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="BuyMedicinesDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureBuyMedicines">
          确认购买
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>


<script setup lang="ts">

import router from "@/router";
import {useRouter} from "vue-router";
import {computed, onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import type {medicine, salesInformation} from "@/myInterface/entity";
import {ElMessage} from "element-plus";

const myRouter = useRouter()

onMounted(() => {
  pageData.personId = <string>myRouter.currentRoute.value.params.customerId
  request.post("/medicines-entity/getMedicines").then(res=>{
   medicineData.push(...res.data)

  })
})
const  BuyMedicinesDialogVisible=ref(false)
const pageData = reactive({
  personId: '',
  medicineName:'',
  unitPrice:'',
})
const saleData=reactive({
  saleInfo:{} as salesInformation
})

const  onBuy=(row)=>{
    pageData.unitPrice=row.unitPrice
    pageData.medicineName=row.medicineName
    saleData.saleInfo.customerId=pageData.personId
    saleData.saleInfo.medicineId=row.medicineId
    saleData.saleInfo.unit=row.stockUnit




  BuyMedicinesDialogVisible.value=true
}
const onPersonPurchaseHistory=()=>{
  router.push({
    path:"/customers/PersonalPurchaseHistory"+pageData.personId
  })
}
const makeSureBuyMedicines=()=>{
  if (saleData.saleInfo.quantity== "0"){
     ElMessage({
       message:'数量不能为0',
       type:"error"
     })
    return
  }
        saleData.saleInfo.totalPrice=saleData.saleInfo.quantity*pageData.unitPrice
  let date=new Date()
  let year=date.getFullYear()
  let dateArr = [
    <string>date.getMonth() + 1,
    <string>date.getDate(),
  ];
  let strDate=<string>year
  for (let i = 0; i < dateArr.length; i++) {
    if (dateArr[i] >= 1 && dateArr[i] <= 9) {
      strDate=strDate+"-0"+<string>dateArr[i]
    }
    else {
      strDate=strDate+"-"+<string>dateArr[i]
    }
  }
    saleData.saleInfo.salesDate=strDate
     request.post("/sales-information-entity/inster",saleData.saleInfo).then(res=>{
       if (res.data == 1){
         ElMessage({
           message:'购买成功',
           type:'success'
         })
         BuyMedicinesDialogVisible.value=false
       }else {
         ElMessage({
           message:'购买失败',
           type:'error'
         })
       }
     })
}
const medicineData:medicine[]=reactive([])
const search=ref("")

const filterData = computed(()=>{
    return medicineData.filter((item:medicine)=>{
      return item.medicineName.includes(search.value) || item.supplierId.includes(search.value)
    })
})

 const  onBuyMedicines=()=>{
   router.push({
     path:'/customers/BuyMedicines'+pageData.personId
   })
 }
const onPersonInfo = () => {
  router.push({
    path: '/customers/personInfo' + pageData.personId
  })
}
</script>


<style scoped>

</style>