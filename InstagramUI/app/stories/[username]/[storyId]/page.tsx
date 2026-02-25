"use client";
import { use, useEffect, useMemo } from "react";
import Link from "next/link";
import { useStoryStore } from "@/feature/story/store/useStoryStore";
import ActiveStory from "@/feature/story/components/ActiveStory";
import StoryPreview from "@/feature/story/components/StoryPreview";

type StoriesPageProps = {
    params: Promise<{ username: string, storyId: number }>;
}

export default function StoriesPage({ params }: StoriesPageProps) {
    const { storyId } = use(params);
    let mockStories = useMemo(() => [
        {
            id: 1,
            username: "ArchLover",
            mediaurl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 2,
            username: "ArchLover",
            mediaurl: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/32.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 3,
            username: "Tech Guru",
            mediaurl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/85.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 4,
            username: "UrbanPlanner",
            mediaurl: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/women/68.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 5,
            username: "SkylineChaser",
            mediaurl: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/22.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 6,
            username: "PixelPioneer",
            mediaurl: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/women/12.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 7,
            username: "BrutalismGuy",
            mediaurl: "https://images.unsplash.com/photo-1518005020481-4b8817a212e9?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/41.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 8,
            username: "NeonNights",
            mediaurl: "https://images.unsplash.com/photo-1514565131-fce0801e5785?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/women/90.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 9,
            username: "ConcreteJungle",
            mediaurl: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/1.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 10,
            username: "MinimalVibes",
            mediaurl: "https://images.unsplash.com/photo-1494438639946-1ebd1d20bf85?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/women/2.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 11,
            username: "GlassAndSteel",
            mediaurl: "https://images.unsplash.com/photo-1451976426598-a7593bd6d0b2?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/55.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 12,
            username: "Metropolis",
            mediaurl: "https://images.unsplash.com/photo-1444723121867-7a241cacace9?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/women/55.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 13,
            username: "ThePenthouse",
            mediaurl: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/10.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30),
        },
        {
            id: 14,
            username: "Modernist",
            mediaurl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/33.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30)
        },
        {
            id: 15,
            username: "Modernist",
            mediaurl: "https://images.unsplash.com/photo-1518780664697-55e3ad937233?w=800",
            profilePictureUrl: "https://randomuser.me/api/portraits/men/33.jpg",
            createdAt: new Date(2026, 1, 18, 20, 30)
        }
    ], []);
    let storeStories = useStoryStore(state => state.stories);
    let stories = useMemo(() => storeStories.concat(mockStories), [mockStories]);
    console.log(stories);
    const activeStoryIndex = stories.findIndex(s => s.id == storyId);
    const activeStory = stories.find(s => s.id == storyId);
    var secondPreviousStory, firstPreviousStory, firstAfterStory, secondAfterStory;
    
    let storiesFiltered = stories.filter(s => s.username.toLocaleLowerCase() == activeStory?.username.toLocaleLowerCase());
    const activeStoryPosition = storiesFiltered.findIndex(story => story.id == activeStory?.id);
    let lastActiveUserStory = storiesFiltered[storiesFiltered.length - 1];
    let lastActiveUserStoryIndex = stories.findIndex(story => story.id == lastActiveUserStory.id);
    firstAfterStory = lastActiveUserStoryIndex + 1 < stories.length ? stories[lastActiveUserStoryIndex + 1] : null;

    secondAfterStory = useMemo(() => {
        let pos = 2;
        if (lastActiveUserStoryIndex + pos < stories.length) {
            while (lastActiveUserStoryIndex + pos < stories.length) {
                if (stories[lastActiveUserStoryIndex + pos]?.username.toLocaleLowerCase() != firstAfterStory?.username.toLowerCase()) {
                    return stories[lastActiveUserStoryIndex + pos];
                }
                pos++;
            }
            return null;
        }
    }, [stories, activeStory, lastActiveUserStoryIndex, lastActiveUserStory, firstAfterStory]);

    let firstActiveStory = storiesFiltered[0];
    let firstActiveStoryIndex = stories.findIndex(story => story.id == firstActiveStory.id);
    firstPreviousStory = firstActiveStoryIndex - 1 >= 0 ? stories[firstActiveStoryIndex - 1] : null;

    secondPreviousStory = useMemo(() => {
        let pos = 2;
        if (firstActiveStoryIndex - pos >= 0) {
            while (firstActiveStoryIndex - pos >= 0) {
                if (stories[firstActiveStoryIndex - pos]?.username.toLocaleLowerCase() != firstPreviousStory?.username.toLowerCase()) {
                    return stories[firstActiveStoryIndex - pos];
                }
                pos++;
            }
            return null;
        }
    }, [stories, activeStory, firstActiveStoryIndex, firstActiveStory, firstPreviousStory]);
    return (
        <div className="position-relative text-center d-flex justify-content-center align-items-center vh-100 text-primary"
            style={{ background: "rgba(25,25,25)" }}
        >
            <i data-visualcompletion="css-img" aria-label="Instagram" className="position-absolute" role="img"
                style={{
                    backgroundImage: "url('https://static.cdninstagram.com/rsrc.php/v4/ya/r/7RjayfbZ-nN.png')",
                    backgroundPosition: "0px 0px",
                    backgroundSize: "auto",
                    width: "103px",
                    height: "29px",
                    backgroundRepeat: "no-repeat",
                    display: "inline-block",
                    top: 35, left: 50
                }}></i>
            <Link href="/"><i className="bi bi-x-lg position-absolute fs-3 text-white fw-bold" style={{ top: 25, right: 50 }}></i></Link>
            <ActiveStory activeStory={activeStory} activeStoryPosition={activeStoryPosition} amountOfActiveStory={storiesFiltered.length} thereBefore={activeStoryIndex - 1 >= 0} thereAfter={activeStoryIndex + 1 < stories.length}
                firstPreviousStory={activeStoryIndex - 1 >= 0 ? { id: stories[activeStoryIndex - 1].id, username: stories[activeStoryIndex - 1].username } : { id: -1, username: "" }}
                firstAfterStory={activeStoryIndex + 1 < stories.length ? { id: stories[activeStoryIndex + 1].id, username: stories[activeStoryIndex + 1].username } : { id: -1, username: "" }} />
            {secondPreviousStory && <StoryPreview story={secondPreviousStory} storyPosition={-2} />}
            {firstPreviousStory && <StoryPreview story={firstPreviousStory} storyPosition={-1} />}
            {firstAfterStory && <StoryPreview story={firstAfterStory} storyPosition={1} />}
            {secondAfterStory && <StoryPreview story={secondAfterStory} storyPosition={2} />}
        </div>
    )
}