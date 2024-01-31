import { errorFrame, parseFrameRequest, getOwnerAddressFromFid, successFrame } from '@/app/lib/farcaster';
import { FrameRequest } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import { airdropTo } from '@/app/lib/nft';

export async function POST(req: NextRequest): Promise<Response> {
    let frameRequest: FrameRequest | undefined;

    // Parse and validate request from Frame for fid
    try {
        frameRequest = await req.json();
        if (!frameRequest) throw new Error('Could not deserialize request from frame');
    } catch {
        return new NextResponse(errorFrame);
    }
    const {fid, isValid} = await parseFrameRequest(frameRequest);
    if (!fid || !isValid) return new NextResponse(errorFrame);

    // Query FC Registry contract to get owner address from fid
    const ownerAddress = await getOwnerAddressFromFid(fid);
    if (!ownerAddress) return new NextResponse(errorFrame);

    // TODO: Add code to pre-generate a FarcasterAccount in the public auth demo
    // with an embedded wallet using the `fid` and `ownerAddress`. If there is an 
    // existing FarcasterAccount corresponding to those values, just use the embedded
    // wallet associated with it
    
    // Airdrop NFT to the user's wallet
    // TODO: Change `ownerAddress` to the embedded wallet address once the above is done
    const tx = await airdropTo(ownerAddress);
    if (!tx) return new NextResponse(errorFrame);

    return new NextResponse(successFrame);
}

export const dynamic = 'force-dynamic';