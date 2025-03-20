import speakeasy from 'speakeasy';

export async function GET() {
    try {
        const secret = speakeasy.generateSecret({ length: 20 }).base32;

        if (secret) {
            return Response.json({
                response_message: 'Secret Key generated',
                secret_key: secret,
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

export async function POST() {
    return Response.json({
        response_message: 'Invalid request',
        success: false,
    });
}
