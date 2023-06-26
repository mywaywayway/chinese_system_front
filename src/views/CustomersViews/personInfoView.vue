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
                <el-menu-item index="1-2" @click="onPersonInfo">个人信息</el-menu-item>
                <el-menu-item index="1-3" @click="onBuyMedicines">药品购买</el-menu-item>
                <el-menu-item index="1-4" @click="">个人购买记录</el-menu-item>
              </el-menu-item-group>


            </el-sub-menu>

          </el-menu>
        </el-aside>
        <el-main>
          <el-descriptions
              title="用户基本信息"
              direction="vertical"
              :column="4"

              border
              v-model="personData.personInfo"
              width="200px"
          >
            <el-descriptions-item label="用户名" label-align="left" align="center"
                                  v-model="personData.personInfo.userName">
              <template v-slot:label>
                <edit-name theme="outline" size="24" fill="#333"/>
                <label>用户名</label>
              </template>
              {{ personData.personInfo.userName }}
            </el-descriptions-item>
            <el-descriptions-item label="用户姓名" label-align="left" align="center"
                                  v-model="personData.personInfo.customerName">
              <template v-slot:label>
                <edit-name theme="outline" size="24" fill="#333"/>
                <label>用户姓名</label>
              </template>
              {{ personData.personInfo.customerName }}
            </el-descriptions-item>

            <el-descriptions-item label="电话" label-align="left" align="center"
                                  v-model="personData.personInfo.contactNumber">
              <template v-slot:label>
                <phone-telephone theme="outline" size="24" fill="#333"/>
                <label>电话</label>
              </template>
              {{ personData.personInfo.contactNumber }}
            </el-descriptions-item>

            <el-descriptions-item label="用户地址" label-align="left" align="center"
                                  v-model="personData.personInfo.address">
              <template v-slot:label>
                <building-three theme="outline" size="24" fill="#333"/>
                <label>用户地址</label>
              </template>
              {{ personData.personInfo.address }}
            </el-descriptions-item>

            <el-descriptions-item label="性别" label-align="left" align="center"
                                  v-model="personData.personInfo.gender">

              <template v-slot:label>

                <female v-if="personData.personInfo.gender==='女'" theme="outline" size="24" fill="#333"/>
                <male v-if="personData.personInfo.gender==='男'" theme="outline" size="24" fill="#333"/>
                <label>性别</label>
              </template>
              {{ personData.personInfo.gender }}
            </el-descriptions-item>

            <el-descriptions-item label="邮箱" label-align="left" align="center"
                                  v-model="personData.personInfo.email">
              <template v-slot:label>
                <accept-email theme="outline" size="24" fill="#333"/>
                <label>邮箱</label>
              </template>
              {{ personData.personInfo.email }}
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
      <el-input v-model="personData.changeInfo.userName"></el-input>
    </el-form-item>
    <el-form-item label="性别">
      <el-radio-group v-model="personData.changeInfo.gender">
        <el-radio label="男">男</el-radio>
        <el-radio label="女">女</el-radio>
        <el-radio label="其他">其他</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item label="电话">
      <el-input v-model="personData.changeInfo.contactNumber" maxlength="11" show-word-limit type="text"></el-input>
    </el-form-item>
    <el-form-item label="邮箱">
      <el-input v-model="personData.changeInfo.email"></el-input>
    </el-form-item>

    <el-form-item label="客户名字">
      <el-input v-model="personData.changeInfo.customerName"></el-input>
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

<script lang="ts" setup>

import {useRouter} from "vue-router";
import {onMounted, reactive, ref} from "vue";

import router from "@/router";
import request from "@/request/request";
import {BuildingThree, EditName, PhoneTelephone} from "@icon-park/vue-next";
import type {personInfo} from "@/myInterface/entity";
import {ElMessage} from "element-plus";

const myRouter = useRouter()

onMounted(() => {
  pageData.personId = <string>myRouter.currentRoute.value.params.customerId
  request.get("/customers-entity/getInfoById/" + pageData.personId).then(res => {
    personData.personInfo = res.data

  })
})
const  onBuyMedicines=()=>{
  router.push({
    path:'/customers/BuyMedicines'+pageData.personId
  })
}
const changePassWordDialogVisible=ref(false)

const pageData = reactive({
  personId: ''
})
const changePasswordInfo=reactive({
  oldPassword:'',
  newPassword:'',
  confirmPassword:'',
})

const personData = reactive({
  personInfo: {} as personInfo,
  changeInfo:{} as personInfo
})


const makeSureChangePersonInfo=()=>{
  if (personData.changeInfo.customerName=== "")
  {
    ElMessage({
      message:'客户名不能为空',
      type:'error',
    })
    return
  }
  if (personData.changeInfo.contactNumber=== "")
  {
    ElMessage({
      message:'联系电话不能为空',
      type:'error',
    })
    return
  }

  if (personData.changeInfo.password==="")
  {
    ElMessage({
      message:'密码不能为空',
      type:'error',
    })
    return
  }
  request.post("/customers-entity/updateInfo",personData.changeInfo).then(res=>{
    if (res.data == 1){
      ElMessage({
        message:"修改基本信息成功",
        type:'success',
      })
      ChangePersonInfoDialogVisible.value=false
    }else {
      ElMessage({
        message:"修改基本信息失败",
        type:'error',
      })
    }

  })

}
const ChangePersonInfoDialogVisible=ref(false)
 const  onChangePassWord=()=>{
     changePassWordDialogVisible.value=true
      changePasswordInfo.confirmPassword=''
      changePasswordInfo.newPassword=''
     changePasswordInfo.confirmPassword=''
}

 const makeSureChangePassWordInfo=()=>{
  if (changePasswordInfo.oldPassword!=personData.personInfo.password){
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
  personData.personInfo.password=changePasswordInfo.newPassword
   request.post("/customers-entity/updateInfo",personData.personInfo).then(res=>{
     if (res.data == 1){
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
 const onChangePersonInfo=()=>{
        ChangePersonInfoDialogVisible.value=true

       personData.changeInfo=personData.personInfo

 }
const onPersonInfo = () => {
  router.push({
    path: '/customers/personInfo' + pageData.personId
  })
}

</script>

<style scoped>

</style>