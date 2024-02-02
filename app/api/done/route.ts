import { successFrame } from '@/app/lib/farcaster';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest): Promise<Response> {
    return new NextResponse(successFrame);
}

export const dynamic = 'force-dynamic';