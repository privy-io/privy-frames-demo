import { FrameRequest, getFrameAccountAddress } from '@coinbase/onchainkit';
import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

const apiUrl = 'https://api.twitter.com/2/users';
const params = 'user.fields=public_metrics'

export async function POST(req: NextRequest): Promise<Response> {
  let response: any;
  try {
    const data = await req.json();
    response = await axios.get(`${apiUrl}/${data.id}?${params}`, {
        headers: {
            Authorization: `Bearer ${process.env.TWITTER_BEARER_TOKEN}`
        }
    });
    console.log(response.data);
  } catch (e) {
    console.log(e);
  }

  return new NextResponse(response);
}

export const dynamic = 'force-dynamic';
