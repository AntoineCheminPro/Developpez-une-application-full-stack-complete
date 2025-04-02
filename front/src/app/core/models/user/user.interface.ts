import { ICreatedAt } from "../created-at";

export interface User extends ICreatedAt {
  id: string;
  name: string;
  email: string;
  subscribedTopics: string[];
}
