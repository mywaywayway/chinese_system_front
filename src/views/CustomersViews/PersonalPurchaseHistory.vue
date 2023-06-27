<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            购买记录
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
            <el-table-column prop="quantity" label="数量" width="120" />
            <el-table-column prop="unit" label="单位" width="120" />
            <el-table-column prop="totalPrice" label="总价" width="120" />
            <el-table-column prop="salesDate" label="购买日期" width="120" />

<!--            <el-table-column fixed="right" label="操作" width="120">-->
<!--              <template #default="scope">-->
<!--                <el-button link type="primary" size="small" @click="onBuy(scope.row)"-->
<!--                >购买</el-button-->
<!--                >-->
<!--              </template>-->
<!--            </el-table-column>-->
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>

<script setup lang="ts">

import router from "@/router";
import {useRouter} from "vue-router";
import {computed, onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import type {salesView} from "@/myInterface/entity";

const myRouter = useRouter()

const  pageData=reactive({
  personId:'',
})
const filterData=computed(()=>{
  return salesViewData.filter(item=>item.medicineName.includes(search.value))
})

const salesViewData:salesView[]=reactive([])
onMounted(() => {
  pageData.personId = <string>myRouter.currentRoute.value.params.customerId
     request.get("/sales-view/get-sales-view/"+pageData.personId).then(res=>{
       salesViewData.push(...res.data)
     })


})
const  search=ref("")
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

const onPersonPurchaseHistory=()=>{
  router.push({
    path:"/customers/PersonalPurchaseHistory"+pageData.personId
  })
}
</script>
<style scoped>

</style>