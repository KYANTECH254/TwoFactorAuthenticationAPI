import speakeasy from 'speakeasy';

export async function POST(request: Request): Promise<Response> {
    try {
        const data = await request.json();

        if (!data || !data.key || !data.email || !data.issuer) {
            return Response.json({
                response_message: 'Empty parameter',
                success: false,
            });
        }

        const key = String(data.key).trim();
        const account = String(data.email).trim();
        const issuer = String(data.issuer).trim();

        const otpAuthUrl = speakeasy.otpauthURL({
            secret: key,
            label: account,
            issuer: issuer,
            encoding: 'base32',
        });

        if (otpAuthUrl) {
            return Response.json({
                response_message: 'Uri Key generated',
                uri_key: otpAuthUrl,
                success: true,
            });
        } else {
            return Response.json({
                response_message: 'An error occurred',
                success: false,
            });
        }
    } catch (error) {
        return Response.json({
            response_message: 'An error occurred',
            success: false,
            error: error,
        });
    }
}

export async function GET() {
    return Response.json({
        response_message: 'Invalid request',
        success: false,
    });
}
