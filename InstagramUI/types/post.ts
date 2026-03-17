export type PostToSave = {
    id? : number;
    title: string;
    caption: string;
    contentUrls: string[];
}

export type StoryToSave = {
    file: File;
}