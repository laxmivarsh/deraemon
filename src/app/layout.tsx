import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import GlobalSearchModal from '@/components/search/GlobalSearchModal';
import SmoothScroll from '@/components/animations/SmoothScroll';

export const metadata: Metadata = {
  title: 'Doraemon Universe | Interactive Animated Fan Encyclopedia',
  description: 'Explore the World of Doraemon. An immersive, cinematic fan encyclopedia featuring interactive characters, 3D gadgets, movies, episodes, and mini-games.',
  keywords: ['Doraemon', 'Nobita', 'Anywhere Door', 'Gadgets', 'Fujiko F. Fujio', 'Anime Encyclopedia', '3D Doraemon', 'Mini Games'],
  authors: [{ name: 'Doraemon Universe Community' }],
  metadataBase: new URL('https://doraemon-universe.vercel.app'),
  openGraph: {
    title: 'Doraemon Universe - Explore the World of Doraemon',
    description: 'Cinematic, interactive, highly animated Doraemon fan encyclopedia with 3D Anywhere Door, gadget museum, and mini-games.',
    url: 'https://doraemon-universe.vercel.app',
    siteName: 'Doraemon Universe',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Doraemon Universe',
    description: 'Explore the World of Doraemon in an interactive 3D universe.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased selection:bg-sky-500 selection:text-white bg-[#081B33]">
        <SmoothScroll>
          <div className="relative min-h-screen flex flex-col justify-between">
            <Navbar />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
            <GlobalSearchModal />
          </div>
        </SmoothScroll>
      </body>
    </html>
  );
}
