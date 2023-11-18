import {createApp} from 'vue';
import App from './App.vue';
import {createRouter, createWebHistory} from 'vue-router';
import HomePage from '@/components/HomePage.vue';
import LoginPage from '@/components/LoginPage.vue';
import RegisterPage from '@/components/RegisterPage.vue';
import PersonalPage from "@/components/personal/PersonalPage.vue";
import EnrollmentPage from "@/components/personal/EnrollmentPage.vue";
import CoursesPage from "@/components/personal/CoursesPage.vue";
import AccountPage from "@/components/personal/AccountPage.vue";
import AdminPage from "@/components/admin/AdminPage.vue";
import EnrollmentManage from "@/components/admin/EnrollmentManage.vue";
import CourseManage from "@/components/admin/CourseManage.vue";
import StudentManage from "@/components/admin/StudentManage.vue";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {path: '/', component: HomePage, meta: {requiresAuth: false}},
        {path: '/login', component: LoginPage, meta: {requiresAuth: false}},
        {path: '/register', component: RegisterPage, meta: {requiresAuth: false}},
        {
            path: '/personal', component: PersonalPage, meta: {requiresAuth: true}, children: [
                {path: '/enrollment', component: EnrollmentPage, meta: {requiresAuth: true}},
                {path: '/courses', component: CoursesPage, meta: {requiresAuth: true}},
                {path: '/account', component: AccountPage, meta: {requiresAuth: true}},
                {path: '/:pathMatch(.*)*', redirect: '/enrollment'}
            ]
        },
        {
            path: '/admin', component: AdminPage, meta: {requiresAuth: true}, children: [
                {path: '/enrollment-manage', component: EnrollmentManage, meta: {requiresAuth: true}},
                {path: '/course-manage', component: CourseManage, meta: {requiresAuth: true}},
                {path: '/student-manage', component: StudentManage, meta: {requiresAuth: true}},
                {path: '/:pathMatch(.*)*', redirect: '/enrollment-manage'}
            ]
        },
        {path: '/:pathMatch(.*)*', redirect: '/'}
    ],
});

router.beforeEach((to, from, next) => {
    const requiresAuth = to.meta.requiresAuth;
    const isLoggedIn = sessionStorage.getItem('isLoggedIn') === 'true';

    if (requiresAuth && !isLoggedIn) {
        next('/login');
    } else {
        next();
    }
});

const app = createApp(App);

app.use(router);
app.mount('#app');
