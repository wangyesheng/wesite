import Layout from "@/layout";

const files = require.context("@/views", true, /.vue$/);

export const constantRoutes = [
  {
    path: "/",
    redirect: "/home",
    component: Layout,
    children: files.keys().map(key => {
      // 截取两字符之间的内容 /home/ => home
      // const [, path] = key.match(/\/(\S*)\//);
      const component = files(key).default;
      return {
        path: component.name ? `/${component.name.toLowerCase()}` : "/",
        component
      };
    })
  }
];
