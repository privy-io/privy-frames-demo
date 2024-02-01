import {getFrameMetadata} from '@coinbase/onchainkit';
import type {Metadata} from 'next';
import {FrameImageUrls, FRAME_BASE_URL} from './lib/farcaster';

const frameMetadata = getFrameMetadata({
  buttons: ['Mint'],
  image: FrameImageUrls.START,
  post_url: `${FRAME_BASE_URL}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Privy Frames',
  description: 'Privy Frames',
  openGraph: {
    title: 'Privy Frames',
    description: 'Privy Frames',
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