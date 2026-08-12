import { MainSlider } from "./components/MainSlider/MainSlider"
import { MainSliderSeries } from "./components/MainSlider/MainSliderSeries"
import { PopularPeople } from "./components/PopularPeople/PopularPeople"
import { IMovie } from "./interfaces/movie"
import { IPeopleResponse } from "./interfaces/responses"
import { ISerie } from "./interfaces/serie"
import styles from "./page.module.css"
import { GetNowPlaying, GetSeriesAiringToday, GetPeoplePopular } from "./services/fetchData"


export default async function Home() {
  const data: IMovie[] = await GetNowPlaying()
  const dataPeople: IPeopleResponse = await GetPeoplePopular(1)

  return (
    <section className={`${styles.home} `}>
      <section className={`${styles.section} `}>
        <article className={styles.article}>
          {/*<h3 className={styles.section_title}>PELÍCULAS EN CARTELERA</h3>*/}
          <MainSlider movies={data || []} />
        </article>
      </section>
      <div className="separator"></div>
      <article className={styles.articleThree}>
        <h3 className={styles.section_title}>PERSONALIDADES DEL MOMENTO</h3>
        <PopularPeople people={dataPeople?.results || []} />
      </article>
    </section>
  )
}
