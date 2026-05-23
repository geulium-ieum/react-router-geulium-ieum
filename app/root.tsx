import {
  isRouteErrorResponse,
  Link,
  Links,
  Meta,
  Outlet,
  redirect,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";
import { getSession } from "./lib/sessions.server";
import { getMe } from "./lib/apis/user";
import { userContext } from "./context/userContext";
import { Sidebar, SidebarContent, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider } from "./components/ui/sidebar";
import Header from "./components/organisms/Header";
import { Footer } from "./components/organisms/Footer";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

async function authMiddleware({ request, context }: Route.LoaderArgs) {
  const pathname = new URL(request.url).pathname;
  const cookie = request.headers.get("Cookie");
  const session = await getSession(cookie);
  const token = session.get("token");
  if (!token) {
    context.set(userContext, null);
    return;
  } else if (
    pathname === '/login' ||
    pathname === '/register' ||
    pathname === '/auth/verify-email'
  ) {
    throw redirect('/');
  }
  const user = await getMe({ token });
  context.set(userContext, user);
}

export const middleware: Route.MiddlewareFunction[] = [
  async (_, next) => {
    const start = performance.now();
    await next();
    const duration = performance.now() - start;
    console.log(`Navigation took ${duration}ms`);
  },
  authMiddleware
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <SidebarProvider className="flex-col">
          {children}
          <Sidebar
            side="right"
            variant="floating"
            className="md:hidden"
          >
            <SidebarContent className="py-4 px-2">
              <SidebarMenu>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link to="/search">
                      <span className="text-lg font-semibold">고인 검색</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
                <SidebarMenuItem>
                  <SidebarMenuButton>
                    <Link to="/family-groups">
                      <span className="text-lg font-semibold">가족 그룹</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              </SidebarMenu>
            </SidebarContent>
          </Sidebar>
        </SidebarProvider>
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export async function loader({ context }: Route.LoaderArgs) {
  const user = context.get(userContext);
  return { user };
}

export default function App({ loaderData }: Route.ComponentProps) {
  const { user } = loaderData;

  return (
    <>
      <Header user={user} />
      <Outlet />
    </>
  );
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
