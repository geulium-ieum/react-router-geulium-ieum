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
    route("/help", "./components/pages/customer/Help.tsx"),
    route("/helpboard/:userId", "./components/pages/customer/Helpboard.tsx"),
    route("/guide", "./components/pages/customer/Guide.tsx"),
    route("/stipulation", "./components/pages/policy/Stipulation.tsx"),
    route("/web", "./components/pages/policy/Web.tsx"),
    route("/privacy", "./components/pages/policy/Privacy.tsx"),
    route("/search", "./components/pages/SearchDeceased.tsx"),
    route("/mypage", "./components/pages/Mypage.tsx"),
  ]),
] satisfies RouteConfig;
