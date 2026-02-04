import Sidebar from "@/components/Sidebar"
import { getUserInfo } from "@/feature/auth/services/auth-service";
import EmptyFeed from "@/feature/feed/components/EmptyFeed";

export default async function Home() {
  const [token] = await Promise.all([
    getUserInfo(),
  ]);
  return (
    <Sidebar picture={token.picture}>
      <EmptyFeed />
    </Sidebar>
  );
}
