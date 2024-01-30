import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';
import { BASE_URL } from './lib/constants';
import { FrameImageUrls } from './lib/farcaster';

const frameMetadata = getFrameMetadata({
  buttons: ['Mint'],
  image: FrameImageUrls.START,
  post_url: `${BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Privy Frames',
  description: 'Privy Frames',
  openGraph: {
    title: 'Privy Frames',
    description: 'Privy Frames',
    // TODO: This should be a regular OG image, not a frame one
    images: [FrameImageUrls.START],
  },
  other: {
    ...frameMetadata,
  },
};

export default function Page() {
  return (
    <>
      <h1>Privy Frames</h1>
    </>);
}