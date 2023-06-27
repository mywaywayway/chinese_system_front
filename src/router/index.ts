import { createRouter, createWebHistory } from 'vue-router'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [

    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/',
      name: 'login',
      component: import("../views/LoginView.vue")
    },
    {
      path:'/customers/personInfo:customerId',
      name:'customersPersonInfo',
      component:()=>import('../views/CustomersViews/personInfoView.vue')
    },
    {
      path:'/customers/BuyMedicines:customerId',
      name:'customersBuyMedicines',
      component:()=>import('../views/CustomersViews/BuyMedicinesView.vue')
    },
    {
      path:'/customers/PersonalPurchaseHistory:customerId',
      name:'customersPersonalPurchaseHistory',
      component:()=>import('../views/CustomersViews/PersonalPurchaseHistory.vue')
    },
    {
      path:'/supplier/PersonalInformation:supplierId',
      name:'supplierPersonalInformation',
      component:()=>import('../views/SuppliersViews/SupplierInfoView.vue')
    },
    {
      path:'/supplier/Order:supplierId',
      name:'supplierOrder',
      component:()=>import('../views/SuppliersViews/SupplyInformationView.vue')
    },
  ]

})

export default router
