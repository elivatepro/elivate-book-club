import './globals.css';

export const metadata = {
  title: 'Elivate',
  description: 'Elivate Book Club',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-parchment text-literary-black font-body">{children}</body>
    </html>
  );
}
