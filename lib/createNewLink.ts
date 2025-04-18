"use server";

import getCollection from "@/db";
import { Link } from "@/types";

export default async function createLink(link: Link): Promise<{ success: boolean; message: string; id?: string }> {
    const { alias, url } = link;

    if (!url || url.trim() === '') {
        return { success: false, message: 'URL is required' };
    }

    try {
        const parsed = new URL(url);
        if (!['http:', 'https:'].includes(parsed.protocol)) {
            return { success: false, message: 'URL must start with http or https' };
        }
    } catch (e) {
        console.error('[createLink] URL parsing error:', e);
        return { success: false, message: 'Invalid URL format' };
    }
    try {
        const response = await fetch(url, { method: 'HEAD', redirect: 'manual' });

        if (!response.ok) {
            console.warn('[createLink] Server responded with error status:', response.status);
            return { success: false, message: 'Target site is unreachable or invalid' };
        }
    } catch (e) {
        console.error('[createLink] Fetch failed — unreachable domain or DNS error:', e);
        return { success: false, message: 'Target domain has no server or DNS record' };
    }


    const collection = await getCollection('links');
    const exists = await collection.findOne({ alias });
    if (exists) {
        return { success: false, message: 'Alias already taken' };
    }

    const newLink = { alias, url };
    const res = await collection.insertOne({ ...newLink });

    if (!res.acknowledged) {
        throw new Error('DB insert failed');
    }

    return {
        success: true,
        message: 'Short URL created!',
        id: res.insertedId.toHexString(),
    };
}
