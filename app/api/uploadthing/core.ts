import { auth } from '@clerk/nextjs/server'
import { createUploadthing, type FileRouter } from 'uploadthing/next'
import { UploadThingError } from 'uploadthing/server'

const f = createUploadthing()

export const ourFileRouter = {
  imageUploader: f({
    image: {
      maxFileSize: '4MB',
      maxFileCount: 1,
    },
  })
    .middleware(async () => {
      const { userId } = await auth() // Extract only the userId

      if (!userId) throw new UploadThingError('Unauthorized')

      return { userId } // Return only the userId, which is serializable
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log('Upload complete for userId:', metadata.userId)
      console.log('file url', file.url)

      return { uploadedBy: metadata.userId } // Still a plain string — good to go
    }),
} satisfies FileRouter

export type OurFileRouter = typeof ourFileRouter
