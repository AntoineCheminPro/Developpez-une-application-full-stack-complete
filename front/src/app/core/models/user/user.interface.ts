import { CreatedAt } from "../created-at";

export interface User extends CreatedAt {
  id: string;
  name: string;
  email: string;
  subscribedTopics: string[];
}
