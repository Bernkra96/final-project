import { v2 as cloudinary } from 'cloudinary';

export function setCloudinaryEnvVars() {
  if (process.env.NODE_ENV === 'production' || process.env.CI) {
    cloudinary.config({
      cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
      api_key: process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
      secure: true,
    });
    return;
  }
}
// Replacement for unmaintained dotenv-safe package
//
