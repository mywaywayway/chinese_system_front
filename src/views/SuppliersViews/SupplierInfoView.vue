<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            个人信息
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
                <el-menu-item @click="onPersonInfo">个人信息</el-menu-item>
                <el-menu-item  @click="onOrder">订单管理</el-menu-item>
              </el-menu-item-group>


            </el-sub-menu>

          </el-menu>
        </el-aside>
         <el-main>
           <el-descriptions
               title="供应商基本信息"
               direction="vertical"
               :column="4"

               border
               v-model="supplierData.supplierInfo"
               width="200px"
           >
             <el-descriptions-item label="用户名" label-align="left" align="center"
                                   v-model="supplierData.supplierInfo.userName">
               <template v-slot:label>
                 <edit-name theme="outline" size="24" fill="#333"/>
                 <label>用户名</label>
               </template>
               {{ supplierData.supplierInfo.userName }}
             </el-descriptions-item>
             <el-descriptions-item label="姓名" label-align="left" align="center"
                                   v-model="supplierData.supplierInfo.supplierName">
               <template v-slot:label>
                 <edit-name theme="outline" size="24" fill="#333"/>
                 <label>姓名</label>
               </template>
               {{ supplierData.supplierInfo.supplierName }}
             </el-descriptions-item>

             <el-descriptions-item label="电话" label-align="left" align="center"
                                   v-model="supplierData.supplierInfo.contactNumber">
               <template v-slot:label>
                 <phone-telephone theme="outline" size="24" fill="#333"/>
                 <label>电话</label>
               </template>
               {{ supplierData.supplierInfo.contactNumber }}
             </el-descriptions-item>

             <el-descriptions-item label="用户地址" label-align="left" align="center"
                                   v-model="supplierData.supplierInfo.address">
               <template v-slot:label>
                 <building-three theme="outline" size="24" fill="#333"/>
                 <label>住址</label>
               </template>
               {{ supplierData.supplierInfo.address }}
             </el-descriptions-item>



             <el-descriptions-item label="邮箱" label-align="left" align="center"
                                   v-model="supplierData.supplierInfo.email" >
               <template v-slot:label>
                 <accept-email theme="outline" size="24" fill="#333"/>
                 <label>邮箱</label>
               </template>
               {{ supplierData.supplierInfo.email }}
             </el-descriptions-item>

           </el-descriptions>
           <br>
           <div style="display: flex">
             <div style="flex: 1"></div>
             <el-button @click="onChangePassWord">修改密码</el-button>
             <el-button @click="onChangePersonInfo">修改基本信息</el-button>
             <div style="flex: 1"></div>
           </div>
         </el-main>
      </el-container>
    </el-container>
  </div>

  <el-dialog v-model="changePassWordDialogVisible" title="修改密码" width="30%" center>
    <el-form-item label="旧密码">
      <el-input v-model="changePasswordInfo.oldPassword" show-password></el-input>
    </el-form-item>
    <el-form-item label="新密码">
      <el-input v-model="changePasswordInfo.newPassword" show-password ></el-input>
    </el-form-item>
    <el-form-item label="确认密码">
      <el-input v-model="changePasswordInfo.confirmPassword"  show-password></el-input>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="changePassWordDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureChangePassWordInfo">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>



  <el-dialog v-model="ChangePersonInfoDialogVisible" title="修改基本信息" width="30%" center>
    <el-form-item label="用户名">
      <el-input v-model="supplierData.changeInfo.userName"></el-input>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="supplierData.changeInfo.contactNumber" maxlength="11" show-word-limit type="text"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="supplierData.changeInfo.email"></el-input>
    </el-form-item>
    <el-form-item label="住址">
      <el-input v-model="supplierData.changeInfo.address"></el-input>
    </el-form-item>
    <el-form-item label="名字">
      <el-input v-model="supplierData.changeInfo.supplierName"></el-input>
    </el-form-item>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="ChangePersonInfoDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureChangePersonInfo">
          修改
        </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">

import router from "@/router";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import request from "@/request/request";
import {reactive} from "vue";
import type {supplier} from "@/myInterface/entity";
import {BuildingThree, EditName, PhoneTelephone,AcceptEmail} from "@icon-park/vue-next";
import {ElMessage} from "element-plus";


const myRouter = useRouter()
const pageData = reactive({
  personId: "",

})
const onOrder = () => {
  router.push({
    path: '/supplier/Order' + pageData.personId
  })
}
const changePasswordInfo=reactive({
  oldPassword:"",
  newPassword:"",
  confirmPassword:""
})
const supplierData=reactive({
  supplierInfo:{} as supplier,
  changeInfo:{} as supplier
})
const ChangePersonInfoDialogVisible=ref(false)
onMounted(() => {
  pageData.personId = <string>myRouter.currentRoute.value.params.supplierId
  request.get("/suppliers-entity/getSupplierById/" + pageData.personId).then(res => {
    supplierData.supplierInfo = res.data
  })
})
 const changePassWordDialogVisible=ref(false)
 const  onPersonInfo=()=>{
   router.push({
     path: '/supplier/PersonalInformation' + pageData.personId
   })
 }
 const onChangePassWord=()=>{
   changePassWordDialogVisible.value=true
   changePasswordInfo.confirmPassword=''
   changePasswordInfo.newPassword=''
   changePasswordInfo.confirmPassword=''
 }
 const onChangePersonInfo=()=>{
   ChangePersonInfoDialogVisible.value=true

   supplierData.changeInfo=supplierData.supplierInfo
 }
 const makeSureChangePersonInfo = () => {
   if (supplierData.changeInfo.supplierName=== "")
   {
     ElMessage({
       message:'客户名不能为空',
       type:'error',
     })
     return
   }
   if (supplierData.changeInfo.contactNumber=== "")
   {
     ElMessage({
       message:'联系电话不能为空',
       type:'error',
     })
     return
   }

   if (supplierData.changeInfo.password==="")
   {
     ElMessage({
       message:'密码不能为空',
       type:'error',
     })
     return
   }
   request.post("/suppliers-entity/updateSupplier",supplierData.changeInfo).then(res=>{
     if (res.data){
       ElMessage({
         message:"修改基本信息成功",
         type:'success',
       })
       supplierData.supplierInfo=supplierData.changeInfo
       ChangePersonInfoDialogVisible.value=false
     }else {
       ElMessage({
         message:"修改基本信息失败",
         type:'error',
       })
     }
   })
 }
 const makeSureChangePassWordInfo=()=>{
   if (changePasswordInfo.oldPassword!=supplierData.supplierInfo.password){
     ElMessage({
       message:"旧密码错误",
       type:'error',
     })
     return
   }
   if (changePasswordInfo.newPassword != changePasswordInfo.confirmPassword){
     ElMessage({
       message:"两次密码不一致",
       type:'error',
     })
     return
   }
   supplierData.supplierInfo.password=changePasswordInfo.newPassword
   request.post("/suppliers-entity/updateSupplier",supplierData.supplierInfo).then(res=>{
     if (res.data){
       ElMessage({
         message:"修改密码成功",
         type:'success',
       })
       changePassWordDialogVisible.value=false
     }else {
       ElMessage({
         message:"修改密码失败",
         type:'error',
       })
     }
   })

 }
</script>

<style scoped>

</style>