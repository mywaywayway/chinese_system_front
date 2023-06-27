<template>
  <h1 style="display: flex;justify-content: center">药品信息管理</h1>

  <div>
    <el-table :data="filterData">
      <el-table-column prop="medicineName" label="药品名称" width="200"></el-table-column>
      <el-table-column prop="supplierName" label="供应商名称" width="200"></el-table-column>
      <el-table-column prop="unitPrice" label="单价" width="120"></el-table-column>
      <el-table-column prop="stockQuantity" label="库存数量" width="120"></el-table-column>
      <el-table-column prop="stockUnit" label="库存单位" width="120"></el-table-column>
      <el-table-column label="图片" width="150">
        <template #default="{row}">
          <el-image :src="row.photoUrl" alt="" style="width: 100px;height: 100px" lazy>
            <template #placeholder>
              <div style="display:flex;justify-content: center;height: 100%;align-items: center"><span
                  class="dot">暂无图片</span></div>
            </template>
          </el-image>
        </template>
      </el-table-column>
      <el-table-column>
        <template #header>
          <el-button icon="Plus" type="success" @click="addMedicine"></el-button>
          <el-input style="width: 200px;" v-model="search"/>
        </template>
        <template #default="{row}">
          <el-button icon="Edit" type="primary" @click="editMedicine(row)"></el-button>
          <el-button icon="Delete" type="danger" @click="deleteMedicine(row)"></el-button>
          <el-button @click="lookDetail(row)">详情</el-button>
        </template>
      </el-table-column>

    </el-table>
  </div>


  <!--  添加药品-->
  <el-dialog
      v-model="addMedicineVisible"
      width="30%"
      title="添加药品"
      style="text-align: center"
  >
    <el-form label-width="100">
      <el-form-item label="药品名称">
        <el-input v-model="addMedicineEntity.medicineName"/>
      </el-form-item>

      <el-form-item label="单价">
        <el-input-number v-model="addMedicineEntity.unitPrice"/>
        &nbsp元
      </el-form-item>
      <el-form-item label="库存单位">
        <el-input v-model="addMedicineEntity.stockUnit"/>
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input-number v-model="addMedicineEntity.stockQuantity" disabled/>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select v-model="addMedicineEntity.supplierId">
          <el-option
              v-for="item in supplierInfo"
              :label="item.supplierName"
              :value="item.supplierId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="addMedicineEntity.introduction"/>
      </el-form-item>
    </el-form>
    <el-button icon="Select" type="primary" @click="sureAddMedicine"></el-button>
    <el-button icon="Close" type="danger" @click="addMedicineVisible=false"></el-button>
  </el-dialog>

  <!--  修改药品-->
  <el-dialog
      v-model="updateMedicineVisible"
      width="30%"
      title="修改药品"
      style="text-align: center"
  >
    <el-form label-width="100">
      <el-form-item label="药品名称">
        <el-input v-model="editMedicineEntity.medicineName"/>
      </el-form-item>

      <el-form-item label="单价">
        <el-input-number v-model="editMedicineEntity.unitPrice"/>
        &nbsp元
      </el-form-item>
      <el-form-item label="库存单位">
        <el-input v-model="editMedicineEntity.stockUnit"/>
      </el-form-item>
      <el-form-item label="库存数量">
        <el-input-number v-model="editMedicineEntity.stockQuantity" disabled/>
      </el-form-item>
      <el-form-item label="供应商">
        <el-select v-model="editMedicineEntity.supplierId">
          <el-option
              v-for="item in supplierInfo"
              :label="item.supplierName"
              :value="item.supplierId"
          >
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="介绍">
        <el-input v-model="editMedicineEntity.introduction"/>
      </el-form-item>
      <el-button icon="Select" type="primary" @click="sureUpdateMedicine"></el-button>
      <el-button icon="Close" type="danger" @click="updateMedicineVisible=false"></el-button>
    </el-form>
  </el-dialog>

  <!--  删除药品-->
  <el-dialog
      v-model="deleteMedicineVisible"
      width="30%"
      style="text-align: center"
  >
    <h1>确认删除</h1>
    <br>
    <h2>{{ deleteMedicineEntity.medicineName }}</h2>
    <br><br>
    <el-button icon="Select" type="primary" @click="sureDeleteMedicine"></el-button>
    <el-button icon="Close" type="danger" @click="deleteMedicineVisible=false"></el-button>
  </el-dialog>

<!--  详情-->
  <el-dialog
      v-model="detailMedicineVisible"
      width="30%"
      title="药品详情"
      style="text-align: center"
  >
    <el-image :src="detailMedicineEntity.photoUrl" style="height: 250px;width: 250px"></el-image>

    <h3> {{detailMedicineEntity.introduction}}</h3>

  </el-dialog>
</template>

<script setup lang="ts">


import {computed, onMounted, reactive, ref} from "vue";
import request from "@/request/request";
import {ElMessage} from "element-plus";

//药品视图
interface MedicineView {
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

//药品信息
interface Medicine {
  medicineId: string,
  medicineName: string,
  supplierId: string,
  unitPrice: number,
  stockQuantity: number,
  stockUnit: string,
  photoUrl: string,
  introduction: string,
}

//供应商信息
interface Supplier {
  supplierId: string,
  supplierName: string,
  address: string,
  contactNumber: string,
  userName: string,
  password: string,
  email: string,
}

let supplierInfo: Supplier[] = reactive([])

const medicineData = reactive(
    {
      medicineInfo: [] as MedicineView[],
      medicineAddInfo: {} as MedicineView,
    }
)

const filterInfo: MedicineView[] = reactive([])

//过滤器
const search = ref("")

const filterData = computed(() => {
  return filterInfo.filter((item: MedicineView) => {
    return item.medicineName.includes(search.value) || item.supplierName.includes(search.value)
  })
})

onMounted(() => {
  request.get("/medicines-list-entity/getAll").then(res => {
    filterInfo.push(...res.data)
  })
  request.get("/suppliers-entity/getSuppliers").then(res => {
    supplierInfo.splice(0, supplierInfo.length)
    supplierInfo.push(...res.data)
  })
})
//添加药品
const addMedicineEntity = reactive({}) as Medicine
const addMedicineVisible = ref(false)
const addMedicine = () => {
  addMedicineEntity.stockQuantity = 0
  addMedicineEntity.unitPrice = 0
  addMedicineVisible.value = true
}

const sureAddMedicine = () => {
  console.log(addMedicineEntity.supplierId)
  request.post("/medicines-entity/addMedicine", addMedicineEntity).then(res => {
    if (res.data != null) {
      ElMessage.success("添加成功")
      addMedicineVisible.value = false
      request.get("/medicines-list-entity/getAll").then(res => {
        filterInfo.splice(0, filterInfo.length)
        filterInfo.push(...res.data)
      })
    } else {
      ElMessage.error("添加失败")
    }
  })
}

//修改药品
const updateMedicineVisible = ref(false)
const editMedicineEntity = reactive({}) as Medicine
const editMedicine = (row: MedicineView) => {
  editMedicineEntity.medicineId = row.medicineId
  editMedicineEntity.medicineName = row.medicineName
  editMedicineEntity.supplierId = row.supplierId
  editMedicineEntity.unitPrice = row.unitPrice
  editMedicineEntity.stockQuantity = row.stockQuantity
  editMedicineEntity.stockUnit = row.stockUnit
  editMedicineEntity.photoUrl = row.photoUrl
  editMedicineEntity.introduction = row.introduction
  updateMedicineVisible.value = true
}

const sureUpdateMedicine = () => {
  request.post("/medicines-entity/updateMedicine", editMedicineEntity).then(res => {
    if (res.data != null) {
      ElMessage.success("修改成功")
      updateMedicineVisible.value = false
      request.get("/medicines-list-entity/getAll").then(res => {
        filterInfo.splice(0, filterInfo.length)
        filterInfo.push(...res.data)
      })
    } else {
      ElMessage.error("修改失败")
    }
  })
}


const deleteMedicineEntity = reactive({}) as Medicine
//删除药品
const deleteMedicineVisible = ref(false)
const deleteMedicine = (row: MedicineView) => {
  deleteMedicineEntity.medicineId = row.medicineId
  deleteMedicineEntity.medicineName = row.medicineName
  deleteMedicineEntity.supplierId = row.supplierId
  deleteMedicineEntity.unitPrice = row.unitPrice
  deleteMedicineEntity.stockQuantity = row.stockQuantity
  deleteMedicineEntity.stockUnit = row.stockUnit
  deleteMedicineEntity.photoUrl = row.photoUrl
  deleteMedicineEntity.introduction = row.introduction
  deleteMedicineVisible.value = true

}
const sureDeleteMedicine = () => {
  request.post("/medicines-entity/deleteMedicine", deleteMedicineEntity).then(res => {
    if (res.data != null) {
      ElMessage.success("删除成功")
      deleteMedicineVisible.value = false
      request.get("/medicines-list-entity/getAll").then(res => {
        filterInfo.splice(0, filterInfo.length)
        filterInfo.push(...res.data)
      })
    } else {
      ElMessage.error("删除失败")
    }
  })
}

//查看详情
const detailMedicineVisible = ref(false)
const detailMedicineEntity = reactive({}) as Medicine
const lookDetail = (row: Medicine) => {
  detailMedicineVisible.value = true
  detailMedicineEntity.medicineId = row.medicineId
  detailMedicineEntity.medicineName = row.medicineName
  detailMedicineEntity.supplierId = row.supplierId
  detailMedicineEntity.unitPrice = row.unitPrice
  detailMedicineEntity.stockQuantity = row.stockQuantity
  detailMedicineEntity.stockUnit = row.stockUnit
  detailMedicineEntity.photoUrl = row.photoUrl
  detailMedicineEntity.introduction = row.introduction
}
</script>

<style scoped>

</style>