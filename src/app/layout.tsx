// src/app/layout.tsx
import { PrimeReactProvider } from 'primereact/api';
import 'primereact/resources/themes/lara-light-blue/theme.css';
import 'primereact/resources/primereact.min.css';
import 'primeicons/primeicons.css';
import './globals.css';
import { ConfirmProvider } from '@/providers/confirmProvider';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <PrimeReactProvider>
          <ConfirmProvider>
            {children}
          </ConfirmProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}