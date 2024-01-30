export const ID_REGISTRY_CONTRACT_ADDRESS: `0x${string}` = '0x00000000fc6c5f01fc30151999387bb99a9f489b'; // Optimism Mainnet
export const NFT_CONTRACT_ADDRESS: `0x${string}` = '0x8d2f64cf96b895af6a6b2272c2c246a18ba37633'; // Goerli Testnet
export const ZERO_ADDRESS: `0x${string}` = '0x0000000000000000000000000000000000000000';

// Frames don't quite work on localhost, so I have the default base URL point to my CF tunnel
export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://ankush-3000.privy.dev';

