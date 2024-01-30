import { createFrame } from '@/app/src/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';

const IMAGE_URL = 'https://docs.privy.io/img/privy-logo-full.png';

export async function POST(req: NextRequest): Promise<Response> {
    try {
        const body: FrameRequest = await req.json();
    } catch (err) {
        console.error(err);
    }
    return new NextResponse(createFrame(IMAGE_URL, 'Second state'));
}

export const dynamic = 'force-dynamic';