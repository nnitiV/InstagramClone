import React from 'react'

type RenderCommentsProps = {
    comments: any[];
    level: number;
    reel: {
    id: number;
    username: string;
    profilePic: string;
    videoUrl: string;
    caption: string;
    audioName: string;
    likes: string;
    comments: string;
    isLiked: boolean;
    isSaved: boolean;
  };
}

export default function RenderComments({comments, level, reel} : RenderCommentsProps) {
  return (
    
  )
}
