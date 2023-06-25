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


</template>

<script lang="ts" setup>
import {defineComponent, ref} from "vue";
import {Me, KeyboardOne} from '@icon-park/vue-next'
import request from "@/request/request";
import router from "@/router";
import {ElMessage} from "element-plus";


//用户登录信息
const form = ref({
  userName: '',
  password: ''
})
//用户登录类型
const userType = ref('客户')
//用户登录
const register = () => {

}
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
        // router.push({
        //   path: '/students/' + res.data[0].studentId
        // })
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