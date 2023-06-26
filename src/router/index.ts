import {createRouter, createWebHistory} from 'vue-router'
import LoginView from "@/views/LoginView.vue";
import AdministratorMain from "@/views/AdministratorViews/AdministratorMain.vue";
import AdministratorInfo from "@/views/AdministratorViews/AdministratorInfo.vue";
import MedicinesInfo from "@/views/MedicinesViews/MedicinesInfo.vue";

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
            component: LoginView
        },
        {
            path: '/administratorMain/:adminId',
            name: 'administratorMain',
            component: AdministratorMain,
            children: [
                {
                    path: 'adminInfo',
                    name: 'adminInfo',
                    component: AdministratorInfo
                },
                {
                    path: 'medicinesInfo',
                    name: 'medicinesInfo',
                    component: MedicinesInfo
                }
            ]
        },
        {
            path: '/customers/personInfo:customerId',
            name: 'customersPersonInfo',
            component: () => import('../views/CustomersViews/personInfoView.vue')
        },
        {
            path: '/customers/BuyMedicines:customerId',
            name: 'customersBuyMedicines',
            component: () => import('../views/CustomersViews/BuyMedicinesView.vue')
        },

    ]

})

export default router
