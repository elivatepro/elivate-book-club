import './globals.css';
import { Analytics } from '@vercel/analytics/react';

export const metadata = {
  title: 'Elivate',
  description: 'Elivate Book Club',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-parchment text-literary-black font-body">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
