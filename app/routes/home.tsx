import type { Route } from "./+types/home";
import { Link } from "react-router";
import {
  Building2,
  Globe,
  MessageSquareHeart,
  Users,
} from "lucide-react";
import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Footer } from "~/components/organisms/Footer";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "그리움 이음 — 온라인 추모 서비스" },
    {
      name: "description",
      content:
        "거리와 장소에 구애받지 않고, 언제 어디서나 사랑하는 분을 추모하는 온라인 추모 공간",
    },
  ];
}

const features = [
  {
    icon: Building2,
    title: "추모관",
    headline: "영원히 남는 추모의 공간",
    description:
      "고인을 기리는 추모관을 만들고, 사진과 이야기로 소중한 기억을 함께 간직하세요.",
  },
  {
    icon: MessageSquareHeart,
    title: "추모글",
    headline: "마음을 전하는 글",
    description:
      "그리움과 감사를 담은 추모글을 남기고, 가족과 지인이 함께 추억을 나눌 수 있습니다.",
  },
  {
    icon: Users,
    title: "가족 그룹",
    headline: "함께하는 추모",
    description:
      "가족 그룹을 만들어 멀리 떨어져 있어도 한곳에서 마음을 모아 추모할 수 있습니다.",
  },
] as const;

export default function Home() {
  return (
    <div className="overflow-y-auto h-full">
      {/* Hero */}
      <section className="relative overflow-hidden bg-linear-to-b from-purple-50 via-white to-blue-50 dark:from-purple-950/30 dark:via-gray-950 dark:to-blue-950/20">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 opacity-40"
        >
          <div className="absolute -top-24 left-1/2 h-96 w-96 -translate-x-1/2 rounded-full bg-purple-300/30 blur-3xl dark:bg-purple-600/20" />
          <div className="absolute bottom-0 right-0 h-72 w-72 rounded-full bg-blue-300/30 blur-3xl dark:bg-blue-600/20" />
        </div>

        <div className="relative mx-auto max-w-5xl px-4 py-20 sm:px-6 sm:py-28 lg:px-8 lg:py-32 text-center">
          <p className="mb-6 inline-flex items-center gap-2 rounded-full border border-purple-200/80 bg-white/80 px-4 py-1.5 text-sm text-purple-800 shadow-sm backdrop-blur-sm dark:border-purple-800/50 dark:bg-gray-900/80 dark:text-purple-200">
            <Globe className="size-4 shrink-0" aria-hidden />
            <span>거리와 장소에 구애받지 않는 온라인 추모</span>
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl lg:text-5xl dark:text-white">
            멀리 있어도,
            <br />
            <span className="bg-linear-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
              마음은 가깝게
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-gray-600 sm:text-lg dark:text-gray-300">
            그리움 이음은 온라인에서 사랑하는 분을 추모하는 공간입니다.
            <br className="hidden sm:inline" />
            언제 어디서나, 가족과 함께 기억을 이어가세요.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row sm:gap-4">
            <Button asChild size="lg" className="min-w-[140px] h-11 text-sm">
              <Link to="/register">시작하기</Link>
            </Button>
            <Button
              asChild
              variant="outline"
              size="lg"
              className="min-w-[140px] h-11 text-sm"
            >
              <Link to="/search">고인 검색</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Value proposition */}
      <section className="border-y border-gray-200/80 bg-white dark:border-gray-800 dark:bg-gray-950">
        <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8">
          <blockquote className="text-center">
            <p className="text-xl font-medium leading-snug text-gray-800 sm:text-2xl dark:text-gray-100">
              &ldquo;추모는 이제, 당신이 있는 곳이 곧 추모의 자리입니다.&rdquo;
            </p>
            <footer className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              물리적 거리를 넘어, 마음으로 이어지는 추모
            </footer>
          </blockquote>
        </div>
      </section>

      {/* Features */}
      <section className="bg-gray-50 dark:bg-gray-900/50">
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <div className="mb-12 text-center">
            <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl dark:text-white">
              그리움을 이어가는 방법
            </h2>
            <p className="mt-3 text-gray-600 dark:text-gray-400">
              추모관 · 추모글 · 가족 그룹으로 소중한 기억을 함께 지켜갑니다
            </p>
          </div>

          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {features.map(({ icon: Icon, title, headline, description }) => (
              <li key={title}>
                <Card className="h-full border-gray-200/80 bg-white shadow-sm transition-shadow hover:shadow-md dark:border-gray-800 dark:bg-gray-950">
                  <CardHeader>
                    <div className="mb-2 flex size-11 items-center justify-center rounded-lg bg-linear-to-br from-purple-600 to-blue-600 text-white">
                      <Icon className="size-5" aria-hidden />
                    </div>
                    <CardTitle className="text-base font-semibold text-gray-900 dark:text-white">
                      {title}
                    </CardTitle>
                    <CardDescription className="text-sm font-medium text-purple-700 dark:text-purple-300">
                      {headline}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm leading-relaxed text-gray-600 dark:text-gray-400">
                      {description}
                    </p>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-linear-to-br from-purple-600 to-blue-600 text-white">
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-2xl font-bold sm:text-3xl">
            지금, 그리움을 이어 보세요
          </p>
          <p className="mt-4 text-purple-100">
            회원가입 후 추모관을 만들고, 가족을 초대해 함께 추모할 수 있습니다.
          </p>
          <Button
            asChild
            size="lg"
            className="mt-8 min-w-[160px] h-11 bg-white text-purple-700 hover:bg-purple-50 text-sm"
          >
            <Link to="/register">무료로 시작하기</Link>
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
