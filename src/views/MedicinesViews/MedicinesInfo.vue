<template>
  <h1 style="display: flex;justify-content: center">药品信息管理</h1>

  <div>
    <el-table :data="medicineData.medicineInfo">
      <el-table-column prop="medicineName" label="药品名称"></el-table-column>
      <el-table-column prop="supplierName" label="供应商名称"></el-table-column>
      <el-table-column prop="unitPrice" label="单价"></el-table-column>
      <el-table-column prop="stockQuantity" label="库存数量"></el-table-column>
      <el-table-column prop="stockUnit" label="库存单位"></el-table-column>
      <el-table-column label="图片">
        <template #default="{row}">
          <img :src="row.photoUrl" alt="" style="width: 100px;height: 100px">
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup lang="ts">


import {reactive} from "vue";
import request from "@/request/request";

interface Medicine {
  medicineId: string,
  medicineName: string,
  supplierId: string,
  unitPrice: number,
  stockQuantity: number,
  stockUnit: string,
  photoUrl: string,
  introduction: string,
  supplierName: string,
}

const medicineData = reactive(
    {
      medicineInfo: [ {} as Medicine ],
    }
)

request.get("/medicines-list-entity/getAll").then(res => {
  medicineData.medicineInfo = res.data
  console.log(medicineData.medicineInfo)
})

</script>

<style scoped>

</style>