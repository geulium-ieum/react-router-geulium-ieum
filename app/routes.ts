import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./components/layout.tsx", [
    index("routes/home.tsx"),
    route("/login", "./components/pages/Login.tsx"),
  ]),
] satisfies RouteConfig;
