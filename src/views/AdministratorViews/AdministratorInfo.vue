<template>

  <h1 style="text-align: center">个人信息</h1>
  <br>
  <br>
  <br>
  <div style="position: absolute;background-color: black;width: 100%;height: 2px;top: 17%"></div>

  <br>
  <div style="text-align: center">
    <el-descriptions :border="true" :column="2" size="large" title="简介">
      <template v-slot:title>
        <div style="text-align: center;width: 100%;position: absolute;">
          简介
          <el-button @click="editInfo" style="position: absolute;right: 5%">
            <setting theme="outline" size="24" fill="#333" :strokeWidth="2"/>
          </el-button>
        </div>
        <br>
      </template>
      <el-descriptions-item label="姓名" width="100px">
        <template v-slot:label>
          <!--          <me style="position: absolute;" id="icon1" theme="outline" size="30" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>-->
          <!--          <label style="position:absolute;left: 20%">姓名</label>-->
          <!--          <br>-->
          <div style="text-align: center">
            <worker theme="outline" style="position: absolute;" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>姓名</label>
          </div>

        </template>
        {{ adminData.adminInfo.employeeName }}
      </el-descriptions-item>
      <el-descriptions-item label="登录名" width="100px">
        <template v-slot:label>
          <div style="text-align: center">
            <me style="position: absolute;" theme="outline" size="28" fill="#333" strokeLinecap="butt"
                :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>登录名</label>
          </div>

        </template>
        {{ adminData.adminInfo.userName }}
      </el-descriptions-item>

      <el-descriptions-item label="联系方式">
        <template v-slot:label>
          <div style="text-align: center">
            <phone-telephone style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>联系方式</label>
          </div>
        </template>
        {{ adminData.adminInfo.contactNumber }}
      </el-descriptions-item>

      <el-descriptions-item label="地址">
        <template v-slot:label>
          <div style="text-align: center">
            <home style="position: absolute;" theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>地址</label>
          </div>
        </template>
        {{ adminData.adminInfo.address }}
      </el-descriptions-item>
      <el-descriptions-item label="性别">
        <template v-slot:label>
          <div style="text-align: center">
            <male v-if="adminData.adminInfo.gender==='男'" style="position: absolute;" theme="outline" size="28"
                  :strokeWidth="2"
                  fill="#333"/>
            <female v-else-if="adminData.adminInfo.gender==='女'" theme="outline" style="position: absolute;" size="28"
                    :strokeWidth="2"
                    fill="#333"/>
            <help v-else theme="outline" style="position: absolute;" size="28" fill="#333" :strokeWidth="2"/>
            &nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp&nbsp<label>性别</label>
          </div>
        </template>
        <el-tag>{{ adminData.adminInfo.gender }}</el-tag>
      </el-descriptions-item>
      <el-descriptions-item label="修改密码">
        <template v-slot:label>
          <div style="text-align: center;display: flex;justify-content: center;align-items: center">
            <help theme="outline" size="28" fill="#333" :strokeWidth="2"/>
            <label>修改密码</label>
          </div>
        </template>
        <el-button @click="editPassword" type="danger" icon="Edit"></el-button>
      </el-descriptions-item>
    </el-descriptions>

  </div>

  <div style="position: absolute;background-color: black;width: 100%;height: 2px;top: 57%"></div>


  <el-dialog
      v-model="editInfoVisible"
      width="30%"
      title="编辑个人信息"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="姓名">
        <el-input v-model="adminData.editInfo.employeeName" placeholder="请输入姓名"></el-input>
      </el-form-item>
      <el-form-item label="登录名">
        <el-input v-model="adminData.editInfo.userName" placeholder="用户名" disabled></el-input>
      </el-form-item>
      <el-form-item label="联系方式">
        <el-input v-model="adminData.editInfo.contactNumber" placeholder="电话" show-word-limit maxlength="11"
                  clearable></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input v-model="adminData.editInfo.address" placeholder="地址"></el-input>
      </el-form-item>
      <el-form-item label="性别">
        <el-radio-group v-model="adminData.editInfo.gender">
          <el-radio label="男" size="large">男</el-radio>
          <el-radio label="女" size="large">女</el-radio>
          <el-radio label="其它" size="large">其它</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <el-button @click="sureEditInfo">确认</el-button>
    <el-button @click="editInfoVisible=false">取消</el-button>
  </el-dialog>

  <!--  修改密码-->
  <el-dialog
      v-model="editPasswordVisible"
      title="修改密码"
      width="30%"
      style="text-align: center"
  >
    <el-form label-width="100px">
      <el-form-item label="旧密码">
        <el-input v-model="oldPassword" placeholder="请输入旧密码" show-password maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="新密码">
        <el-input v-model="newPassword" placeholder="请输入新密码" show-password maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="确认密码">
        <el-input v-model="sureNewPassword" placeholder="请再次输入新密码" show-password maxlength="20"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="sureEditPassword">确认</el-button>
    <el-button @click="editPasswordVisible=false">取消</el-button>
  </el-dialog>
</template>

<script setup lang="ts">
import {inject, reactive, ref} from "vue";
import {
  Me,
  Worker,
  PhoneTelephone,
  Setting,
  Home,
  Female,
  Male,
  Help,
} from "@icon-park/vue-next";
import {Edit} from '@element-plus/icons-vue'
import request from "@/request/request";
import {ElMessage} from "element-plus";

interface AdminInfo {
  employeeId: string,
  employeeName: string,
  address: string,
  contactNumber: string,
  power: number,
  userName: string,
  password: string,
  gender: string,
}

const adminData = reactive({
  adminInfo: {} as AdminInfo,
  editInfo: {} as AdminInfo,
})

const adminId = inject("adminId")
console.log(adminId)
request.get("/employees-entity/getEmployeeById/" + adminId).then(res => {
  adminData.adminInfo = res.data
})
//编辑信息
const editInfoVisible = ref(false)
const editInfo = () => {
  adminData.editInfo = JSON.parse(JSON.stringify(adminData.adminInfo))
  editInfoVisible.value = true
  console.log(adminData.editInfo)
}

const sureEditInfo = () => {
  request.post("/employees-entity/updateEmployee", adminData.editInfo).then(res => {
    if (res.data != null) {
      ElMessage({
        message: "修改成功",
        type: "success",
      })
      adminData.adminInfo = res.data
      editInfoVisible.value = false
    } else {
      ElMessage({
        message: "修改失败",
        type: "error",
      })
    }
  })
}

//修改密码
const editPasswordVisible = ref(false)
const oldPassword = ref("")
const newPassword = ref("")
const sureNewPassword = ref("")
const editPassword = () => {
  oldPassword.value = ""
  newPassword.value = ""
  sureNewPassword.value = ""
  editPasswordVisible.value = true
}
const sureEditPassword = () => {
  if (oldPassword.value != adminData.adminInfo.password) {
    ElMessage({
      message: "旧密码错误",
      type: "error",
    })
    return
  }
  if (newPassword.value != sureNewPassword.value) {
    ElMessage({
      message: "两次密码不一致",
      type: "error",
    })
  } else {
    adminData.editInfo = JSON.parse(JSON.stringify(adminData.adminInfo))
    adminData.editInfo.password = newPassword.value
    request.post("/employees-entity/updateEmployee", adminData.editInfo).then(res => {
      if (res.data != null) {
        ElMessage({
          message: "修改成功",
          type: "success",
        })
        adminData.adminInfo = res.data

        editPasswordVisible.value = false
      } else {
        ElMessage({
          message: "修改失败",
          type: "error",
        })
      }
    })
  }
}

</script>

<style scoped>

</style>