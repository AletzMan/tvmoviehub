
import type { Metadata } from "next"
import { Jost } from "next/font/google"
import "./globals.css"
import { SideMenu } from "./components/SideMenu/SideMenu"
import Header from "./components/Header/Header"
import styles from "./page.module.css"

const jost = Jost({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Film Data Hub",
  description: "Bienvenido a Film Data Hub, el punto de encuentro para amantes del cine, investigadores y profesionales de la industria. Nuestro objetivo es ofrecerte una experiencia completa y accesible, brindándote la información más detallada y actualizada sobre películas, actores, directores, y todo lo relacionado con el séptimo arte.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={jost.className}>
        <main className={`${styles.main} `} >
          <SideMenu />
          <Header />
          {children}
        </main>
      </body>
    </html>
  )
}
