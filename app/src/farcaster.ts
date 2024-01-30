
const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';

export const createFrame = (imageUrl: string, buttonText: string) => {
    return (`
        <!DOCTYPE html>
        <html>
            <head>
            <meta name="fc:frame" content="vNext">
            <meta name="fc:frame:image" content="${imageUrl}">
            <meta name="fc:frame:post_url" content="${baseUrl}/api/frame">
            <meta name="fc:frame:button:1" content="${buttonText}">
            </head>
        </html>`);
}

export const initialFrame = createFrame('', 'Test');