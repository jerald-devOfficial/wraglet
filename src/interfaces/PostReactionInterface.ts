import { AuthorInterface } from './AuthorInterface';

export interface PostReactionInterface {
  _id: string;
  type: string;
  postId: string;
  userId: AuthorInterface;
  createdAt: Date;
  updatedAt: Date;
}