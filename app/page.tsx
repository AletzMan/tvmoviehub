import { MainSlider } from "./components/MainSlider/MainSlider"
import { MovieCard } from "./components/MovieCard/MovieCard"
import { MovieSliderGeneral } from "./components/MovieSlider/MovieSliderGeneral"
import { IMovie } from "./interfaces/movie"
import { IMovieResponse, IPeopleResponse } from "./interfaces/responses"
import { ISerie } from "./interfaces/serie"
import styles from "./page.module.css"
import { PersonCard } from "./people/components/PersonCard/PersonCard"
import { GetNowPlaying, GetPeoplePopular, GetPopularMovies, GetTopRatedMovies } from "./services/fetchData"


export default async function Home() {
  const data: IMovie[] = await GetNowPlaying()
  const dataPeople: IPeopleResponse = await GetPeoplePopular(1) || { results: [] }
  const popularMovies: IMovieResponse = (await GetPopularMovies(1)) || { results: [] }
  const ratingMovies: IMovieResponse = (await GetTopRatedMovies(1)) || { results: [] }

  return (
    <section className={`${styles.home} `}>
      <section className={`${styles.section} `}>
        <article className={styles.article}>
          {/*<h3 className={styles.section_title}>PELÍCULAS EN CARTELERA</h3>*/}
          <MainSlider movies={data || []} />
        </article>
      </section>
      <MovieSliderGeneral
        title="Mejor Valoradas"
        slidesToShow={6}
        list_link="/movies/results/list?sort_by=vote_average.desc&without_genres=99,10755&vote_count.gte=200">
        <>
          {ratingMovies?.results?.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} top={index + 1} />
          ))}
        </>
      </MovieSliderGeneral>
      <MovieSliderGeneral title="Populares" list_link="/movies/results/list?sort_by=popularity.desc" slidesToShow={8}>
        <>
          {popularMovies?.results?.map((movie, index) => (
            <MovieCard key={movie.id} movie={movie} top={index + 1} />
          ))}
        </>
      </MovieSliderGeneral>
      <MovieSliderGeneral title="Personalidades del momento" list_link="/people?page=1" slidesToShow={9}>
        <>
          {dataPeople?.results?.map((person, index) => (
            <PersonCard key={person.id} person={person} rank={index + 1} isCircle />
          ))}
        </>
      </MovieSliderGeneral>
    </section>
  )
}
