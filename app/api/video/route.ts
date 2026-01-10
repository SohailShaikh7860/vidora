import { NextResponse, NextRequest } from 'next/server';
import { PrismaClient, Prisma } from '../../generated/prisma/client';

const prisma = new PrismaClient({} as any);

export async function GET(request: NextRequest){
    try {
       const videos =  await prisma.video.findMany({
            orderBy:{
                createdAt: 'desc'
            }
        })

        return NextResponse.json(videos);
    } catch (error) {
        return NextResponse.json({error: 'Failed to fetch videos'}, {status: 500});        
    } finally{
        await prisma.$disconnect();
    }
}