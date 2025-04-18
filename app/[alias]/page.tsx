import getLinkByAlias from '../../lib/getLinkByAlias';
import { redirect } from 'next/navigation';

export default async function RedirectAliasPage({
                                                    params,
                                                }: {
    params: { alias: string };
}) {
    console.log('alias param:', params.alias);

    const link = await getLinkByAlias(params.alias);

    if (!link) {
        console.log('No link found for alias:', params.alias);
        return redirect('/');
    }

    console.log('Redirecting to:', link.url);
    redirect(link.url);
}

