import { MainSlider } from "./components/MainSlider/MainSlider"
import { MainSliderSeries } from "./components/MainSlider/MainSliderSeries"
import { PopularPeople } from "./components/PopularPeople/PopularPeople"
import { IMovie } from "./interfaces/movie"
import { IPopularPeopleResponse } from "./interfaces/responses"
import { ISerie } from "./interfaces/serie"
import styles from "./page.module.css"
import { GetNowPlaying, GetSeriesAiringToday, GetPeoplePopular } from "./services/fetchData"


export default async function Home(params: { params: { lang: string }, searchParams: {} }) {
  const data: IMovie[] = await GetNowPlaying()
  const dataSeries: ISerie[] = await GetSeriesAiringToday()
  const dataPeople: IPopularPeopleResponse = await GetPeoplePopular()

  return (
    <>
      <section className={`${styles.section} scrollBarStyle`}>
        <article className={styles.article}>
          <h3 className={styles.section_title}>PELÍCULAS EN CARTELERA</h3>
          <MainSlider movies={data} />
        </article>
        <article className={styles.article}>
          <h3 className={styles.section_title}>SERIES EMITIDAS HOY</h3>
          <MainSliderSeries movies={dataSeries} />
        </article>
        <article className={styles.articleThree}>
          <h3 className={styles.section_title}>TOP 20 ACTORES POPULARES</h3>
          <PopularPeople people={dataPeople.results} />
        </article>
      </section>
    </>
  )
}
