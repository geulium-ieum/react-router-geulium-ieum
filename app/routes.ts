import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./components/layout.tsx", [
    index("routes/home.tsx"),
    route("/register", "./components/pages/Register.tsx"),
    route("/login", "./components/pages/Login.tsx"),
    route("/my", "./components/pages/My.tsx"),
    route("/auth/verify-email", "./components/pages/VerifyEmail.tsx"),
    route("/auth/naver/login", "./components/NaverLogin.tsx"),
    route("/auth/kakao/login", "./components/KakaoLogin.tsx"),
    route("/auth/logout", "./components/Logout.tsx"),
  ]),
] satisfies RouteConfig;
