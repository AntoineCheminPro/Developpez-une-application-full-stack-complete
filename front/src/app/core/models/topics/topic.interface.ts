import { ICreatedAt } from "../created-at";

export interface Topic extends ICreatedAt {
    id: string;
    title: string;
    description: string;
    isSubscribed: boolean;
}
