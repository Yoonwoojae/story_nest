// src/app/layout.js
import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function RootLayout({ children }) {
    return (
        <html lang="ko" className="scroll-smooth">
            <body className="antialiased">
                <Header />
                <main>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
