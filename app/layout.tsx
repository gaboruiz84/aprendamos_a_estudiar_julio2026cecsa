import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { StudentProvider } from "@/components/student/student-provider"
import { Header } from "@/components/layout/header"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Aprendamos a Estudiar — MINED 2026",
  description: "Cuadernillo de estudio para 9° grado — MINED 2026",
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
          <Header />
          <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-6">
            {children}
          </main>
        </StudentProvider>
      </body>
    </html>
  )
}
