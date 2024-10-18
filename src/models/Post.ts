import { AuthorInterface, PostVoteInterface } from '@/interfaces'
import mongoose, { Document, Schema } from 'mongoose'

import { PostReactionDocument } from './PostReaction'

export interface PostDocument extends Document {
  _id: string
  content: {
    text?: string
    images?: {
      url: string
      key: string
    }[]
  }
  audience: string
  author: AuthorInterface
  reactions: PostReactionDocument[]
  votes: PostVoteInterface[]
  createdAt: Date
  updatedAt?: Date
}

const PostSchema = new Schema<PostDocument>(
  {
    content: {
      text: String,
      images: [{ url: String, key: String }]
    },
    audience: String,
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    reactions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'PostReaction' }],
    votes: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        voteType: { type: String, enum: ['upvote', 'downvote'] },
        createdAt: Date,
        updatedAt: Date
      }
    ]
  },
  { timestamps: true }
)

export default (mongoose.models.Post as mongoose.Model<PostDocument>) ||
  mongoose.model<PostDocument>('Post', PostSchema)
