import { CreatedAt } from "../created-at";

export interface Post extends CreatedAt {
    id: string;
    topicId: string;
    topicName: string;
    title: string;
    description: string;
    author: string;
}
