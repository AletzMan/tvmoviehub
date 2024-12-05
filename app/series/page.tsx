
import { MainSliderSeries } from "../components/MainSlider/MainSliderSeries"
import { CategorySlider } from "../components/CategorySlider/CategorySlider"
import { MovieSliderGeneral } from "../components/MovieSlider/MovieSliderGeneral"
import { SerieCard } from "../components/SerieCard/SerieCard"
import { SerieCardUpcoming } from "../components/SerieCardUpcoming/SerieCardUpcoming"
import { ISerieResponse } from "../interfaces/responses"
import styles from "./series.module.scss"
import { ISerie } from "../interfaces/serie"
import { FormattedDate, FormattedDateSearch } from "../utils/helpers"
import { GetOnTheAirSeries, GetPopularSeries, GetSeriesAiringToday, GetTopRatedSeries } from "../services/fetchData"


export default async function Page(params: { params: { id: string }, searchParams: { page: number } }) {

    const airingToday: ISerie[] = await GetSeriesAiringToday()

    const popularSeries: ISerieResponse = await GetPopularSeries(params.searchParams.page)

    const ratingSeries: ISerieResponse = await GetTopRatedSeries(params.searchParams.page)

    const upcomingSeries: ISerieResponse = await GetOnTheAirSeries(params.searchParams.page)

    const dateStart = FormattedDateSearch(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)).toISOString())
    const dateEnd = FormattedDateSearch(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14)).toISOString())


    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <MainSliderSeries movies={airingToday.filter((_, index) => index < 10) as ISerie[]} />
            <div className={styles.content}>

                <CategorySlider type="serie" />
                <MovieSliderGeneral title="Mejor Valoradas" list_link="/series/results/list?sort_by=vote_average.desc&vote_count.gte=200">
                    <>
                        {
                            ratingSeries.results.map((serie, index) => (
                                <SerieCard key={serie.id} serie={serie as ISerie} top={index + 1} />
                            ))
                        }
                    </>
                </MovieSliderGeneral>
                <div className="separator"></div>
                <MovieSliderGeneral title="Populares" list_link="/series/results/list?sort_by=popularity.desc">
                    <>
                        {
                            popularSeries.results.map((serie, index) => (
                                <SerieCard key={serie.id} serie={serie as ISerie} top={index + 1} />
                            ))
                        }
                    </>
                </MovieSliderGeneral>
                <div className="separator"></div>
                <MovieSliderGeneral title="Emitidas los próximos días" list_link={`/series/results/list?sort_by=popularity.desc&air_date.lte=${dateEnd.replace(" ", "")}&air_date.gte=${dateStart.replace(" ", "")}`}>
                    <>
                        {
                            upcomingSeries.results.map((serie, index) => (
                                <SerieCardUpcoming key={serie.id} serie={serie as ISerie} />
                            ))
                        }
                    </>
                </MovieSliderGeneral>
            </div>
        </section>
    )
}