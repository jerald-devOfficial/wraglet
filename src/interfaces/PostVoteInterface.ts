export interface PostVoteInterface {
  userId: string;
  voteType: 'upvote' | 'downvote';
  createdAt: Date;
  updatedAt: Date;
}