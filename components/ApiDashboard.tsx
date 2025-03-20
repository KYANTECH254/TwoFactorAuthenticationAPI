'use client';

import { useState } from 'react';
import { ClipboardIcon, CheckIcon } from 'lucide-react';

const apiRoutes = [
    {
        name: 'Generate Secret Key',
        endpoint: '/api/generateSecretKey',
        method: 'GET',
        description: 'Generates a new 2FA secret key for the user.',
        requestExample: `GET ${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/generateSecretKey`,
        responseExample: `{
  "response_message": "Secret Key generated",
  "secret_key": "JBSWY3DPEHPK3PXP",
  "success": true
}`,
    },
    {
        name: 'Generate QR Code URI',
        endpoint: '/api/generateQRCode',
        method: 'POST',
        description: 'Generates a URI for Google Authenticator from a issuer, secret and email.',
        requestExample: `POST ${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/generateQRCode
Content-Type: application/json

{
  "issuer": "KyanTech", //Add you company / website name
  "key": "JBSWY3DPEHPK3PXP",
  "email": "user@example.com"
}`,
        responseExample: `{
  "response_message": "Uri Key generated",
  "uri_key": "otpauth://totp/KyanTech:user@example.com?secret=JBSWY3DPEHPK3PXP&issuer=KyanTech",
  "success": true
}`,
    },
    {
        name: 'Verify TOTP Code',
        endpoint: '/api/verifyCode',
        method: 'POST',
        description: 'Validates a TOTP code submitted by the user.',
        requestExample: `POST ${process.env.NEXT_PUBLIC_BASE_URL || ''}/api/verifyCode
Content-Type: application/json

{
  "code": "123456",
  "key": "JBSWY3DPEHPK3PXP"
}`,
        responseExample: `{
  "response_message": "Code verified",
  "success": true
}`,
    },
];

export default function ApiDashboard() {
    const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

    const handleCopy = (text: string, index: number) => {
        navigator.clipboard.writeText(text);
        setCopiedIndex(index);
        setTimeout(() => setCopiedIndex(null), 2000);
    };

    return (
        <div className="min-h-screen bg-gray-400 py-10 px-4 sm:px-8 rounded-md">
            <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Two Factor authentication API Endpoints Overview</h1>
            <div className="space-y-6 max-w-4xl mx-auto">
                {apiRoutes.map((route, index) => (
                    <div key={route.endpoint} className="bg-white/60 rounded-lg shadow-md p-6 border border-gray-200">
                        <div className="flex justify-between items-center mb-2">
                            <h2 className="text-xl font-semibold text-gray-800">{route.name}</h2>
                            <span className="text-sm font-mono bg-gray-100 px-2 py-1 rounded text-gray-700">
                                {route.method}
                            </span>
                        </div>
                        <p className="text-gray-600 mb-4">{route.description}</p>

                        <div className="mb-2">
                            <h3 className="font-medium text-gray-700 mb-1">Request Example:</h3>
                            <pre className="bg-gray-900 text-green-300 p-3 rounded text-sm overflow-auto relative">
                                <button
                                    onClick={() => handleCopy(route.requestExample, index)}
                                    className="absolute top-2 right-2 text-white hover:text-green-400 transition"
                                    title="Copy to clipboard"
                                >
                                    {copiedIndex === index ? (
                                        <CheckIcon className="h-5 w-5" />
                                    ) : (
                                        <ClipboardIcon className="h-5 w-5" />
                                    )}
                                </button>
                                {route.requestExample}
                            </pre>
                        </div>

                        <div>
                            <h3 className="font-medium text-gray-700 mb-1">Response Example:</h3>
                            <pre className="bg-gray-800 text-blue-300 p-3 rounded text-sm overflow-auto">
                                {route.responseExample}
                            </pre>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
