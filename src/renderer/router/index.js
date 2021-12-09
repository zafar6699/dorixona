import Vue from "vue";
import Router from "vue-router";
import store from "../store";
import Login from "../pages/auth/login.vue";
Vue.use(Router);

const routes = [{
        path: "/",
        name: "default",
        component: function() {
            return import (
                /* webpackChunkName: "about" */
                "@/pages/default.vue"
            );
        },
        meta: { requiresAuth: true },
        children: [{
                path: "",
                name: "index",
                component: require("@/pages/index.vue").default,
            },
            {
                path: "products",
                name: "products",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/products"
                    );
                },
            },
            {
                path: "products/come/:id",
                name: "products-come-id",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/products/come.vue"
                    );
                },
            },

            {
                path: "/statistics/byday",
                name: "statistics-byday",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/statistics/byday"
                    );
                },
            },
            {
                path: "/statistics/salecount",
                name: "statistics-salecount",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/statistics/salecount"
                    );
                },
            },
            {
                path: "/statistics/byday/oneday/:id",
                name: "statistics-oneday-id",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/statistics/oneday/id"
                    );
                },
            },
            {
                path: "users",
                name: "users",
                component: function() {
                    return import (
                        /* webpackChunkName: "about" */
                        "@/pages/users"
                    );
                },
            },
        ],
    },

    {
        path: "/login",
        name: "login",
        component: function() {
            return import ( /* webpackChunkName: "about" */ "@/pages/auth/login");
        },
    },

    {
        path: "/empty",
        name: "empty",
        component: function() {
            return import ( /* webpackChunkName: "about" */ "@/pages/empty");
        },
        meta: { requiresAuth: true },
        children: [{
            path: "cash",
            name: "cash",
            component: function() {
                return import (
                    /* webpackChunkName: "about" */
                    "@/pages/cash"
                );
            },
        }, ],
    },
];

const router = new Router({
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.matched.some((record) => record.meta.requiresAuth)) {
        if (store.getters.isAuthenticated) {
            next();
            return;
        }
        next("/login");
    } else {
        next();
    }
});

// router.beforeEach((to, from, next) => {
//     if (to.matched.some((record) => record.meta.guest)) {
//         if (store.getters.isAuthenticated) {
//             next("/");
//             return;
//         }
//         next();
//     } else {
//         next();
//     }
// });

export default router;