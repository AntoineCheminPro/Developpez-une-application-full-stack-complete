import { CreatedAt } from "../models/created-at";

export class CollectionSort {
  public static readonly sortByCreationDateAscending = <T extends CreatedAt>(posts: T[]): T[] => {
    return posts.sort((a, b) => {
      const dateA = a.createdAt?.trim();
      const dateB = b.createdAt?.trim();
      return dateA ? new Date(dateA).getTime() - new Date(dateB).getTime() : 0;
    });
  }

  public static readonly sortByCreationDateDescending = <T extends CreatedAt>(posts: T[]): T[] => {
    return posts.sort((a, b) => {
      const dateA = a.createdAt?.trim();
      const dateB = b.createdAt?.trim();
      return dateA ? new Date(dateB).getTime() - new Date(dateA).getTime() : 0;
    });
  }
}
