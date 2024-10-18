import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/lib/dbConnect'
import User, { UserDocument } from '@/models/User'
import bcrypt from 'bcryptjs'

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        // Check if the user exists.
        await dbConnect()

        const user = (await User.findOne({
          email: credentials?.email?.toLowerCase()
        }).lean()) as UserDocument | null

        if (user) {
          const isPasswordCorrect = await bcrypt.compare(
            credentials!.password,
            user.hashedPassword
          )

          if (isPasswordCorrect) {
            // Cast user to UserDocument to access properties
            const typedUser = user

            return {
              id: typedUser._id.toString(), // convert ObjectId to string
              firstName: typedUser.firstName,
              lastName: typedUser.lastName,
              email: typedUser.email,
              dob: typedUser.dob,
              username: typedUser.username,
              gender: typedUser.gender,
              bio: typedUser.bio,
              pronoun: typedUser.pronoun,
              profilePicture: typedUser.profilePicture,
              coverPhoto: typedUser.coverPhoto
            }
          } else {
            throw new Error('Wrong Credentials!')
          }
        } else {
          throw new Error('User not found!')
        }
      }
    })
  ],
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt'
  },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    error: '/'
  }
}
