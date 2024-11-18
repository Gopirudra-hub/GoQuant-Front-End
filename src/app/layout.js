import './globals.css';

export const metadata = {
  title: 'Orderbook App',
  description: 'Real-time BTC-USD Orderbook with Indicators',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="bg-background text-foreground min-h-screen flex flex-col">
        <div className="container mx-auto p-4">
          {children}
        </div>
      </body>
    </html>
  );
}
