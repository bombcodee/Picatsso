import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Picatsso — 당신의 고양이가 직접 그린 그림",
  description: "반려묘의 성격을 AI로 분석하고, 고양이가 실제로 보는 색감으로 피카소 스타일의 예술 작품을 생성합니다.",
  keywords: ["고양이", "AI", "그림", "피카소", "반려묘", "아트", "고양이 시각"],
  openGraph: {
    title: "Picatsso — 당신의 고양이가 직접 그린 그림",
    description: "고양이 성격 분석 → 피카소풍 아트 생성. 고양이가 보는 세상의 색감으로.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="ko"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body suppressHydrationWarning className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
