
export interface personInfo {
    address: string
    contactNumber: string
    customerId: string
    customerName: string
    password: string
    userName: string
    email:string
    gender:string
}
export  interface  medicine{
    medicineId:string
    medicineName:string
    stockQuantity:string
    stockUnit:string
    supplierId:string
    unitPrice:string
    introduction:string
    photoUrl:string
}
export  interface  salesInformation{
    salesId:string
    medicineId:string
    customerId:string
    salesDate:string
    quantity:number
    totalPrice:number
    unit:string
}
export  interface  salesView{
    salesId:string
    medicineName:string
    customerId:string
    customerName:string
    medicineId:string
    salesDate:string
    quantity:number
    totalPrice:number
    unit:string

}
export  interface orderInformation{
    orderId:string
    medicineId:string
    supplierId:string
    supplyDate:string
    quantity:number
    status:string
    unit:string


}
export  interface  supplier{
    supplierId:string
    supplierName:string
    password:string
    userName:string
    contactNumber:string
    address:string
    email:string

}
export  interface  orderInfo{
    medicineId:string
    orderId:string
    supplyDate:string
    quantity:number
    status:string
    supplierId:string
    unit:string
    medicineName:string
}