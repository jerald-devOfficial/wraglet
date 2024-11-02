import getSession from '@/actions/getSession'
import dbConnect from '@/lib/dbConnect'
import User from '@/models/User'

const getOtherUsers = async () => {
  const session = await getSession().catch((err) => {
    console.error(
      'Error happened while getting getSession on getOtherUsers: ',
      err
    )
  })

  if (!session?.user?.email) {
    return []
  }

  try {
    await dbConnect()

    const users = await User.find({
      email: { $ne: session.user.email }
    })
      .select('-hashedPassword')
      .sort({ createdAt: 'desc' })
      .exec()

    return users
  } catch (error: any) {
    console.error('Some error happened while getting getOtherUsers(): ', error)
    return []
  }
}

export default getOtherUsers
