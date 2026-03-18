import "./global.css";
import { getLoggedUserTokenInfo } from "@/feature/auth/services/auth-service";
import SidebarWrapper from "../components/layout/SidebarWrapper";
import ChatProvider from "@/components/layout/ChatProvider";
import ThemeWatcher from "@/components/layout/ThemeWatcher";

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [token] = await Promise.all([
    getLoggedUserTokenInfo(),
  ]);
  return (
    <html lang="en" data-bs-theme="light">
      <head>
        <title>Instagram CLONE</title>
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossOrigin="anonymous" />
        <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons/font/bootstrap-icons.css" />
      </head>
      <body>
        <ThemeWatcher />
        <ChatProvider />
        <SidebarWrapper picture={token != null ? token.picture : ""}>
          {children}
        </SidebarWrapper>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossOrigin="anonymous"></script>
      </body>
    </html>
  );
}
