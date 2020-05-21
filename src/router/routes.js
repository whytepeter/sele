const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      {
        path: "/customers",
        component: () => import("pages/Customers.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "",
        component: () => import("pages/Transactions.vue"),
        meta: { requiresAuth: true }
      },
      {
        path: "/feedback",
        component: () => import("pages/Feedback.vue"),
        meta: { requiresAuth: true }
      },
      { path: "/welcome", component: () => import("pages/Welcome.vue") },
      {
        path: "/policy",
        component: () => import("pages/Policy.vue"),
        meta: { requiresAuth: true }
      }
    ]
  }
];

// Always leave this as last one
if (process.env.MODE !== "ssr") {
  routes.push({
    path: "*",
    component: () => import("pages/Error404.vue")
  });
}

export default routes;
