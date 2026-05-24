import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("./components/layout.tsx", [
    index("routes/home.tsx"),
    route("/guides", "./components/pages/Guides.tsx"),
    route("/register", "./components/pages/Register.tsx"),
    route("/login", "./components/pages/Login.tsx"),
    route("/my", "./components/pages/My.tsx"),
    route("/auth/verify-email", "./components/pages/VerifyEmail.tsx"),
    route("/auth/naver/login", "./components/NaverLogin.tsx"),
    route("/auth/kakao/login", "./components/KakaoLogin.tsx"),
    route("/auth/logout", "./components/Logout.tsx"),
    route("/help", "./components/pages/customer/help.tsx"),
    route("/helpboard/:userId", "./components/pages/customer/helpboard.tsx"),
    route("/guide", "./components/pages/customer/guide.tsx"),
    route("/stipulation", "./components/pages/policy/stipulation.tsx"),
    route("/web", "./components/pages/policy/web.tsx"),
    route("/privacy", "./components/pages/policy/privacy.tsx"),
  ]),
] satisfies RouteConfig;
