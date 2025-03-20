import speakeasy from 'speakeasy';

export async function POST(request: Request): Promise<Response> {
    try {
        const data = await request.json();

        if (!data || !data.code || !data.key) {
            return Response.json({
                response_message: 'Empty parameter',
                success: false,
            });
        }

        const code = String(data.code).trim();
        const key = String(data.key).trim();

        const isValid = speakeasy.totp.verify({
            secret: key,
            encoding: 'base32',
            token: code,
            window: 1, 
        });

        if (isValid) {
            return Response.json({
                response_message: 'Code verified',
                success: true,
            });
        } else {
            return Response.json({
                response_message: 'Invalid code',
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
