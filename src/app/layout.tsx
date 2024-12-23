import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { AudioManager } from '@/components/AudioManager';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Prime Factor Heroes",
  description: "素因数分解を楽しく学べるゲーム",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ja">
      <body className={inter.className}>
        <AudioManager>
          {children}
        </AudioManager>
      </body>
    </html>
  );
}