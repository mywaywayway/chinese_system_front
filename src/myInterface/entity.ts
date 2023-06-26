
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
