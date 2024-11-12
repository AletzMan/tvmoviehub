import { MainSlider } from "./components/MainSlider/MainSlider"
import { MainSliderSeries } from "./components/MainSlider/MainSliderSeries"
import { PopularPeople } from "./components/PopularPeople/PopularPeople"
import { IMovie } from "./interfaces/movie"
import { IPeopleResponse } from "./interfaces/responses"
import { ISerie } from "./interfaces/serie"
import styles from "./page.module.css"
import { GetNowPlaying, GetSeriesAiringToday, GetPeoplePopular } from "./services/fetchData"


export default async function Home(params: { params: { lang: string }, searchParams: {} }) {
  const data: IMovie[] = await GetNowPlaying()
  const dataSeries: ISerie[] = await GetSeriesAiringToday()
  const dataPeople: IPeopleResponse = await GetPeoplePopular(1)

  return (
    <section className={`${styles.home} scrollBarStyle`}>
      <section className={`${styles.section} `}>
        <article className={styles.article}>
          <h3 className={styles.section_title}>PELÍCULAS EN CARTELERA</h3>
          <MainSlider movies={data} />
        </article>
        {/*<article className={styles.article}>
          <h3 className={styles.section_title}>SERIES EMITIDAS HOY</h3>
          <MainSliderSeries movies={dataSeries} />
  </article>*/}
      </section>
      <article className={styles.articleThree}>
        <div className="separator"></div>
        <h3 className={styles.section_title}>TOP 20 ACTORES POPULARES</h3>
        <PopularPeople people={dataPeople.results} />
      </article>
    </section>
  )
}
