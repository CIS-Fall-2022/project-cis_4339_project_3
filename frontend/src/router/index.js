import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        name: 'dashboard',
        props: true,
        component: () => import('../components/dashboard.vue')
    },
    {
        path: '/intakeform',
        name: 'intakeForm',
        props: true,
        component: () => import('../components/intakeForm.vue')
    },
    {
        path: '/findclient',
        name: 'findClient',
        component: () => import('../components/findClient.vue')
    },
    {
        path: '/updateclient/:id',
        name: 'updateclient',
        props: true,
        component: () => import('../components/updateClient.vue')
    },
    {
        path: '/eventform',
        name: 'eventform',
        component: () => import('../components/eventForm.vue')
    },
    {
        path: '/findEvents',
        name: 'findEvents',
        component: () => import('../components/findEvents.vue')
    },
    {
        path: '/eventDetails/:id',
        name: 'eventdetails',
        props: true,
        component: () => import('../components/eventDetails.vue')
    },
    {
        path: '/deleteEvent/',
        name: 'deleteEvent',
        props: true,
        component: () => import('../components/deleteEvent.vue')
    },
    {
        path: '/deleteDetails/:id',
        name: 'deleteDetails',
        props: true,
        component: () => import('../components/deleteDetails.vue')
    },
    {
        path: '/deleteClient/',
        name: 'deleteClient',
        props: true,
        component: () => import('../components/deleteClient.vue')
    }
]
const router = createRouter({
    history: createWebHistory(), routes
})
export default router