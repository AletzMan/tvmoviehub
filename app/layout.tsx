
import type { Metadata } from "next"
import { Jost } from "next/font/google" 
import Header from "./components/Header/Header"
import styles from "./page.module.css"
import "./globals.css"
import { LoadingPage } from "./components/LoadingPage/LoadingPage"
import { TrailerPage } from "./components/TrailerPage/TrailerPage"
import { DialogAlert } from "./components/DialogAlert/DialogAlert"

const jost = Jost({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "MovieDeck - Film Data Hub",
  description: "Bienvenido a  MovieDeck, el punto de encuentro para amantes del cine, investigadores y profesionales de la industria. Nuestro objetivo es ofrecerte una experiencia completa y accesible, brindándote la información más detallada y actualizada sobre películas, actores, directores, y todo lo relacionado con el séptimo arte.",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={`${jost.className} scrollBarStyle`}>
        <main className={`${styles.main} `} >
          <Header />
          {children}
        </main>
        {<LoadingPage />}
        {<TrailerPage />}
        {<DialogAlert />}
        <div id="rating-portal" />
      </body>
    </html>
  )
}
