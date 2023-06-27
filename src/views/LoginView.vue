<template>

  <div id="main">

    <div id="one">
      <me id="icon1" theme="outline" size="40" fill="#333" :strokeWidth="2" strokeLinecap="butt"/>
      <el-input style="width: 20%" v-model="form.userName" clearable maxlength="20" show-word-limit></el-input>
    </div>

    <br>
    <div id="two">
      <keyboard-one theme="outline" size="40" fill="#333" :strokeWidth="2"/>
      <el-input style="width: 20%" v-model="form.password" show-password clearable maxlength="20"></el-input>
    </div>

    <div id="three">
      <el-radio-group v-model="userType" size="large">
        <el-radio-button label="管理员" style="width: 100px"/>
        <el-radio-button label="客户" style="width: 100px"/>
        <el-radio-button label="供应商" style="width: 100px"/>
      </el-radio-group>
    </div>
    <el-radio-group>
      <el-button @click="login" id="loginButton">登录</el-button>
      <el-button @click="register" id="registerButton">客户注册</el-button>
    </el-radio-group>


  </div>
    <el-dialog v-model="registerDialogVisible" title="顾客注册" width="30%" center>
      <el-form-item label="用户名">
        <el-input v-model="customerInfo.costomerRegiter.userName"  ></el-input>
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="customerInfo.costomerRegiter.gender">
          <el-radio label="男">男</el-radio>
          <el-radio label="女">女</el-radio>
          <el-radio label="其他">其他</el-radio>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="客户名">
        <el-input  v-model="customerInfo.costomerRegiter.customerName" ></el-input>
      </el-form-item>
      <el-form-item label="联系电话">
        <el-input  v-model="customerInfo.costomerRegiter.contactNumber" maxlength="11" show-word-limit type="text" ></el-input>
      </el-form-item>
      <el-form-item label="地址">
        <el-input  v-model="customerInfo.costomerRegiter.address" ></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input   v-model="customerInfo.costomerRegiter.password" show-password clearable maxlength="20"></el-input>
      </el-form-item>
      <el-form-item label="邮箱">
        <el-input   v-model="customerInfo.costomerRegiter.email" ></el-input>
      </el-form-item>
      <template #footer>
      <span class="dialog-footer">
        <el-button @click="registerDialogVisible = false">取消</el-button>
        <el-button type="primary" @click="makeSureRegister">
          注册
        </el-button>
      </span>
      </template>
    </el-dialog>

</template>

<script lang="ts" setup>
import {defineComponent, reactive, ref} from "vue";
import {Me, KeyboardOne} from '@icon-park/vue-next'
import request from "@/request/request";
import router from "@/router";
import {ElMessage} from "element-plus";
import type {personInfo} from "@/myInterface/entity";


const customerInfo=reactive({
     costomerRegiter:{} as personInfo
})
//用户登录信息
const form = ref({
  userName: '',
  password: ''
})
//用户登录类型
const userType = ref('客户')
//用户登录
const register = () => {

   registerDialogVisible.value=true
   customerInfo.costomerRegiter.contactNumber=''
   customerInfo.costomerRegiter.gender=''
   customerInfo.costomerRegiter.customerId=''
   customerInfo.costomerRegiter.customerName=''
   customerInfo.costomerRegiter.email=''
   customerInfo.costomerRegiter.address=''
   customerInfo.costomerRegiter.password=''
   customerInfo.costomerRegiter.userName=''
}
//用户注册弹窗
const registerDialogVisible=ref(false)
const login = () => {
  console.log(userType.value)
  if (form.value.password === "") {
    ElMessage({
      message: '密码不能为空',
      type: "error"
    })
    return
  }

  if (userType.value == "客户") {

    request.post("/customers-entity/login", form.value).then(res => {
      console.log(res.data)
      if (res.data.length != 0) {
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        router.push({
          path:'/customers/personInfo'+res.data[0].customerId,
        })
      } else {
        ElMessage({
          message: '用户名或密码错误',
          type: 'error'
        })
      }
    })
  } else if (userType.value == "供应商") {
    request.post("/suppliers-entity/login", form.value).then((res) => {
      if (res.data.length != 0) {
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        router.push({
          path: '/supplier/PersonalInformation' + res.data[0].supplierId
        })
      } else  {
        ElMessage({
          message: '用户名或密码错误',
          type: 'error'
        })
      }
    })
  } else {
    request.post("/employees-entity/login", form.value).then((res) => {
      if (res.data.length != 0) {
        ElMessage({
          message: '登录成功',
          type: 'success'
        })
        // router.push({
        //   path:'/students/'+res.data[0].studentId
        // })
      } else {
        ElMessage({
          message: '用户名或密码错误',
          type: 'error'
        })
      }
    })
  }
}
 const makeSureRegister=()=>{

   if (customerInfo.costomerRegiter.customerName=== "")
   {
     ElMessage({
       message:'客户名不能为空',
       type:'error',
     })
     return
   }
   if (customerInfo.costomerRegiter.contactNumber=== "")
   {
     ElMessage({
       message:'联系电话不能为空',
       type:'error',
     })
     return
   }

   if (customerInfo.costomerRegiter.password==="")
   {
     ElMessage({
       message:'密码不能为空',
       type:'error',
     })
     return
   }
   request.post("/customers-entity/register",customerInfo.costomerRegiter).then(res=>{
     if (res.data == 1){
       ElMessage({
         message:'注册成功',
         type:'success'
       })
       registerDialogVisible.value=false
     }
     else {
       ElMessage({
         message:'注册失败',
         type:'error'
       })
     }
   })
 }
</script>

<style scoped>
#main {
  position: absolute;
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  background-color: #a6a9de;
}

#one {
  position: absolute;
  width: 100%;
  top: 40%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#two {
  position: absolute;
  width: 100%;
  top: 50%;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
}

#three {
  position: absolute;
  /*background-color: #2c3e50;*/
  width: 40%;
  top: 57%;
  left: 42.5%;
}

#loginButton {
  position: absolute;
  width: 6%;
  top: 67%;
  left: 42%;
}

#registerButton {
  position: absolute;
  width: 6%;
  top: 67%;
  left: 52%;
}
</style>