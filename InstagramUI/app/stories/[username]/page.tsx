import { getUserFirstStory } from "@/services/story.service";
import { redirect } from "next/navigation";

type StoriesPageProps = {
    params: Promise<{ username: string }>;
}

export default async function StoriesPage({ params }: StoriesPageProps) {
    const { username } = await params;
    const res = await getUserFirstStory(username);
    const story = res.story;
    if (story?.id) {
        redirect(`/stories/${username}/${story.id}`);
    } else {
        redirect(`/profile/${username}`);
    }
}