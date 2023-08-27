const Layout = () => import("@/layout/index.vue");

export default {
  path: "/glogin",
  name: "Google_Login",
  component: Layout,
  meta: {
    icon: "homeFilled",
    title: "Google 登入",
    rank: 0
  },
  children: [
    {
      path: "/glogin",
      name: "Google_Login",
      component: () => import("@/views/glogin/index.vue"),
      meta: {
        title: "Google 登入"
      }
    }
  ]
} as RouteConfigsTable;
