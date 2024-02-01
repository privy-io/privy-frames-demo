import axios, { AxiosRequestConfig } from 'axios';

const PRIVY_APP_ID = process.env.PRIVY_APP_ID;
const PRIVY_APP_SECRET = process.env.PRIVY_APP_SECRET;
const PRIVY_API_URL = process.env.PRIVY_API_URL || 'https://auth.privy.io/api/v1';

const config: AxiosRequestConfig = {
    headers: {
        'privy-app-id': PRIVY_APP_ID,
        Authorization: `Basic ${btoa(`${PRIVY_APP_ID}:${PRIVY_APP_SECRET}`)}`
    }
}

export const findExistingEmbeddedWalletForDid = async (did: string) => {
    try {
        const {data} = await axios.get(`${PRIVY_API_URL}/users/${did}`, config);
        const linkedAccounts = data.linked_accounts;
        const embeddedWallet = linkedAccounts.find((account: any) => (account.type === 'wallet'));
        return embeddedWallet.address;
    } catch (error) {
        console.error(error);
        return undefined;
    }
}

export const createEmbeddedWalletForFid = async (fid: number, ownerAddress: string) => {
    let embeddedWalletAddress: `0x${string}` | undefined;
    const proposedUser = {
        'create_embedded_wallet': true,
        'linked_accounts': [
            {
                'type': 'farcaster',
                'fid': fid,
                'owner_address': ownerAddress
            }
        ]
    }
    try {
        const {data} = await axios.post(`${PRIVY_API_URL}/users`, proposedUser, config); 
        const linkedAccounts = data.linked_accounts;
        const embeddedWallet = linkedAccounts.find((account: any) => (account.type === 'wallet'));
        embeddedWalletAddress = embeddedWallet.address;
    } catch (e) {
        const did = (e as any).response.data.cause;
        // There is an existing user with that fid, use their embedded wallet instead 
        if (typeof did === 'string' && did.includes('did:privy:')) {
            embeddedWalletAddress = await findExistingEmbeddedWalletForDid(did);
        } else {
            console.error(e);
        }
    }
    return embeddedWalletAddress;
}