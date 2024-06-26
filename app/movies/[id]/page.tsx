import { ICollectionDetails, IMovieDetails } from "@/app/interfaces/movie"
import styles from "./detailsmovie.module.scss"
import Image from "next/image"
import { BASE_URL_IMG, countryFlags } from "@/app/utils/const"
import { ConvertMinutesToHours } from "@/app/utils/helpers"
import { DateIcon, StarIcon, TimeIcon, TrilerIcon } from "@/app/utils/svg"
import { ICredits } from "@/app/interfaces/credits"
import { SliderCrew } from "./components/SliderCrew/SliderCrew"
import { MovieSlider } from "@/app/components/MovieSlider/MovieSlider"
import { IMovieResponse, IRecommendationResponse } from "@/app/interfaces/responses"
import { GetCollectionsDetails, GetCredits, GetMovieDetails, GetRecommendations } from "@/app/services/fetchData"
import { Crew } from "@/app/components/Crew/Crew"

export default async function Page(params: { params: { id: string }, searchParams: {} }) {

    const data: IMovieDetails = await GetMovieDetails(params.params.id)

    const credits: ICredits = await GetCredits(params.params.id)

    const collections: ICollectionDetails = await GetCollectionsDetails(data?.belongs_to_collection?.id.toString())

    const recommendation: IRecommendationResponse = await GetRecommendations(params.params.id)

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <article className={styles.movie}>
                <Image className={styles.movie_image} src={BASE_URL_IMG.concat(data.backdrop_path)} alt={`Imagen de fondo de ${data.title}`} width={1150} height={700} />
                <div className={styles.movie_shadow}></div>
                <div className={styles.movie_header}>
                    <h2 className={styles.movie_title}>{data.title}</h2>
                    <h3 className={styles.movie_subtitle}>{`(${data.original_title})`}</h3>
                    <div className={styles.movie_country}>
                        <Image className={styles.movie_countryFlag} src={countryFlags.find(country => country.code === data.origin_country[0])?.flag || ""} width={26} height={16} alt="" />
                        <span className={styles.movie_countryName}>{countryFlags.find(country => country.code === data.origin_country[0])?.country}</span>
                    </div>
                </div>
                <div className={styles.movie_details}>
                    <Image className={styles.movie_poster} src={BASE_URL_IMG.concat(data.poster_path)} alt={`Imagen de fondo de ${data.title}`} width={150} height={220} />
                    <div className={styles.movie_info} >
                        <p className={styles.movie_tagline}>{data.tagline}</p>
                        <div className={styles.movie_genres}>
                            {
                                data.genres.map(genre => (
                                    <span key={genre.id} className={styles.movie_genre}>{genre.name}</span>
                                ))
                            }
                        </div>

                        <div className={styles.movie_timeYear}>
                            <span className={styles.movie_runtime}><TimeIcon className={styles.movie_icon} />{ConvertMinutesToHours(data.runtime)}</span>
                            <p className={styles.movie_year}><DateIcon className={styles.movie_iconDate} />{new Date(data.release_date).getFullYear()}</p>
                            <span className={styles.movie_average}><StarIcon className={styles.movie_iconDate} />{data.vote_average.toFixed(1)}</span>
                        </div>
                        <button className={styles.movie_play}>
                            <TrilerIcon className={styles.movie_playIcon} />
                            <span className={styles.movie_playText}>Ver tráiler</span>
                        </button>
                    </div>
                </div>
            </article>
            <div className={styles.movie_companies}>
                {
                    data.production_companies.filter(company => company.logo_path !== null).map(company => (
                        <div className={styles.movie_company} key={company.id} >
                            <Image className={styles.movie_companyLogo} src={BASE_URL_IMG.concat(company.logo_path || "")} width={60} height={40} alt={company.name} />
                            <span className={styles.movie_companyName}>{company.name}</span>
                        </div>
                    ))
                }
            </div>
            <h4 className={styles.details_title}>SINOPSIS</h4>
            <article className={styles.details}>
                <p className={styles.details_overview}>{data.overview}</p>
            </article>
            <SliderCrew credits={credits} type="cast" title="REPARTO" />
            <Crew credits={credits} />
            <hr className="separator" />
            {collections?.parts && <MovieSlider parts={collections?.parts?.filter(movie => movie.id.toString() !== params.params.id)} title="DE LA MISMA COLECCIÓN" />}
            {recommendation.results.length > 0 && <MovieSlider parts={recommendation.results} title="RECOMENDACIONES" />}
        </section>
    )
}

/*
const data: IMovieDetails = {
    "adult": false,
    "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    "belongs_to_collection": {
        "id": 173710,
        "name": "El planeta de los simios (El origen) - Colección",
        "poster_path": "/4QUhVxQgtsUhqydkmrFob90Rtwl.jpg",
        "backdrop_path": "/2ZkvqfOJUCINozB00wmYuGJQW81.jpg"
    },
    "budget": 160000000,
    "genres": [
        {
            "id": 878,
            "name": "Ciencia ficción"
        },
        {
            "id": 12,
            "name": "Aventura"
        },
        {
            "id": 28,
            "name": "Acción"
        }
    ],
    "homepage": "",
    "id": 653346,
    "imdb_id": "tt11389872",
    "origin_country": [
        "US"
    ],
    "original_language": "en",
    "original_title": "Kingdom of the Planet of the Apes",
    "overview": "300 años después del reinado de César, un nuevo líder tiránico construye su imperio esclavizando a otros clanes de primates, un joven simio llamado Noa emprende un viaje desgarrador que lo hará cuestionar todo lo que sabía sobre el pasado y tomar decisiones que definirán el futuro tanto de simios como humanos.",
    "popularity": 3629.389,
    "poster_path": "/kkFn3KM47Qq4Wjhd8GuFfe3LX27.jpg",
    "production_companies": [
        {
            "id": 127928,
            "logo_path": "/h0rjX5vjW5r8yEnUBStFarjcLT4.png",
            "name": "20th Century Studios",
            "origin_country": "US"
        },
        {
            "id": 133024,
            "logo_path": null,
            "name": "Oddball Entertainment",
            "origin_country": "US"
        },
        {
            "id": 89254,
            "logo_path": null,
            "name": "Jason T. Reed Productions",
            "origin_country": "US"
        }
    ],
    "production_countries": [
        {
            "iso_3166_1": "US",
            "name": "United States of America"
        }
    ],
    "release_date": "2024-05-08",
    "revenue": 298000000,
    "runtime": 145,
    "spoken_languages": [],
    "status": "Released",
    "tagline": "Una nueva era comienza.",
    "title": "El planeta de los simios: Nuevo reino",
    "video": false,
    "vote_average": 7.107,
    "vote_count": 633
}

const credits: ICredits = {
    "id": 653346,
    "cast": [
        {
            "adult": false,
            "gender": 2,
            "id": 1586047,
            "known_for_department": "Acting",
            "name": "Owen Teague",
            "original_name": "Owen Teague",
            "popularity": 31.675,
            "profile_path": "/tgCkGE0LIggyjMmgSwHhpZAkfJs.jpg",
            "cast_id": 9,
            "character": "Noa",
            "credit_id": "630449a821118f007d331afa",
            "order": 0
        },
        {
            "adult": false,
            "gender": 1,
            "id": 2146942,
            "known_for_department": "Acting",
            "name": "Freya Allan",
            "original_name": "Freya Allan",
            "popularity": 60.192,
            "profile_path": "/8RuLG2mePw8YgFNUjWROBuxMrwT.jpg",
            "cast_id": 10,
            "character": "Nova / Mae",
            "credit_id": "6335d124982f74007b84e461",
            "order": 1
        },
        {
            "adult": false,
            "gender": 2,
            "id": 79072,
            "known_for_department": "Acting",
            "name": "Kevin Durand",
            "original_name": "Kevin Durand",
            "popularity": 74.716,
            "profile_path": "/hINvryvce5tpod6kTnUg9ZTH8wg.jpg",
            "cast_id": 21,
            "character": "Proximus Caesar",
            "credit_id": "633f5aec68afd6008e006926",
            "order": 2
        },
        {
            "adult": false,
            "gender": 2,
            "id": 1444816,
            "known_for_department": "Acting",
            "name": "Peter Macon",
            "original_name": "Peter Macon",
            "popularity": 28.071,
            "profile_path": "/jF4jzgtWB2NAJ6BfVTSDQOlOHLr.jpg",
            "cast_id": 11,
            "character": "Raka",
            "credit_id": "6335d18d8c22c000825bdddd",
            "order": 3
        },
        {
            "adult": false,
            "gender": 2,
            "id": 3905,
            "known_for_department": "Acting",
            "name": "William H. Macy",
            "original_name": "William H. Macy",
            "popularity": 27.933,
            "profile_path": "/hdVEGSrP8qWlJnt0v5vSVcGOjy7.jpg",
            "cast_id": 30,
            "character": "Trevathan",
            "credit_id": "63bf469705a5330094ee5a7f",
            "order": 4
        },
        {
            "adult": false,
            "gender": 2,
            "id": 966554,
            "known_for_department": "Acting",
            "name": "Eka Darville",
            "original_name": "Eka Darville",
            "popularity": 18.698,
            "profile_path": "/7tNdST92WSTGHmEJbExaRlQHWcW.jpg",
            "cast_id": 22,
            "character": "Sylva",
            "credit_id": "633f7296435011007afbd2b6",
            "order": 5
        },
        {
            "adult": false,
            "gender": 2,
            "id": 1394427,
            "known_for_department": "Acting",
            "name": "Travis Jeffery",
            "original_name": "Travis Jeffery",
            "popularity": 18.182,
            "profile_path": "/picKz6F5ZNpZeDF1oRXHpSR8V8w.jpg",
            "cast_id": 25,
            "character": "Anaya",
            "credit_id": "63588890c439c000831daeae",
            "order": 6
        },
        {
            "adult": false,
            "gender": 1,
            "id": 2435321,
            "known_for_department": "Acting",
            "name": "Lydia Peckham",
            "original_name": "Lydia Peckham",
            "popularity": 19.147,
            "profile_path": "/tcBJklZSsP2JuQIYataJHW3pJXE.jpg",
            "cast_id": 29,
            "character": "Soona",
            "credit_id": "635888b915959f0082a88903",
            "order": 7
        },
        {
            "adult": false,
            "gender": 2,
            "id": 136295,
            "known_for_department": "Acting",
            "name": "Neil Sandilands",
            "original_name": "Neil Sandilands",
            "popularity": 25.385,
            "profile_path": "/t0tWl640swPEEBd5mY51Xtekvuo.jpg",
            "cast_id": 26,
            "character": "Koro",
            "credit_id": "6358889630813100a3362f82",
            "order": 8
        },
        {
            "adult": false,
            "gender": 2,
            "id": 3757983,
            "known_for_department": "Acting",
            "name": "Ras-Samuel Welda'abzgi",
            "original_name": "Ras-Samuel Welda'abzgi",
            "popularity": 4.209,
            "profile_path": "/pZhLFFEjzbg5fEl53TgagusDGp1.jpg",
            "cast_id": 28,
            "character": "Lightning",
            "credit_id": "635888b12cefc2007d2bb060",
            "order": 9
        },
        {
            "adult": false,
            "gender": 1,
            "id": 103406,
            "known_for_department": "Acting",
            "name": "Sara Wiseman",
            "original_name": "Sara Wiseman",
            "popularity": 17.179,
            "profile_path": "/oZUbTYeLBywjNv6Ul1nZryFsffq.jpg",
            "cast_id": 27,
            "character": "Dar",
            "credit_id": "635888a22ceb530079797f15",
            "order": 10
        },
        {
            "adult": false,
            "gender": 2,
            "id": 2646671,
            "known_for_department": "Acting",
            "name": "Kaden Hartcher",
            "original_name": "Kaden Hartcher",
            "popularity": 5.53,
            "profile_path": "/4SbhcfR8yKTII0PAcNZDxczXN38.jpg",
            "cast_id": 49,
            "character": "Oda / Rust",
            "credit_id": "6647386cc0fa664adb25bbfa",
            "order": 11
        },
        {
            "adult": false,
            "gender": 2,
            "id": 78962,
            "known_for_department": "Acting",
            "name": "Andy McPhee",
            "original_name": "Andy McPhee",
            "popularity": 17.409,
            "profile_path": "/uC0QWuaaOoIcLl6f5ebkFgTyF1r.jpg",
            "cast_id": 48,
            "character": "Honored Elder",
            "credit_id": "6642c92888748c0ad6cb36c4",
            "order": 12
        },
        {
            "adult": false,
            "gender": 1,
            "id": 4472548,
            "known_for_department": "Acting",
            "name": "Nina Gallas",
            "original_name": "Nina Gallas",
            "popularity": 2.591,
            "profile_path": "/ymN3Ng8gB32DwlbWdFQqsuJeC4m.jpg",
            "cast_id": 40,
            "character": "Youngster #1",
            "credit_id": "663bc87663679ef9a0d8fbbf",
            "order": 13
        },
        {
            "adult": false,
            "gender": 2,
            "id": 2632353,
            "known_for_department": "Acting",
            "name": "Samuel Falé",
            "original_name": "Samuel Falé",
            "popularity": 1.819,
            "profile_path": "/1aZqQhJEPP2FVdFgvOJ7CLyZ7IO.jpg",
            "cast_id": 43,
            "character": "Youngster #2",
            "credit_id": "6640eb77340e9a9a7e36ecaf",
            "order": 14
        },
        {
            "adult": false,
            "gender": 1,
            "id": 94797,
            "known_for_department": "Acting",
            "name": "Dichen Lachman",
            "original_name": "Dichen Lachman",
            "popularity": 49.304,
            "profile_path": "/96RTQAmcdl16ouztMrv7T177EyC.jpg",
            "cast_id": 31,
            "character": "Korina",
            "credit_id": "63f04702a24c5000800b61ca",
            "order": 15
        },
        {
            "adult": false,
            "gender": 1,
            "id": 2637893,
            "known_for_department": "Acting",
            "name": "Virginie Laverdure",
            "original_name": "Virginie Laverdure",
            "popularity": 5.645,
            "profile_path": "/ujTTbrapu2km7ApWOIoYZn7IybZ.jpg",
            "cast_id": 58,
            "character": "Lead Tech",
            "credit_id": "664faff3ada1c928b24f8a21",
            "order": 16
        },
        {
            "adult": false,
            "gender": 2,
            "id": 166703,
            "known_for_department": "Acting",
            "name": "Markus Hamilton",
            "original_name": "Markus Hamilton",
            "popularity": 4.173,
            "profile_path": "/7AgC90kPSOZmUkBIFrCvrkXSL8G.jpg",
            "cast_id": 59,
            "character": "Tech #1",
            "credit_id": "664fb006ddcc9a3defdd494c",
            "order": 17
        },
        {
            "adult": false,
            "gender": 0,
            "id": 2128650,
            "known_for_department": "Acting",
            "name": "Benjamin Scott",
            "original_name": "Benjamin Scott",
            "popularity": 2.125,
            "profile_path": null,
            "cast_id": 60,
            "character": "Tech #2",
            "credit_id": "664fb01637bccacfa04f89a4",
            "order": 18
        },
        {
            "adult": false,
            "gender": 0,
            "id": 3085693,
            "known_for_department": "Acting",
            "name": "Nirish Bhat Surambadka",
            "original_name": "Nirish Bhat Surambadka",
            "popularity": 0.502,
            "profile_path": null,
            "cast_id": 61,
            "character": "Youngster #3",
            "credit_id": "664fb037ed4fe8930495486e",
            "order": 19
        },
        {
            "adult": false,
            "gender": 1,
            "id": 2309880,
            "known_for_department": "Acting",
            "name": "Frances Berry",
            "original_name": "Frances Berry",
            "popularity": 3.252,
            "profile_path": "/qCp0psD5qzguABpRxWmMuC04kcl.jpg",
            "cast_id": 46,
            "character": "Laika",
            "credit_id": "6642c749c2014473a3349c41",
            "order": 20
        },
        {
            "adult": false,
            "gender": 2,
            "id": 4732041,
            "known_for_department": "Acting",
            "name": "Peter Hayes",
            "original_name": "Peter Hayes",
            "popularity": 0.511,
            "profile_path": null,
            "cast_id": 62,
            "character": "Feral Human #1",
            "credit_id": "664fb07147a89ad09d859d44",
            "order": 21
        },
        {
            "adult": false,
            "gender": 1,
            "id": 1745137,
            "known_for_department": "Acting",
            "name": "Sheree da Costa",
            "original_name": "Sheree da Costa",
            "popularity": 1.582,
            "profile_path": null,
            "cast_id": 63,
            "character": "Feral Human #2",
            "credit_id": "664fb07b76e4fb6e32ec1a54",
            "order": 22
        },
        {
            "adult": false,
            "gender": 0,
            "id": 4732042,
            "known_for_department": "Acting",
            "name": "Souleymane Diasse",
            "original_name": "Souleymane Diasse",
            "popularity": 0.428,
            "profile_path": null,
            "cast_id": 64,
            "character": "Feral Human #3",
            "credit_id": "664fb0925cc84de27b9b0b93",
            "order": 23
        },
        {
            "adult": false,
            "gender": 1,
            "id": 1445877,
            "known_for_department": "Acting",
            "name": "Olga Miller",
            "original_name": "Olga Miller",
            "popularity": 7.662,
            "profile_path": "/luRnZ3knzWnoRzZAv5x3wH0MJpr.jpg",
            "cast_id": 44,
            "character": "Feral Human #4",
            "credit_id": "6642c6d5683cbc9c7835b08b",
            "order": 24
        },
        {
            "adult": false,
            "gender": 2,
            "id": 581170,
            "known_for_department": "Acting",
            "name": "Дмитрий Миллер",
            "original_name": "Дмитрий Миллер",
            "popularity": 4.074,
            "profile_path": "/wuQSGEO26fJkIKGKaIxwd9dPIRZ.jpg",
            "cast_id": 45,
            "character": "Feral Human #5",
            "credit_id": "6642c6efb82ef8698d356705",
            "order": 25
        },
        {
            "adult": false,
            "gender": 1,
            "id": 4732043,
            "known_for_department": "Acting",
            "name": "Anastasia Miller",
            "original_name": "Anastasia Miller",
            "popularity": 0.428,
            "profile_path": null,
            "cast_id": 65,
            "character": "Feral Human #6",
            "credit_id": "664fb122a647645f51ec1f32",
            "order": 26
        },
        {
            "adult": false,
            "gender": 0,
            "id": 4732044,
            "known_for_department": "Acting",
            "name": "Michael Spudic",
            "original_name": "Michael Spudic",
            "popularity": 0.685,
            "profile_path": null,
            "cast_id": 66,
            "character": "Tech #3",
            "credit_id": "664fb140fd717346b4dd4cf5",
            "order": 27
        },
        {
            "adult": false,
            "gender": 1,
            "id": 58395,
            "known_for_department": "Acting",
            "name": "Karin Konoval",
            "original_name": "Karin Konoval",
            "popularity": 16.638,
            "profile_path": "/5e8YyNQjWre2UbExYBlJ7zva934.jpg",
            "cast_id": 41,
            "character": "Maurice (uncredited)",
            "credit_id": "663ce4273042f35be3fa6d42",
            "order": 28
        }
    ],
    "crew": [
        {
            "adult": false,
            "gender": 2,
            "id": 1179066,
            "known_for_department": "Directing",
            "name": "Wes Ball",
            "original_name": "Wes Ball",
            "popularity": 21.136,
            "profile_path": "/zVPXrhuAxYAWlwDEWCaqeUPycFx.jpg",
            "credit_id": "5de6f63611386c001354710d",
            "department": "Directing",
            "job": "Director"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 91161,
            "known_for_department": "Production",
            "name": "Joe Hartwick Jr.",
            "original_name": "Joe Hartwick Jr.",
            "popularity": 5.94,
            "profile_path": null,
            "credit_id": "5de6f6f0cf4b8b00112791a3",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 266920,
            "known_for_department": "Production",
            "name": "Peter Chernin",
            "original_name": "Peter Chernin",
            "popularity": 5.463,
            "profile_path": "/6c7tilaP8n2bYJB0H6BZyEkd64k.jpg",
            "credit_id": "5e22a3288f26bc0015758ec5",
            "department": "Production",
            "job": "Executive Producer"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 67802,
            "known_for_department": "Writing",
            "name": "Rick Jaffa",
            "original_name": "Rick Jaffa",
            "popularity": 12.835,
            "profile_path": "/iki2KpmMFhLIdq3pvHhq7tit8Q1.jpg",
            "credit_id": "6335d2a6cca7de007cd8f9b6",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 67803,
            "known_for_department": "Writing",
            "name": "Amanda Silver",
            "original_name": "Amanda Silver",
            "popularity": 19.66,
            "profile_path": "/j26E4ifZClUceVocOmDG9sWm7uP.jpg",
            "credit_id": "6335d2b6982f740080418fb5",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 100186,
            "known_for_department": "Production",
            "name": "Jason Reed",
            "original_name": "Jason Reed",
            "popularity": 3.184,
            "profile_path": null,
            "credit_id": "6335d2cb982f7400836afa00",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 36427,
            "known_for_department": "Production",
            "name": "Jenno Topping",
            "original_name": "Jenno Topping",
            "popularity": 6.546,
            "profile_path": "/tOti87QZZwyBp1iujzPTib9AwuU.jpg",
            "credit_id": "6335d2e02cde98007e413932",
            "department": "Production",
            "job": "Executive Producer"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 19291,
            "known_for_department": "Art",
            "name": "Daniel T. Dorrance",
            "original_name": "Daniel T. Dorrance",
            "popularity": 5.284,
            "profile_path": null,
            "credit_id": "6335ded9fa78cd007cff3ecb",
            "department": "Art",
            "job": "Production Design"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 30459,
            "known_for_department": "Camera",
            "name": "Pados Gyula",
            "original_name": "Pados Gyula",
            "popularity": 13.307,
            "profile_path": null,
            "credit_id": "63369d6bf8e982007c69efe8",
            "department": "Camera",
            "job": "Director of Photography"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 6043,
            "known_for_department": "Editing",
            "name": "Dan Zimmerman",
            "original_name": "Dan Zimmerman",
            "popularity": 8.54,
            "profile_path": null,
            "credit_id": "634526972dffd8007a395a7b",
            "department": "Editing",
            "job": "Editor"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 17675,
            "known_for_department": "Costume & Make-Up",
            "name": "Mayes C. Rubeo",
            "original_name": "Mayes C. Rubeo",
            "popularity": 2.62,
            "profile_path": "/zq3OHlYKVGPQd1gbojz3xY6t5pT.jpg",
            "credit_id": "6345272007e2810082f117d2",
            "department": "Costume & Make-Up",
            "job": "Costume Design"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 67802,
            "known_for_department": "Writing",
            "name": "Rick Jaffa",
            "original_name": "Rick Jaffa",
            "popularity": 12.835,
            "profile_path": "/iki2KpmMFhLIdq3pvHhq7tit8Q1.jpg",
            "credit_id": "6544c03bfd4f80013ce7df7e",
            "department": "Writing",
            "job": "Characters"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 67803,
            "known_for_department": "Writing",
            "name": "Amanda Silver",
            "original_name": "Amanda Silver",
            "popularity": 19.66,
            "profile_path": "/j26E4ifZClUceVocOmDG9sWm7uP.jpg",
            "credit_id": "6544c041fd4f80011ed002e5",
            "department": "Writing",
            "job": "Characters"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 1179066,
            "known_for_department": "Directing",
            "name": "Wes Ball",
            "original_name": "Wes Ball",
            "popularity": 21.136,
            "profile_path": "/zVPXrhuAxYAWlwDEWCaqeUPycFx.jpg",
            "credit_id": "6544c05b9cc67b00df925d7d",
            "department": "Production",
            "job": "Producer"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 1418397,
            "known_for_department": "Visual Effects",
            "name": "Erik Winquist",
            "original_name": "Erik Winquist",
            "popularity": 4.008,
            "profile_path": null,
            "credit_id": "6614bf94d18b24017c34da58",
            "department": "Visual Effects",
            "job": "Visual Effects Supervisor"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 77949,
            "known_for_department": "Sound",
            "name": "John Paesano",
            "original_name": "John Paesano",
            "popularity": 14.946,
            "profile_path": "/pHQM6fGdewxwoqzTEMmHonX4KFz.jpg",
            "credit_id": "6614bfa233a533017d8699eb",
            "department": "Sound",
            "job": "Original Music Composer"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 71148,
            "known_for_department": "Editing",
            "name": "Dirk Westervelt",
            "original_name": "Dirk Westervelt",
            "popularity": 2.069,
            "profile_path": null,
            "credit_id": "6614bfbe982f74017e60e079",
            "department": "Editing",
            "job": "Editor"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 507,
            "known_for_department": "Writing",
            "name": "Josh Friedman",
            "original_name": "Josh Friedman",
            "popularity": 18.305,
            "profile_path": "/8zhRXGngBrijgBE3SDXxeOfbaOO.jpg",
            "credit_id": "6614c003e10f46016339a264",
            "department": "Writing",
            "job": "Writer"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 1399313,
            "known_for_department": "Visual Effects",
            "name": "Julia Neighly",
            "original_name": "Julia Neighly",
            "popularity": 8.548,
            "profile_path": null,
            "credit_id": "664faed786f4b9ecd14f893b",
            "department": "Visual Effects",
            "job": "Visual Effects Producer"
        },
        {
            "adult": false,
            "gender": 0,
            "id": 1662726,
            "known_for_department": "Visual Effects",
            "name": "Patrick Neighly",
            "original_name": "Patrick Neighly",
            "popularity": 1.795,
            "profile_path": null,
            "credit_id": "664faee037bccacfa04f897e",
            "department": "Visual Effects",
            "job": "Visual Effects Producer"
        },
        {
            "adult": false,
            "gender": 1,
            "id": 495,
            "known_for_department": "Production",
            "name": "Debra Zane",
            "original_name": "Debra Zane",
            "popularity": 5.662,
            "profile_path": "/wiJJU7vSHNsW5HFkz2WX38Wg5xH.jpg",
            "credit_id": "664faf1ff38ca42077caf5b8",
            "department": "Production",
            "job": "Casting"
        },
        {
            "adult": false,
            "gender": 2,
            "id": 1660711,
            "known_for_department": "Production",
            "name": "Dylan Jury",
            "original_name": "Dylan Jury",
            "popularity": 7.58,
            "profile_path": "/qLiWkJ8jQh3yHkQ8eERSbxmB9OH.jpg",
            "credit_id": "664faf257d97c9231a9b0970",
            "department": "Production",
            "job": "Casting"
        },
        {
            "adult": false,
            "gender": 0,
            "id": 1412734,
            "known_for_department": "Production",
            "name": "Jennifer Cornwell",
            "original_name": "Jennifer Cornwell",
            "popularity": 3.039,
            "profile_path": null,
            "credit_id": "664faf6f8e516f0b7aec21ba",
            "department": "Production",
            "job": "Unit Production Manager"
        },
        {
            "adult": false,
            "gender": 0,
            "id": 2045537,
            "known_for_department": "Directing",
            "name": "Justin Muller",
            "original_name": "Justin Muller",
            "popularity": 4.994,
            "profile_path": null,
            "credit_id": "664faf7bb94d4acdcd4f8a7d",
            "department": "Directing",
            "job": "First Assistant Director"
        },
        {
            "adult": false,
            "gender": 0,
            "id": 86599,
            "known_for_department": "Directing",
            "name": "Jon Mallard",
            "original_name": "Jon Mallard",
            "popularity": 3.303,
            "profile_path": null,
            "credit_id": "664faf8248791d4e2d859cff",
            "department": "Directing",
            "job": "First Assistant Director"
        },
        {
            "adult": false,
            "gender": 0,
            "id": 1401734,
            "known_for_department": "Crew",
            "name": "Glenn Suter",
            "original_name": "Glenn Suter",
            "popularity": 5.229,
            "profile_path": null,
            "credit_id": "664faf8aa91c2b970add4f15",
            "department": "Crew",
            "job": "Stunt Coordinator"
        }
    ]
}

const collections: ICollectionDetails = {
    "id": 173710,
    "name": "El planeta de los simios (El origen) - Colección",
    "overview": "Escrito por Rick Jaffa y Amanda Silver, es el reinicio de la serie de 20th Century Fox. La saga tiene la intención de actuar como una historia de origen, presenta un mundo donde los simios inteligentes luchan por la supremacía contra la humanidad mientras intentan sobrevivir en un mundo postapocalíptico. La serie explora temas de identidad, moralidad y el destino de la humanidad a través de emocionantes conflictos y relaciones entre humanos y simios.",
    "poster_path": "/4QUhVxQgtsUhqydkmrFob90Rtwl.jpg",
    "backdrop_path": "/2ZkvqfOJUCINozB00wmYuGJQW81.jpg",
    "parts": [
        {
            "backdrop_path": "/dENLz9Np9EV5Ro8UIBhbKC8BmSS.jpg",
            "id": 61791,
            "original_title": "Rise of the Planet of the Apes",
            "overview": "Precuela del ya mítico largometraje \"El planeta de los simios\". Will Rodman (James Franco) es un joven científico que está investigando con monos para obtener un tratamiento contra el alzheimer, una enfermedad que afecta a su padre (John Lithgow). Uno de esos primates, al que llaman César (Andy Serkis), experimenta una evolución en su inteligencia tan notable que el protagonista decide llevárselo a su casa para protegerlo. Le ayudará una bella primatóloga llamada Caroline (Freida Pinto).",
            "poster_path": "/kyCXO8lTKs62V5A4IsdNLjvskWM.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "El planeta de los simios: (R)Evolución",
            "original_language": "en",
            "genre_ids": [
                53,
                28,
                18,
                878
            ],
            "popularity": 213.922,
            "release_date": "2011-08-03",
            "video": false,
            "vote_average": 7.319,
            "vote_count": 11484
        },
        {
            "backdrop_path": "/4TFCA5Lm5miseV3Wy02yxurEQL9.jpg",
            "id": 119450,
            "original_title": "Dawn of the Planet of the Apes",
            "overview": "Un grupo de científicos en San Francisco luchan por mantenerse vivos después de una plaga que está limpiando a la humanidad, mientras que César trata de mantener el dominio sobre su comunidad de monos inteligentes.",
            "poster_path": "/qNu2N4a9nuGWgkeg3NzdRTDOz5N.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "El planeta de los simios: Confrontación",
            "original_language": "en",
            "genre_ids": [
                878,
                28,
                18,
                53
            ],
            "popularity": 281.031,
            "release_date": "2014-07-08",
            "video": false,
            "vote_average": 7.324,
            "vote_count": 10993
        },
        {
            "backdrop_path": "/ulMscezy9YX0bhknvJbZoUgQxO5.jpg",
            "id": 281338,
            "original_title": "War for the Planet of the Apes",
            "overview": "Después de que los simios sufren pérdidas inimaginables, César lucha con sus oscuros instintos y comienza su propia búsqueda mítica para vengar a los de su especie.",
            "poster_path": "/4s51V3REPzdABoEDLC4TPDPkY3b.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "El planeta de los simios: La guerra",
            "original_language": "en",
            "genre_ids": [
                18,
                878,
                10752
            ],
            "popularity": 269.965,
            "release_date": "2017-07-11",
            "video": false,
            "vote_average": 7.195,
            "vote_count": 8630
        },
        {
            "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
            "id": 653346,
            "original_title": "Kingdom of the Planet of the Apes",
            "overview": "300 años después del reinado de César, un nuevo líder tiránico construye su imperio esclavizando a otros clanes de primates, un joven simio llamado Noa emprende un viaje desgarrador que lo hará cuestionar todo lo que sabía sobre el pasado y tomar decisiones que definirán el futuro tanto de simios como humanos.",
            "poster_path": "/kkFn3KM47Qq4Wjhd8GuFfe3LX27.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "El planeta de los simios: Nuevo reino",
            "original_language": "en",
            "genre_ids": [
                878,
                12,
                28
            ],
            "popularity": 5313.091,
            "release_date": "2024-05-08",
            "video": false,
            "vote_average": 6.924,
            "vote_count": 805
        }
    ]
}

const recommendation: IRecommendationResponse = {
    "page": 1,
    "results": [
        {
            "backdrop_path": "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
            "id": 929590,
            "original_title": "Civil War",
            "overview": "En un futuro cercano, un grupo de periodistas de guerra intenta sobrevivir mientras informan la verdad mientras Estados Unidos se encuentra al borde de una guerra civil.",
            "poster_path": "/iCOQUVVaPqRuR3JqF71akguf6Mj.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Guerra Civil",
            "original_language": "en",
            "genre_ids": [
                10752,
                28,
                18
            ],
            "popularity": 2418.019,
            "release_date": "2024-04-10",
            "video": false,
            "vote_average": 7.082,
            "vote_count": 1304
        },
        {
            "backdrop_path": "/shrwC6U8Bkst9T9J7fr1A50n6x6.jpg",
            "id": 786892,
            "original_title": "Furiosa: A Mad Max Saga",
            "overview": "Mientras el mundo se derrumba, la joven Furiosa es secuestrada del Lugar Verde de Muchas Madres y cae en manos de una Horda de Motociclistas liderada por el Señor de la Guerra Dementus. Recorriendo la tierra baldía llega a la Ciudadela, presidida por Inmortan Joe. Mientras los dos tiranos luchan por el dominio de la zona, Furiosa deberá sobrevivir a muchas pruebas buscando volver a casa",
            "poster_path": "/txUUoowOD2MrGXAtI3pWifLR9p6.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Furiosa: De la Saga Mad Max",
            "original_language": "en",
            "genre_ids": [
                28,
                12,
                878
            ],
            "popularity": 817.398,
            "release_date": "2024-05-22",
            "video": false,
            "vote_average": 7.69,
            "vote_count": 727
        },
        {
            "backdrop_path": "/xRd1eJIDe7JHO5u4gtEYwGn5wtf.jpg",
            "id": 823464,
            "original_title": "Godzilla x Kong: The New Empire",
            "overview": "Una aventura cinematográfica completamente nueva, que enfrentará al todopoderoso Kong y al temible Godzilla contra una colosal amenaza desconocida escondida dentro de nuestro mundo. La nueva y épica película profundizará en las historias de estos titanes, sus orígenes y los misterios de Isla Calavera y más allá, mientras descubre la batalla mítica que ayudó a forjar a estos seres extraordinarios y los unió a la humanidad para siempre.",
            "poster_path": "/2YqZ6IyFk7menirwziJvfoVvSOh.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Godzilla y Kong: El nuevo imperio",
            "original_language": "en",
            "genre_ids": [
                878,
                28,
                12
            ],
            "popularity": 1931.335,
            "release_date": "2024-03-27",
            "video": false,
            "vote_average": 7.236,
            "vote_count": 2527
        },
        {
            "backdrop_path": "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
            "id": 746036,
            "original_title": "The Fall Guy",
            "overview": "Un especialista maltratado y pasado de su mejor momento se encuentra de nuevo en una película con la estrella para la que fue su doble hace mucho tiempo y que lo reemplazó. El problema, sin embargo, es que la estrella ha desaparecido.",
            "poster_path": "/ceiGl0SNZpR01o5lfYImt2QgKuq.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Profesión peligro",
            "original_language": "en",
            "genre_ids": [
                28,
                35
            ],
            "popularity": 1045.932,
            "release_date": "2024-04-24",
            "video": false,
            "vote_average": 7.28,
            "vote_count": 1036
        },
        {
            "backdrop_path": "/iafs5DG5fGq7ef0acl3xlX4BFrs.jpg",
            "id": 1219685,
            "original_title": "Un père idéal",
            "overview": "",
            "poster_path": "/4xJd3uwtL1vCuZgEfEc8JXI9Uyx.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Un père idéal",
            "original_language": "fr",
            "genre_ids": [
                18,
                10770
            ],
            "popularity": 569.267,
            "release_date": "2024-04-21",
            "video": false,
            "vote_average": 5.695,
            "vote_count": 41
        },
        {
            "backdrop_path": "/v1oDFDwa0wMELupPgyOEWGvNCRj.jpg",
            "id": 1152014,
            "original_title": "Un p’tit truc en plus",
            "overview": "To escape the police, a father and his son are forced to find refuge in a summer camp for young adults with mental disabilities, taking on the role of an educator and a boarder. The beginning of troubles and a wonderful human experience that will change them forever.",
            "poster_path": "/aBaJeCMgLJac6bHFCdHWcY8sFOc.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "A Little Something Extra",
            "original_language": "fr",
            "genre_ids": [
                35
            ],
            "popularity": 17.493,
            "release_date": "2024-04-18",
            "video": false,
            "vote_average": 7.741,
            "vote_count": 162
        },
        {
            "backdrop_path": "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
            "id": 614933,
            "original_title": "Atlas",
            "overview": "Una analista antiterrorista que no confía en la inteligencia artificial descubre que esta puede ser su única esperanza cuando una misión para capturar a un robot rebelde sale mal.",
            "poster_path": "/wSnBSv7oHgm1kZmiM8IqithlTmJ.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Atlas",
            "original_language": "en",
            "genre_ids": [
                878,
                28
            ],
            "popularity": 1438.874,
            "release_date": "2024-05-23",
            "video": false,
            "vote_average": 6.723,
            "vote_count": 607
        },
        {
            "backdrop_path": "/ySgY4jBvZ6qchrxKnBg4M8tZp8V.jpg",
            "id": 1111873,
            "original_title": "Abigail",
            "overview": "Después de que un grupo de delincuentes secuestra a la hija de 12 años de un poderoso personaje del bajo mundo, todo lo que tienen que hacer para cobrar un rescate de 50 millones de dólares es vigilar a la niña durante la noche.",
            "poster_path": "/6swWpho5jKxMIez9diNJm0Kqhj.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Abigail",
            "original_language": "en",
            "genre_ids": [
                27,
                53
            ],
            "popularity": 300.796,
            "release_date": "2024-04-18",
            "video": false,
            "vote_average": 6.813,
            "vote_count": 663
        },
        {
            "backdrop_path": "/a1m4DAmySexNaaGnjEVA2MKNUCo.jpg",
            "id": 998846,
            "original_title": "Back to Black",
            "overview": "Biopic que narrará la vida personal y profesional de la cantante y compositora Amy Winehouse, que comenzó como cantante de jazz para convertirse en una superestrella mundial de la música ganadora de varios premios Grammy. Su vida se truncó en 2011 a los 27 años provocada por una vida llena de consumo y abuso de alcohol y drogas.",
            "poster_path": "/hdp1l2kJ0iYxZPykWRiod6O30FX.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Back to Black",
            "original_language": "en",
            "genre_ids": [
                36,
                18,
                10402
            ],
            "popularity": 172.818,
            "release_date": "2024-04-11",
            "video": false,
            "vote_average": 6.743,
            "vote_count": 185
        },
        {
            "backdrop_path": "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
            "id": 719221,
            "original_title": "Tarot",
            "overview": "Cuando un grupo de amigos viola imprudentemente la regla sagrada de las lecturas de Tarot -nunca usar la baraja de otra persona-, desatan sin saberlo un mal innombrable atrapado en las cartas malditas. Uno a uno, se enfrentan cara a cara con el destino y terminan en una carrera contra la muerte para escapar del futuro predicho en sus lecturas.",
            "poster_path": "/Adh7xmtgSIUGZBaMj9VLTmq2G8z.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Tarot de la muerte",
            "original_language": "en",
            "genre_ids": [
                27,
                53
            ],
            "popularity": 1540.535,
            "release_date": "2024-05-01",
            "video": false,
            "vote_average": 6.516,
            "vote_count": 346
        },
        {
            "backdrop_path": "/fY3lD0jM5AoHJMunjGWqJ0hRteI.jpg",
            "id": 940721,
            "original_title": "ゴジラ-1.0",
            "overview": "En el Japón de la posguerra surge un nuevo terror. ¿Podrán sobrevivir las personas devastadas... y mucho menos defenderse?",
            "poster_path": "/q35kdC8ci9Fm2gVQazJdsohtGpD.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Godzilla: Minus One",
            "original_language": "ja",
            "genre_ids": [
                878,
                27,
                28
            ],
            "popularity": 862.771,
            "release_date": "2023-11-03",
            "video": false,
            "vote_average": 7.649,
            "vote_count": 1491
        },
        {
            "backdrop_path": "/wODqakS0jinTUECNS6n4VomQbew.jpg",
            "id": 967847,
            "original_title": "Ghostbusters: Frozen Empire",
            "overview": "La familia Spengler regresa al lugar donde empezó todo, la icónica estación de bomberos de la ciudad de Nueva York, para formar equipo con los Cazafantasmas originales, quienes han desarrollado un laboratorio de investigación ultrasecreto para llevar la caza de fantasmas al siguiente nivel. Pero cuando el descubrimiento de un antiguo artefacto desata una fuerza maligna, los Cazafantasmas nuevos y antiguos deben unir fuerzas para proteger su hogar y salvar al mundo de una segunda Edad de Hielo.",
            "poster_path": "/fIUqk6Pjo3uf5RiOGT19KQ53ekq.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Ghostbusters: Apocalipsis fantasma",
            "original_language": "en",
            "genre_ids": [
                14,
                12,
                35
            ],
            "popularity": 346.458,
            "release_date": "2024-03-20",
            "video": false,
            "vote_average": 6.7,
            "vote_count": 938
        },
        {
            "backdrop_path": "/nxxCPRGTzxUH8SFMrIsvMmdxHti.jpg",
            "id": 639720,
            "original_title": "IF",
            "overview": "Una joven descubre la capacidad de ver a los amigos imaginarios de las personas que han sido abandonados por los niños a los que ayudaron.",
            "poster_path": "/8RgGuC7w8JxhykauzTC4bwha1J8.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Amigos imaginarios",
            "original_language": "en",
            "genre_ids": [
                35,
                14,
                10751
            ],
            "popularity": 267.719,
            "release_date": "2024-05-08",
            "video": false,
            "vote_average": 7.073,
            "vote_count": 116
        },
        {
            "backdrop_path": "/vWzJDjLPmycnQ42IppEjMpIhrhc.jpg",
            "id": 748783,
            "original_title": "The Garfield Movie",
            "overview": "Garfield, el famoso gato que odia los lunes y es amante de la lasaña, está a punto de vivir una salvaje aventura al aire libre. Tras un inesperado reencuentro con su padre, el desaliñado gato callejero Vic, Garfield y su amigo canino Odie se ven obligados a abandonar su mimada vida para unirse a Vic en un divertidísimo atraco de alto riesgo.",
            "poster_path": "/6QR2FOCQr41gSduN70WulRIhJb7.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Garfield: Fuera de Casa",
            "original_language": "en",
            "genre_ids": [
                16,
                35,
                10751,
                12
            ],
            "popularity": 535.881,
            "release_date": "2024-04-30",
            "video": false,
            "vote_average": 6.5,
            "vote_count": 144
        },
        {
            "backdrop_path": "/gmJOXle5QeOOVFEYOVBOkmIJUWV.jpg",
            "id": 871,
            "original_title": "Planet of the Apes",
            "overview": "Una tripulación de astronautas se estrelló en un planeta en un futuro lejano donde los simios parlantes inteligentes son la especie dominante, y los humanos son los oprimidos y esclavos.",
            "poster_path": "/6tZTnv7dGQrTdgZrTgvlVDy9WmN.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "El planeta de los simios",
            "original_language": "en",
            "genre_ids": [
                878,
                12,
                18,
                28
            ],
            "popularity": 112.971,
            "release_date": "1968-02-07",
            "video": false,
            "vote_average": 7.655,
            "vote_count": 3387
        },
        {
            "backdrop_path": "/67mFBCiWIOVl2AhCJgmOkx2QT3M.jpg",
            "id": 1161108,
            "original_title": "Le deuxième acte",
            "overview": "Florence wants to introduce David, the man she’s madly in love with, to her father Guillaume. But David isn’t attracted to Florence and wants to throw her into the arms of his friend Willy. The four characters meet in a restaurant in the middle of nowhere.",
            "poster_path": "/fGJoyloMr5V0TEksBHxmQ8VthcZ.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "The Second Act",
            "original_language": "fr",
            "genre_ids": [
                35
            ],
            "popularity": 10.004,
            "release_date": "2024-05-14",
            "video": false,
            "vote_average": 6.322,
            "vote_count": 87
        },
        {
            "backdrop_path": "/rmNlWyez5cniGtXkgixG1ezdqVk.jpg",
            "id": 1093995,
            "original_title": "Chief of Station",
            "overview": "Tras enterarse de que la muerte de su esposa no fue un accidente, un exjefe de la CIA se ve obligado a regresar al inframundo del espionaje y se une a un adversario para desentrañar una conspiración que desafía todo lo que creía saber.",
            "poster_path": "/uuA01PTtPombRPvL9dvsBqOBJWm.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Chief of Station",
            "original_language": "en",
            "genre_ids": [
                28,
                53
            ],
            "popularity": 339.454,
            "release_date": "2024-05-02",
            "video": false,
            "vote_average": 5.352,
            "vote_count": 44
        },
        {
            "backdrop_path": "/k37Ccgu05Am1xxgN5GaW0HX9Kkl.jpg",
            "id": 1087388,
            "original_title": "Sting",
            "overview": "La cinta australiana dirigida por Kiah Roache-Turner nos cuenta la historia de una niña que acoge a una araña que poco a poco va adquiriendo dimensiones monstruosas hasta comenzar a desatar el pánico en su edificio.",
            "poster_path": "/zuSAZIG1PSrxFwPeAlGtg9LTwxo.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Sting: Araña Asesina",
            "original_language": "en",
            "genre_ids": [
                27,
                53
            ],
            "popularity": 310.653,
            "release_date": "2024-04-12",
            "video": false,
            "vote_average": 6.35,
            "vote_count": 110
        },
        {
            "backdrop_path": "/lA6KdSkCTxwzvqzPqxch997RabQ.jpg",
            "id": 560016,
            "original_title": "Monkey Man",
            "overview": "Kid, un joven anónimo que se gana la vida a duras penas en un club de lucha clandestino donde, noche tras noche, con una máscara de gorila, es golpeado hasta sangrar por luchadores más populares a cambio de dinero. Después de años de ira reprimida, Kid descubre una manera de infiltrarse en el enclave de la siniestra élite de la ciudad. A medida que el trauma de su infancia se desborda, sus manos misteriosamente llenas de cicatrices desataron una explosiva campaña de represalia para ajustar cuentas con los hombres que le quitaron todo.",
            "poster_path": "/kJhQfICVsZGeYGGRudgcqiD1zQY.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Monkey Man: El Despertar De La Bestia",
            "original_language": "en",
            "genre_ids": [
                28,
                53
            ],
            "popularity": 100.351,
            "release_date": "2024-04-03",
            "video": false,
            "vote_average": 7.086,
            "vote_count": 479
        },
        {
            "backdrop_path": "/9s9o9RT9Yj6nDuRJjnJm78WFoFl.jpg",
            "id": 1051896,
            "original_title": "Arcadian",
            "overview": "En un futuro próximo, la vida normal en la Tierra ha sido diezmada. Paul y sus dos hijos, Thomas y Joseph, llevan una vida a medias: tranquilidad de día y tormento de noche. Cada noche, tras la puesta de sol, se enfrentan a los implacables ataques de un mal misterioso y violento.",
            "poster_path": "/spWV1eRzlDxvai8LbxwAWR0Vst4.jpg",
            "media_type": "movie",
            "adult": false,
            "title": "Arcadian",
            "original_language": "en",
            "genre_ids": [
                878,
                53,
                27
            ],
            "popularity": 61.987,
            "release_date": "2024-04-12",
            "video": false,
            "vote_average": 6.162,
            "vote_count": 170
        }
    ],
    "total_pages": 2,
    "total_results": 40
}
*/