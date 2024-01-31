import { errorFrame, parseFrameRequest, getOwnerAddressFromFid, successFrame } from '@/app/lib/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { airdropTo } from '@/app/lib/nft';
import { AUTH_DEMO_URL } from '@/app/lib/constants';

export async function POST(req: NextRequest): Promise<Response> {
    let frameRequest: FrameRequest | undefined;

    // Parse request from Frame for fid
    try {
        frameRequest = await req.json();
        if (!frameRequest) throw new Error('Could not deserialize request from frame');
    } catch {
        return new NextResponse(errorFrame);
    }

    // @ts-ignore
    return new NextResponse.redirect(AUTH_DEMO_URL)
}

export const dynamic = 'force-dynamic';