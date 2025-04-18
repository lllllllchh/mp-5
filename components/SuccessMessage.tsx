'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function SuccessMessage() {
    const params = useSearchParams();
    const alias = params.get('alias');
    const error = params.get('error');

    const [shortUrl, setShortUrl] = useState<string | null>(null);

    useEffect(() => {
        if (alias) {
            setShortUrl(`${window.location.origin}/${alias}`);
        }
    }, [alias]);

    if (error) {
        return <p className="text-red-500 mt-4">Error: {error}</p>;
    }

    if (!alias || !shortUrl) return null;

    const copyToClipboard = () => {
        navigator.clipboard.writeText(shortUrl);
    };

    return (
        <div className="mt-6">
            <p className="text-green-600 font-medium">Your shortened URL:</p>
            <div className="flex items-center gap-2">
                <a
                    href={`/${alias}`}
                    className="text-blue-600 underline break-all"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    {shortUrl}
                </a>
                <button
                    onClick={copyToClipboard}
                    className="bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
                >
                    Copy
                </button>
            </div>
        </div>
    );
}
