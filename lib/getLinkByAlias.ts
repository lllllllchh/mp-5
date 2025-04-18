import getCollection from '@/db';
import { Link } from '@/types';

export default async function getLinkByAlias(alias: string): Promise<Link | null> {
    const collection = await getCollection('links');
    const data = await collection.findOne({ alias });

    if (data === null) return null;

    return {
        alias: data.alias,
        url: data.url,
        id: data._id?.toHexString(),
    };
}
