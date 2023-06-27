<template>
  <div class="common-layout">
    <el-container>
      <el-header>
        <el-row :gutter="20">
          <el-col :span="6">
            <div class="grid-content ep-bg-purple"/>
            订单管理
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
                <el-menu-item @click="onOrder">订单管理</el-menu-item>
              </el-menu-item-group>


            </el-sub-menu>

          </el-menu>
        </el-aside>
        <el-main>
          <div style="display: flex;margin-top: 100px">
            <el-button @click="onAddOrder" >新增订单</el-button>

            <el-input placeholder="请输入药品名称" v-model="search" style="width: 200px ;margin-left: 100px  "></el-input>
          </div>
          <el-table :data="filterData" style="width: 100%">
            <el-table-column fixed prop="medicineId" label="药品ID" width="auto"/>
            <el-table-column prop="medicineName" label="药品名" width="auto"/>
            <el-table-column prop="orderId" label="订单ID" width="auto"/>
            <el-table-column prop="quantity" label="供应数量" width="auto"/>
            <el-table-column prop="supplierId" label="供应商ID" width="auto"/>
            <el-table-column prop="supplyDate" label="订单时间" width="auto"/>
            <el-table-column prop="status" label="订单状态" width="auto"/>
            <el-table-column fixed="right" label="操作" width="auto">
              <template #default="scope">
                <el-button link type="primary" size="small" @click="onDelete(scope.row)"
                >删除
                </el-button>
                <el-button link type="primary" size="small" @click="onUpdated(scope.row)"
                >修改
                </el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-main>
      </el-container>
    </el-container>
  </div>
  <el-dialog v-model="deleteOrderDialogVisible" title="删除订单记录" width="20%" center>
    <h1>确定删订单号为：{{pageData.orderId}} 的订单吗？</h1>
    <h1></h1>
    <h1></h1>
    <h1 style="text-align: center" v-if="pageData.deleteStatus=='未通过'">警告！ 订单还未通过管理员确定</h1>
    <template #footer>
    <span slot="footer"  >
      <el-button @click="deleteOrderDialogVisible = false" >取 消</el-button>
      <el-button type="primary" @click="makeSureDelete">确 定</el-button>
    </span>
    </template>
  </el-dialog>
  <el-dialog v-model="updateOrderDialogVisible" title="修改订单信息" width="30%" center>

    <el-form v-if="changeData.changeInfo.status=='未通过'" :model="changeData.changeInfo" label-width="80px">

      <el-form-item label="药品名">
        <el-select v-model="changeData.changeInfo.medicineName"   :placeholder="changeData.changeInfo.medicineName">
          <el-option
              v-for="item in filterMedicineData"

              :label="item.medicineName"
              :value="item.medicineName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="药品Id">
        <el-select v-model="changeData.changeInfo.medicineId"   >
          <el-option
              v-for="item in filterMedicioneIdData"

              :label="item.medicineId"
              :value="item.medicineId"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="订单ID">
        <div >{{changeData.changeInfo.orderId}}</div>
      </el-form-item>
      <el-form-item label="供应数量">
        <el-input v-model="changeData.changeInfo.quantity"></el-input>
      </el-form-item>
      <el-form-item label="供应商ID">
        <div >{{changeData.changeInfo.supplierId}}</div>
      </el-form-item>
      <el-form-item label="订单时间">
        <el-input v-model="changeData.changeInfo.supplyDate"></el-input>
      </el-form-item>
      <el-form-item label="订单状态">
        <div >{{ changeData.changeInfo.status }}</div>
      </el-form-item>
    </el-form>
    <h1 v-if="changeData.changeInfo.status=='通过'" >订单已被管理员确定，无法修改！</h1>
    <template #footer>
    <span slot="footer"  >
      <el-button @click="updateOrderDialogVisible = false" >取 消</el-button>
      <el-button type="primary" @click="makeSureUpdate">确 定</el-button>
    </span>
    </template>
  </el-dialog>

  <el-dialog v-model="addOrderDialogVisible" title="新增订单" width="30%" center>

    <el-form  :model="addData.addInfo" label-width="80px">

      <el-form-item label="药品名">
        <el-select v-model="addData.addInfo.medicineName"   :placeholder="addData.addInfo.medicineName">
          <el-option
              v-for="item in filterMedicineData"

              :label="item.medicineName"
              :value="item.medicineName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="药品Id">
        <el-select v-model="addData.addInfo.medicineId"   >
          <el-option
              v-for="item in filterMedicioneIdData"

              :label="item.medicineId"
              :value="item.medicineId"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="供应数量">
        <el-input v-model="addData.addInfo.quantity"></el-input>
      </el-form-item>
      <el-form-item label="下订单时间">
        <el-date-picker
            v-model="addData.addInfo.supplyDate"
           type="date"
           placeholder="Pick a day"

        />
      </el-form-item>
    </el-form>
    <template #footer>
    <span slot="footer"  >
      <el-button @click="addOrderDialogVisible = false" >取 消</el-button>
      <el-button type="primary" @click="makeSureAdd">确 定</el-button>
    </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import {computed, onMounted, onUpdated, reactive, ref} from "vue";
import request from "@/request/request";
import {useRouter} from "vue-router";
import router from "@/router";
import type {medicine, orderInfo, orderInformation} from "@/myInterface/entity";
import {ElMessage} from "element-plus";

const pageData = {
  supplierId: "",
  deleteName: '',
  deleteStatus: "",
  orderId: '',
  deleteId:'',
}
const myRouter = useRouter()
const onUpdated=(row:orderInfo)=>{
  updateOrderDialogVisible.value=true
     changeData.changeInfo=row
     pageData.orderId=row.orderId
}
const onAddOrder=()=>{
  addOrderDialogVisible.value=true
  addData.addInfo.unit='盒'
  addData.addInfo.supplierId=''
  addData.addInfo.status='未通过'
  addData.addInfo.orderId=''
  addData.addInfo.supplyDate=''
  addData.addInfo.quantity=0
  addData.addInfo.medicineId=''
  addData.addInfo.medicineName=''

}
const orderData: orderInfo[] = reactive([])
const changeData=reactive({
  changeInfo:{} as orderInfo
})
const addData=reactive({
  addInfo:{} as orderInfo
})
const MedicineData:medicine[] = reactive([])
const filterMedicineData=computed(()=>{
  return MedicineData.filter(item=>{
    return item.supplierId.includes(pageData.supplierId)
  })
})
const filterMedicioneIdData=computed(()=>{
  return MedicineData.filter(item=>{
    return item.medicineName.includes(changeData.changeInfo.medicineName)||item.medicineName.includes(addData.addInfo.medicineName)
  })
})
const filterData = computed(() => {
  return orderData.filter(item => {
    return item.medicineName.includes(search.value)
  })
})
const addOrderDialogVisible = ref(false)
const makeSureAdd=()=>{
     if (addData.addInfo.quantity== ''){
       ElMessage({
         message: "请输入供应数量",
         type: "error"
       })

       return
     }
     if (addData.addInfo.supplyDate== ''){
       ElMessage({
         message: "请输入下订单时间",
         type: "error"
       })
       return
     }
      if (addData.addInfo.medicineName== ''){
        ElMessage({
          message: "请输入药品名",
          type: "error"
        })
        return
      }
      if (addData.addInfo.medicineId== ''){
        ElMessage({
          message: "请输入药品Id",
          type: "error"
        })
        return
      }
      addData.addInfo.status="未通过"
      addData.addInfo.supplierId=pageData.supplierId
      addData.addInfo.unit='盒'
      request.post("/order-information-entity/insertOrder",addData.addInfo).then(res=>{
        if(res.data=="1"){
          ElMessage({
            message: "添加成功",
            type: "success"
          })
          orderData.push(addData.addInfo)
          addOrderDialogVisible.value=false
        }else {
          ElMessage({
            message: "添加失败",
            type: "error"
          })
        }
      })
}

const orderInformationData=reactive({
  orderInformation:{} as orderInformation
})

const updateOrderDialogVisible = ref(false)
const  makeSureUpdate=()=>{
         orderInformationData.orderInformation=changeData.changeInfo

       request.post("/order-information-entity/updateByOrderId",orderInformationData.orderInformation).then(res=>{
         if(res.data=="1"){
           updateOrderDialogVisible.value=false
           ElMessage({
             message: "修改成功",
             type: "success"
           })
           orderData.splice(orderData.findIndex(item => item.orderId == pageData.orderId), 1)
           orderData.push(changeData.changeInfo)
         }else {
            ElMessage({
              message: "修改失败",
              type: "error"
            })
         }

       })


}
const onDelete = (row: orderInfo) => {
  deleteOrderDialogVisible.value = true
  pageData.deleteName = row.medicineName
  pageData.deleteStatus = row.status
  pageData.orderId = row.orderId
  pageData.deleteId=row.medicineId
}
const deleteOrderDialogVisible = ref(false)

onMounted(() => {
  pageData.supplierId = <string>myRouter.currentRoute.value.params.supplierId
  request.get("/order-entity/getOrderBySupplierId/" + pageData.supplierId).then(res => {
    orderData.push(...res.data)
  request.post("/medicines-entity/getMedicines").then(res=>{
    MedicineData.push(...res.data)
  })
  })

})

const search = ref("")


const makeSureDelete = () => {
   request.get("/order-information-entity/deleteByOrderId/" + pageData.deleteId).then(res => {
    if (res.data == "1") {
      deleteOrderDialogVisible.value = false
      ElMessage({
        message: "删除成功",
        type: "success"
      })
      orderData.splice(orderData.findIndex(item => item.orderId == pageData.orderId), 1)
    }else {
      ElMessage({
        message: "删除失败",
        type: "error"
      })
    }
  })

}
const onPersonInfo = () => {
  router.push({
    path: '/supplier/PersonalInformation' + pageData.supplierId
  })
}
const onOrder = () => {
  router.push({
    path: '/supplier/Order' + pageData.supplierId
  })
}
</script>

<style scoped>

</style>