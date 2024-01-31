export const ID_REGISTRY_CONTRACT_ADDRESS: `0x${string}` = '0x00000000fc6c5f01fc30151999387bb99a9f489b'; // Optimism Mainnet
export const NFT_CONTRACT_ADDRESS: `0x${string}` = '0x5805cf7bfCFd222fe232a1B89dF7D65A37749d6f'; // Optimism Sepolia Testnet
export const ZERO_ADDRESS: `0x${string}` = '0x0000000000000000000000000000000000000000';

// Frames don't quite work on localhost, so I have the default base URL point to my CF tunnel
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ankush-3000.privy.dev';
export const MESSAGE_VALIDATION_URL = 'https://nemes.farcaster.xyz:2281/v1/validateMessage';
export const AUTH_DEMO_URL = 'https://demo.privy.dev';
export const HUB_URL = 'nemes.farcaster.xyz:2283';

