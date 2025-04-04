import { CreatedAt } from "../created-at";

export interface Topic extends CreatedAt {
    id: string;
    title: string;
    description: string;
    isSubscribed: boolean;
}
