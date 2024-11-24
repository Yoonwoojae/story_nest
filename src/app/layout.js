// src/app/layout.js
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Providers from '@/providers/Providers';

export default function RootLayout({ children }) {
    return (
        <html lang="ko" className="scroll-smooth">
            <body className="antialiased">
                <Providers>
                    <Header />
                    <main>{children}</main>
                    <Footer />
                </Providers>
            </body>
        </html>
    );
}
