import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';
export default async function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    const cookieStore = cookies();
    const token = (await cookieStore).get('authToken');

    // if (!token) {
    //     redirect('/sign-in');
    // }

    return (
        <main className="flex h-screen w-full font-inter">
            <div className="flex size-full flex-col">
                <div className="flex">
                    {/* <Sidebar /> */}
                    <div className="flex flex-col w-full">
                        {/* <Navbar /> */}
                        {children}
                    </div>
                </div>
            </div>
        </main>
    );
}
