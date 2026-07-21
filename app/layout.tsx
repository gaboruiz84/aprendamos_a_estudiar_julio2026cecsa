import type { Metadata, Viewport } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { StudentProvider } from "@/components/student/student-provider"
import { Header } from "@/components/layout/header"
import { PWARegister } from "@/components/pwa-register"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Aprendamos a Estudiar, JULIO 2026",
  description: "Aprendamos a Estudiar, JULIO 2026 — Cuadernillo de estudio para 9° grado",
  manifest: "/manifest.json",
  icons: {
    icon: [{ url: "/logo.svg", type: "image/svg+xml" }],
    apple: "/logo.svg",
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Aprendamos a Estudiar, JULIO 2026",
  },
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="es" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <StudentProvider>
          <PWARegister />
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
            {children}
          </main>
        </StudentProvider>
      </body>
    </html>
  )
}
