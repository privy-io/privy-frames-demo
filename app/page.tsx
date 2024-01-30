import { getFrameMetadata } from '@coinbase/onchainkit';
import type { Metadata } from 'next';

const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

const frameMetadata = getFrameMetadata({
  buttons: ['Click me'],
  image: `${baseUrl}/start-frame.png`,
  post_url: `${baseUrl}/api/frame`,
});

export const metadata: Metadata = {
  title: 'Privy Frames',
  description: 'Privy Frames',
  openGraph: {
    title: 'Privy Frames',
    description: 'Privy Frames',
    images: [''],
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