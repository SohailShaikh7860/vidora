import { v2 as cloudinary, UploadStream } from "cloudinary";
import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";

export const config = {
  api: {
    bodyParser: {
      sizeLimit: '100mb',
    },
  },
};

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });

// Configuration
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  public_id: string;
  bytes: number;
  duration?: number;
  [key: string]: any;
}

export async function POST(request: Request) {
  try {
    const { userId } = await auth();
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { title, description, publicId, originalSize, compressedSize, duration } = body;

    if (!publicId) {
      return NextResponse.json({ error: "No video data provided" }, { status: 400 });
    }

    const video = await prisma.video.create({
        data:{
            title,
            description,
            publicId,
            OriginalSize: originalSize,
            compressedSize,
            duration,
            userId,
        }
    })

    return NextResponse.json({ success: true, video }, { status: 200 });
  } catch (error) {
    console.log("Save video metadata failed", error);
    return NextResponse.json({ error: "Failed to save video" }, { status: 500 });
  } finally{
    await prisma.$disconnect();
  }
}
