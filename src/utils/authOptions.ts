import { NextAuthOptions } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import dbConnect from '@/lib/dbConnect'
import User, { UserDocument } from '@/models/User'
import bcrypt from 'bcrypt'

// Extend the session user type
declare module 'next-auth' {
  interface Session {
    user: {
      _id: string
      email?: string | null
      firstName?: string | null
      lastName?: string | null
      dob?: Date | null
      username?: string | null
      gender?: string | null
      bio?: string | null
      pronoun?: string | null
      profilePicture?: string | null
      coverPhoto?: string | null
    }
  }
}

// Extend the JWT type
declare module 'next-auth/jwt' {
  interface JWT {
    _id: string
    firstName?: string
    lastName?: string
    email?: string | null
    dob?: Date
    username?: string
    gender?: string
    bio?: string
    pronoun?: string
    profilePicture?: string
    coverPhoto?: string
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' }
      },
      async authorize(credentials) {
        await dbConnect()

        const user = await User.findOne({ email: credentials?.email }).select(
          '+hashedPassword'
        )
        if (!user) {
          throw new Error('No user found with the email')
        }

        if (!credentials?.password || !user?.hashedPassword) {
          throw new Error('Invalid password')
        }

        const isValid = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        )
        if (!isValid) {
          throw new Error('Invalid password')
        }

        return {
          id: user._id, // Add the required 'id' property
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          dob: user.dob,
          username: user.username,
          gender: user.gender,
          bio: user.bio,
          pronoun: user.pronoun,
          profilePicture: user.profilePicture,
          coverPhoto: user.coverPhoto
        }
      }
    })
  ],
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token._id = (user as UserDocument)._id
        token.firstName = (user as UserDocument).firstName
        token.lastName = (user as UserDocument).lastName
        token.email = user.email as string
        token.dob = (user as UserDocument).dob
        token.username = (user as UserDocument).username
        token.gender = (user as UserDocument).gender
        token.bio = (user as UserDocument).bio
        token.pronoun = (user as UserDocument).pronoun
        token.profilePicture = (user as UserDocument).profilePicture?.url ?? ''
        token.coverPhoto = (user as UserDocument).coverPhoto?.url ?? ''
      }
      return token
    },
    async session({ session, token }) {
      if (session.user) {
        session.user._id = token._id
        session.user.firstName = token.firstName
        session.user.lastName = token.lastName
        session.user.email = token.email
        session.user.dob = token.dob
        session.user.username = token.username
        session.user.gender = token.gender
        session.user.bio = token.bio
        session.user.pronoun = token.pronoun
        session.user.profilePicture = token.profilePicture
        session.user.coverPhoto = token.coverPhoto
      }
      return session
    }
  },
  pages: {
    signIn: '/auth/signin'
  }
}
