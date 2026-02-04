import Sidebar from "@/components/Sidebar"
import EmptyFeed from "@/feature/feed/components/EmptyFeed";

export default function Home() {
  return (
    <Sidebar>
      <EmptyFeed />
    </Sidebar>
  );
}
