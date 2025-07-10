import type { Metadata } from "next";
import "./globals.css";
import { LanguageProvider } from './components/LanguageProvider';
import Navbar from './components/Navbar';

export const metadata: Metadata = {
  title: "小红视频下载 - 首页",
  description: "轻松下载您喜爱的视频！支持X、YouTube、TikTok、Instagram、Facebook等平台",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <head>
        <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet" />
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css" />
      </head>
      <body className="font-sans" style={{backgroundColor: '#f0f2f5'}}>
        <LanguageProvider>
          <div className="container-wrapper">
            <Navbar />
            <main className="main-content-area">
              <div className="content-frame">
                {children}
              </div>
            </main>
          </div>
        </LanguageProvider>
      </body>
    </html>
  );
}
