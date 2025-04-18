import  createLink  from '@/lib/createNewLink';
import { redirect } from 'next/navigation';
import SuccessMessage from '../components/SuccessMessage';
import Header from  '../components/Header';

export default function HomePage() {
    async function handleSubmit(formData: FormData): Promise<void> {
        'use server';

        const alias = formData.get('alias')?.toString() || '';
        const url = formData.get('url')?.toString() || '';

        const res = await createLink({ alias, url });

        if (res.success) {
            redirect(`/?alias=${encodeURIComponent(alias)}`);
        } else {
            redirect(`/?error=${encodeURIComponent(res.message)}`);
        }
    }

    return (
        <div className="text-2xl font-bold mb-4">
            <Header />
            <main className="p-4 max-w-md mx-auto mt-10 ">
                <form action={handleSubmit} className="space-y-4">
                    <input
                        type="text"
                        name="url"
                        placeholder="Enter full URL (https://...)"
                        required
                        className="border p-2 w-full rounded"
                    />
                    <input
                        type="text"
                        name="alias"
                        placeholder="Enter custom alias (e.g., google)"
                        required
                        className="border p-2 w-full rounded"
                    />
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                    >
                        Shorten
                    </button>
                </form>
                <SuccessMessage />
            </main>
        </div>
    );
}
