import { FrameRequest } from "@coinbase/onchainkit";
import { createPublicClient, getContract, http } from "viem";
import { optimism } from "viem/chains";
import { BASE_URL, HUB_URL, ID_REGISTRY_CONTRACT_ADDRESS, MESSAGE_VALIDATION_URL, ZERO_ADDRESS } from "./constants";
import axios from "axios";
import { getSSLHubRpcClient, Message } from '@farcaster/hub-nodejs';

export enum FrameImageUrls {
    START = 'https://privy-frames-demo.vercel.app/landing.svg',
    SUCCESS = 'https://privy-frames-demo.vercel.app/success.svg',
    ERROR = 'https://privy-frames-demo.vercel.app/error.svg'
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
export const successFrame = createFrame(FrameImageUrls.SUCCESS, 'Minted!');
export const errorFrame = createFrame(FrameImageUrls.ERROR, 'Try again?');

export const parseFrameRequest = async (request: FrameRequest) => {
    const hub = getSSLHubRpcClient(HUB_URL);
    let fid: number | undefined;
    let isValid: boolean = true;

    try {
        const decodedMessage = Message.decode(
            Buffer.from(request.trustedData.messageBytes, "hex")
        );
        const result = await hub.validateMessage(decodedMessage);
        if (!result.isOk() || !result.value.valid || !result.value.message) {
            isValid = false;
        } else {
            fid = result.value.message.data?.fid;
        }
    } catch (error) {
        console.error(error)
    }

    return {fid: fid, isValid: isValid};
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
