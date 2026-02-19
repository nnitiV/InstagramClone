import { use } from "react";

type UserProfileProps = {
    params: Promise<{ username: string }>;
}

export default function UserProfile({ params }: UserProfileProps) {
    const { username } = use(params);
    return (
        <div>{username}</div>
    )
}
