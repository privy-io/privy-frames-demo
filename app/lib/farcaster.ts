import { FrameRequest } from "@coinbase/onchainkit";
import { createPublicClient, getContract, http } from "viem";
import { optimism } from "viem/chains";
import { BASE_URL, ID_REGISTRY_CONTRACT_ADDRESS, ZERO_ADDRESS } from "./constants";

export enum FrameImageUrls {
    START = 'https://privy-frames-demo.vercel.app/start-frame.png',
    SUCCESS = 'https://privy-frames-demo.vercel.app/success-frame.png',
    ERROR = 'https://privy-frames-demo.vercel.app/error-frame.png'
}

export const createFrame = (imageUrl: string, buttonText: string) => {
    return (`
        <!DOCTYPE html>
        <html>
            <head>
            <meta name="fc:frame" content="vNext">
            <meta name="fc:frame:image" content="${imageUrl}">
            <meta name="fc:frame:post_url" content="${BASE_URL}/api/frame">
            <meta name="fc:frame:button:1" content="${buttonText}">
            </head>
        </html>`);
}
export const successFrame = createFrame(FrameImageUrls.SUCCESS, 'Okay');
export const errorFrame = createFrame(FrameImageUrls.ERROR, 'Try again');

export const getFidFromFrameRequest = (request: FrameRequest) => {
    // TODO(PO): Add validation against a Farcaster hub
    return request.untrustedData.fid;
}

export const getOwnerAddressFromFid = async (fid: number) => {
    let ownerAddress: `0x${string}` | undefined;
    try {
        const publicClient = createPublicClient({
            chain: optimism,
            transport: http(),
        });
        const idRegistry = getContract({
            address: ID_REGISTRY_CONTRACT_ADDRESS,
            abi: [
              {
                inputs: [{internalType: 'uint256', name: 'fid', type: 'uint256'}],
                name: 'custodyOf',
                outputs: [{internalType: 'address', name: 'owner', type: 'address'}],
                stateMutability: 'view',
                type: 'function',
              },
            ],
            client: publicClient
        });
        ownerAddress = await idRegistry.read.custodyOf([BigInt(fid)]);
    } catch (error) {
        console.error(error);
    }
    return ownerAddress !== ZERO_ADDRESS ? ownerAddress : undefined;
}
