import { ICreatedAt } from "../created-at";

export interface Post extends ICreatedAt {
    id: string;
    topicId: string;
    topicName: string;
    title: string;
    description: string;
    author: string;
}
