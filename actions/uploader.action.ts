'use server';

import { auth } from '@/lib/auth';
import { headers } from 'next/headers';
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import { nanoid } from 'nanoid';



const accessKeyId = process.env.R2_ACCESS_KEY_ID;
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY;
const publicDomain = process.env.R2_PUBLIC_DOMAIN
const Bucket = process.env.R2_IMG_BUCKET



type ImageUploadRequest = {
  imageSize: number; // in bytes
  imageName: string;
  imageType: string; // mimetype (e.g. 'image/jpeg')
};

const allowedTypes = ['image/jpeg', 'image/png', 'image/jpg'];

const S3 = new S3Client({
  endpoint: 'https://94fa1ef711aaf3b23245726c85f84201.r2.cloudflarestorage.com',
  region: 'auto',
  ...(accessKeyId && secretAccessKey && {
    credentials: {
      accessKeyId,
      secretAccessKey,
    },
  }),
});

const getUrl = async (fileName: string, size: number, contentType: string): Promise<{signedUrl: string, publicUrl: string }> => {
  const key = `avatars/${nanoid(6)}/${fileName}`;
  const url = await getSignedUrl(S3, new PutObjectCommand({
    Bucket: Bucket,
    Key: key,
    ContentLength: size,
    ContentType: contentType,   
  }),
  {
    expiresIn: 60 * 60 * 24 * 3 // 3min
  }
)
  return {
    signedUrl: url,
    publicUrl: `${publicDomain}/${key}`
  };
};


export async function imageUploadRequest({
  imageSize,
  imageName,
  imageType,
}: ImageUploadRequest) {
  // Check session
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  if (!session) {
    return { error: 'yetkisiz erişim' };
  }
  // Check image size (must be <= 2MB)
  if (imageSize > 2 * 1024 * 1024) {
    return { error: 'resim boyutu büyük' };
  }
  // Check image type
  if (!allowedTypes.includes(imageType)) {
    return { error: 'resim türü desteklemiyor' };
  }

  const {signedUrl, publicUrl} = await await getUrl(imageName, imageSize, imageType)
  

  // If all checks pass, proceed (for now, just return ok)
  return {
    success: true,
    signedUrl: signedUrl,
    publicUrl: publicUrl
  };
}




