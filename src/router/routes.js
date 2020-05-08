const routes = [
  {
    path: "/",
    component: () => import("layouts/MainLayout.vue"),
    children: [
      { path: "/customers", component: () => import("pages/Customers.vue") },
      {
        path: "/transactions",
        component: () => import("pages/Transactions.vue")
      },
      { path: "/feedback", component: () => import("pages/Feedback.vue") },
      { path: "/welcome", component: () => import("pages/Welcome.vue") },
      { path: "/policy", component: () => import("pages/Policy.vue") }
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
