import { ICollectionDetails, IMovieDetails } from "@/app/interfaces/movie"
import styles from "./detailsmovie.module.scss"
import Image from "next/image"
import { BASE_URL_IMG, countryFlags } from "@/app/utils/const"
import { ConvertMinutesToHours } from "@/app/utils/helpers"
import { DateIcon, StarIcon, TimeIcon, TrilerIcon } from "@/app/utils/svg"
import { SliderCrew } from "./components/SliderCrew/SliderCrew"
import { MovieSlider } from "@/app/components/MovieSlider/MovieSlider"
import { GetCollectionsDetails, GetMovieDetails, GetMovieImages } from "@/app/services/fetchData"
import { Crew } from "@/app/components/Crew/Crew"
import { NotResults } from "@/app/components/NotResults/NotResults"
import { IImages } from "@/app/interfaces/image"
import { SectionImages } from "./components/SectionImages/SectionImages"
import { SectionTags } from "./components/SectionTags/SectionTags"
import { Button } from "@/app/components/Button/Button"
import { FavoriteButton } from "@/app/components/FavoriteButton/FavoriteButton"

export default async function Page(params: { params: { id: string }, searchParams: {} }) {

    const data: IMovieDetails | null = await GetMovieDetails(params.params.id)

    //const credits: ICredits | null = await GetCredits(params.params.id)

    const collections: ICollectionDetails | null = await GetCollectionsDetails(data?.belongs_to_collection?.id.toString() || "")

    //const recommendation: IRecommendationResponse | null = await GetRecommendations(params.params.id)

    const images: IImages | null = await GetMovieImages(params.params.id)

    //const keywords: IKeywords | null = await GetMovieKeywords(params.params.id)

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            {data ?
                <>
                    <article className={styles.movie}>
                        <Image className={styles.movie_image} overrideSrc="/not_photo.png" src={BASE_URL_IMG.concat(data.backdrop_path || "")} alt={`Imagen de fondo de ${data.title}`} width={1150} height={700} />
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
                            <Image className={styles.movie_poster} src={BASE_URL_IMG.concat(data.poster_path || "")} alt={`Imagen de fondo de ${data.title}`} width={150} height={220} />
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
                                <div className={styles.movie_buttons}>
                                    <Button className={styles.movie_play} mode="button" text="Ver tráiler" icon={<TrilerIcon />} />
                                    <FavoriteButton id={data.id} title={data.title} type="movie" />
                                </div>
                            </div>
                        </div>
                    </article>
                    <div className={styles.movie_companies}>
                        {
                            data.production_companies.filter(company => company.logo_path !== null).map(company => (
                                <div className={styles.movie_company} key={company.id} >
                                    <Image className={styles.movie_companyLogo} src={BASE_URL_IMG.concat(company.logo_path || "")} width={60} height={30} alt={company.name} />
                                    <span className={styles.movie_companyName}>{company.name}</span>
                                </div>
                            ))
                        }
                    </div>
                    {images && <SectionImages images={images} id={data.id} />}
                    {data.keywords && <SectionTags keywords={data.keywords} />}
                    <h4 className={styles.details_title}>SINOPSIS</h4>
                    <article className={styles.details}>
                        <p className={styles.details_overview}>{data.overview}</p>
                    </article>
                    {data.credits && <SliderCrew credits={data.credits} type="cast" title="REPARTO" />}
                    {data.credits && <Crew credits={data.credits} />}
                    <hr className="separator" />
                    {(collections && collections?.parts) && <MovieSlider parts={collections?.parts?.filter(movie => movie.id.toString() !== params.params.id)} title="DE LA MISMA COLECCIÓN" />}
                    {(data.recommendations && data.recommendations.results.length > 0) && <MovieSlider parts={data.recommendations.results} title="RECOMENDACIONES" />}
                </>
                :
                <NotResults id={params.params.id} type="movie" />
            }
        </section>
    )
}


/*
    const data: IMovieDetails | null = {
        "adult": false,
        "backdrop_path": "/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",
        "belongs_to_collection": {
            "id": 14890,
            "name": "Bad Boys Collection",
            "poster_path": "/iB59poJBofg1ciKlu6LzZakf11m.jpg",
            "backdrop_path": "/k9hhSHg5GS4UgWQC6MHBOZrarji.jpg"
        },
        "budget": 100000000,
        "genres": [
            {
                "id": 28,
                "name": "Action"
            },
            {
                "id": 80,
                "name": "Crime"
            },
            {
                "id": 53,
                "name": "Thriller"
            },
            {
                "id": 35,
                "name": "Comedy"
            }
        ],
        "homepage": "https://www.badboys.movie",
        "id": 573435,
        "imdb_id": "tt4919268",
        "origin_country": [
            "US"
        ],
        "original_language": "en",
        "original_title": "Bad Boys: Ride or Die",
        "overview": "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
        "popularity": 1715.076,
        "poster_path": "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
        "production_companies": [
            {
                "id": 122771,
                "logo_path": "/bYRqVEAuaC1QWmt3hGo0PMdK7EX.png",
                "name": "Westbrook Studios",
                "origin_country": "US"
            },
            {
                "id": 5,
                "logo_path": "/71BqEFAF4V3qjjMPCpLuyJFB9A.png",
                "name": "Columbia Pictures",
                "origin_country": "US"
            },
            {
                "id": 10288,
                "logo_path": "/Aszf09kIVXR6cwG9lwjZIawbYVS.png",
                "name": "Don Simpson/Jerry Bruckheimer Films",
                "origin_country": "US"
            }
        ],
        "production_countries": [
            {
                "iso_3166_1": "US",
                "name": "United States of America"
            }
        ],
        "release_date": "2024-06-05",
        "revenue": 331957666,
        "runtime": 115,
        "spoken_languages": [
            {
                "english_name": "English",
                "iso_639_1": "en",
                "name": "English"
            }
        ],
        "status": "Released",
        "tagline": "Miami's finest are now its most wanted.",
        "title": "Bad Boys: Ride or Die",
        "video": false,
        "vote_average": 6.995,
        "vote_count": 465
    }

    const credits: ICredits | null = {
        "id": 573435,
        "cast": [
            {
                "adult": false,
                "gender": 2,
                "id": 2888,
                "known_for_department": "Acting",
                "name": "Will Smith",
                "original_name": "Will Smith",
                "popularity": 75.018,
                "profile_path": "/9QD9DvQUF5t8ZVKpeoW4k2sFZ4D.jpg",
                "cast_id": 7,
                "character": "Mike Lowrey",
                "credit_id": "60214ee4a80673003f419f46",
                "order": 0
            },
            {
                "adult": false,
                "gender": 2,
                "id": 78029,
                "known_for_department": "Acting",
                "name": "Martin Lawrence",
                "original_name": "Martin Lawrence",
                "popularity": 44.489,
                "profile_path": "/kE78jD0UC3PvJvPlqbbHLuUUVr5.jpg",
                "cast_id": 8,
                "character": "Marcus Burnett",
                "credit_id": "60214efeea37e0003f3eec27",
                "order": 1
            },
            {
                "adult": false,
                "gender": 1,
                "id": 67599,
                "known_for_department": "Acting",
                "name": "Vanessa Hudgens",
                "original_name": "Vanessa Hudgens",
                "popularity": 44.432,
                "profile_path": "/ssFXWN5li5OWJLgUoFlUDY0ZyPc.jpg",
                "cast_id": 20,
                "character": "Kelly",
                "credit_id": "63da75aa22df2e00843cb7c6",
                "order": 2
            },
            {
                "adult": false,
                "gender": 2,
                "id": 23498,
                "known_for_department": "Acting",
                "name": "Alexander Ludwig",
                "original_name": "Alexander Ludwig",
                "popularity": 32.721,
                "profile_path": "/unP5YUgEdECL2gMLs0zCNya6is6.jpg",
                "cast_id": 21,
                "character": "Dorn",
                "credit_id": "643069ac1f98d101f6456b3c",
                "order": 3
            },
            {
                "adult": false,
                "gender": 1,
                "id": 544442,
                "known_for_department": "Acting",
                "name": "Paola Nuñez",
                "original_name": "Paola Nuñez",
                "popularity": 32.173,
                "profile_path": "/5k8tBBvoV43iK6u0k2YUSVXPmuK.jpg",
                "cast_id": 22,
                "character": "Rita",
                "credit_id": "643069b3b076e5010a752705",
                "order": 4
            },
            {
                "adult": false,
                "gender": 2,
                "id": 58115,
                "known_for_department": "Acting",
                "name": "Eric Dane",
                "original_name": "Eric Dane",
                "popularity": 47.484,
                "profile_path": "/5TIrP8s6GrhO7I2rfG0GPEIkRrY.jpg",
                "cast_id": 23,
                "character": "McGrath",
                "credit_id": "64343f8d31032500bd5774e1",
                "order": 5
            },
            {
                "adult": false,
                "gender": 2,
                "id": 65524,
                "known_for_department": "Acting",
                "name": "Ioan Gruffudd",
                "original_name": "Ioan Gruffudd",
                "popularity": 27.804,
                "profile_path": "/8fZ1h879lO5lcKt9SG2UIXisq1k.jpg",
                "cast_id": 24,
                "character": "Lockwood",
                "credit_id": "644bfb36726fb1059e063a49",
                "order": 6
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2256312,
                "known_for_department": "Acting",
                "name": "Jacob Scipio",
                "original_name": "Jacob Scipio",
                "popularity": 56.494,
                "profile_path": "/gcZSJy9LZ8DUDP480Q2K1OhL1Ct.jpg",
                "cast_id": 29,
                "character": "Armando Aretas",
                "credit_id": "65dd4ef2dcb6a3018585b4eb",
                "order": 7
            },
            {
                "adult": false,
                "gender": 1,
                "id": 1399166,
                "known_for_department": "Acting",
                "name": "Melanie Liburd",
                "original_name": "Melanie Liburd",
                "popularity": 21.111,
                "profile_path": "/diWkE87OnBDaXZkRLLkT78lTcI9.jpg",
                "cast_id": 28,
                "character": "Christine",
                "credit_id": "65633f048f26bc00ad26fe3a",
                "order": 8
            },
            {
                "adult": false,
                "gender": 1,
                "id": 74610,
                "known_for_department": "Acting",
                "name": "Tasha Smith",
                "original_name": "Tasha Smith",
                "popularity": 20.464,
                "profile_path": "/ebveEoOGHaTnRSsVcIsEMmFsFEC.jpg",
                "cast_id": 31,
                "character": "Theresa Burnett",
                "credit_id": "6602ccd80c1255014b0b5f6f",
                "order": 9
            },
            {
                "adult": false,
                "gender": 1,
                "id": 62765,
                "known_for_department": "Acting",
                "name": "Rhea Seehorn",
                "original_name": "Rhea Seehorn",
                "popularity": 23.689,
                "profile_path": "/g6niUzFMQOiAcSThWoGk0LlAQRP.jpg",
                "cast_id": 26,
                "character": "Judy Howard",
                "credit_id": "646e7fc860620a011e232098",
                "order": 10
            },
            {
                "adult": false,
                "gender": 1,
                "id": 1230868,
                "known_for_department": "Acting",
                "name": "Tiffany Haddish",
                "original_name": "Tiffany Haddish",
                "popularity": 15.159,
                "profile_path": "/Avmv1YY7Qscz0TyWxhqFoS7BO5f.jpg",
                "cast_id": 32,
                "character": "Tabitha",
                "credit_id": "6602cce50929f6014b9a47a7",
                "order": 11
            },
            {
                "adult": false,
                "gender": 2,
                "id": 532,
                "known_for_department": "Acting",
                "name": "Joe Pantoliano",
                "original_name": "Joe Pantoliano",
                "popularity": 20.383,
                "profile_path": "/cXMOad9KKVBK1lg8EjEbcNPn1OT.jpg",
                "cast_id": 30,
                "character": "Captain C. Howard",
                "credit_id": "6602cac677070001630babf5",
                "order": 12
            },
            {
                "adult": false,
                "gender": 2,
                "id": 224235,
                "known_for_department": "Acting",
                "name": "DJ Khaled",
                "original_name": "DJ Khaled",
                "popularity": 10.854,
                "profile_path": "/2aZXRm1ETaXx6wsVJ22kaUpCWJe.jpg",
                "cast_id": 47,
                "character": "Manny",
                "credit_id": "6660ae96aaf992e31c0271c8",
                "order": 13
            },
            {
                "adult": false,
                "gender": 2,
                "id": 119869,
                "known_for_department": "Acting",
                "name": "John Salley",
                "original_name": "John Salley",
                "popularity": 6.447,
                "profile_path": "/efN5d1FEOVsnvxospYfvn9ebwsk.jpg",
                "cast_id": 48,
                "character": "Fletcher",
                "credit_id": "6660aeaaaa7e942263f26bce",
                "order": 14
            },
            {
                "adult": false,
                "gender": 1,
                "id": 1516729,
                "known_for_department": "Acting",
                "name": "Bianca Bethune",
                "original_name": "Bianca Bethune",
                "popularity": 14.979,
                "profile_path": "/p3XdSCPD2pmoj52mAKDnl87fG2U.jpg",
                "cast_id": 49,
                "character": "Megan",
                "credit_id": "6660aed58cf6bc21742446bb",
                "order": 15
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2522236,
                "known_for_department": "Acting",
                "name": "Dennis McDonald",
                "original_name": "Dennis McDonald",
                "popularity": 18.269,
                "profile_path": "/ixzTEOlFXTKX6qYDLits0vIv26B.jpg",
                "cast_id": 41,
                "character": "Reggie",
                "credit_id": "665a2d269cd41b287a94143f",
                "order": 16
            },
            {
                "adult": false,
                "gender": 1,
                "id": 2576032,
                "known_for_department": "Acting",
                "name": "Quinn Hemphill",
                "original_name": "Quinn Hemphill",
                "popularity": 32.446,
                "profile_path": "/7JBEIMVFjBW9uZ3jlLQxfV4AYiL.jpg",
                "cast_id": 50,
                "character": "Callie",
                "credit_id": "6660aee64995e5edbcf26311",
                "order": 17
            },
            {
                "adult": false,
                "gender": 2,
                "id": 865,
                "known_for_department": "Production",
                "name": "Michael Bay",
                "original_name": "Michael Bay",
                "popularity": 18.44,
                "profile_path": "/8I9H9IKROECFEn7usvyChbRMhbI.jpg",
                "cast_id": 46,
                "character": "Porsche Driver",
                "credit_id": "6660ae01c0441190a902717e",
                "order": 18
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1628383,
                "known_for_department": "Acting",
                "name": "Derek Russo",
                "original_name": "Derek Russo",
                "popularity": 9.185,
                "profile_path": "/5x5b61WVyydJV9qHPVIBzefCsMf.jpg",
                "cast_id": 51,
                "character": "Lintz",
                "credit_id": "6660aef57c0282ef304f66a9",
                "order": 19
            },
            {
                "adult": false,
                "gender": 2,
                "id": 4758268,
                "known_for_department": "Acting",
                "name": "Karter Reese Newsome",
                "original_name": "Karter Reese Newsome",
                "popularity": 0.891,
                "profile_path": null,
                "cast_id": 52,
                "character": "Little Marcus",
                "credit_id": "66613ca7d76ce04e6db772f6",
                "order": 20
            },
            {
                "adult": false,
                "gender": 1,
                "id": 1578220,
                "known_for_department": "Acting",
                "name": "Levy Tran",
                "original_name": "Levy Tran",
                "popularity": 25.228,
                "profile_path": "/ungYHOdC0DETelUD8I6FR1bFdn.jpg",
                "cast_id": 53,
                "character": "Wolf",
                "credit_id": "66613d054e4fa6b4557dc934",
                "order": 21
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1763910,
                "known_for_department": "Acting",
                "name": "Jay DeVon Johnson",
                "original_name": "Jay DeVon Johnson",
                "popularity": 4.616,
                "profile_path": "/k21WcVCo5TAhKPEAMXSO5g9HC21.jpg",
                "cast_id": 54,
                "character": "Russ Brown",
                "credit_id": "66613d5365c93ec086f29cd7",
                "order": 22
            },
            {
                "adult": false,
                "gender": 2,
                "id": 64900,
                "known_for_department": "Directing",
                "name": "Jeff J.J. Authors",
                "original_name": "Jeff J.J. Authors",
                "popularity": 6.602,
                "profile_path": null,
                "cast_id": 55,
                "character": "Felix the Drunk Pilot",
                "credit_id": "66613dabf697bc411e00be63",
                "order": 23
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1768009,
                "known_for_department": "Acting",
                "name": "Nicholas Verdi",
                "original_name": "Nicholas Verdi",
                "popularity": 2.353,
                "profile_path": "/dKNGciV9NZXhcNtwerzWGCk9lyO.jpg",
                "cast_id": 56,
                "character": "Hijacked Pilot",
                "credit_id": "66613df2dde989a6b3cbaf14",
                "order": 24
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2089936,
                "known_for_department": "Acting",
                "name": "Steven Sean Garland",
                "original_name": "Steven Sean Garland",
                "popularity": 1.844,
                "profile_path": "/oeLWb6c9XnlKgV2pW5hB20ryuFe.jpg",
                "cast_id": 57,
                "character": "The Banker",
                "credit_id": "66613e6a70e5cd3e6460a257",
                "order": 25
            },
            {
                "adult": false,
                "gender": 1,
                "id": 1502198,
                "known_for_department": "Acting",
                "name": "Jerri Tubbs",
                "original_name": "Jerri Tubbs",
                "popularity": 4.176,
                "profile_path": "/3oT4Og3EnTb9KsrCrV2MsG53Ung.jpg",
                "cast_id": 58,
                "character": "Banker's Wife",
                "credit_id": "66613ec4838674e8dcadd075",
                "order": 26
            },
            {
                "adult": false,
                "gender": 1,
                "id": 4199450,
                "known_for_department": "Crew",
                "name": "Jewelianna Ramos-Ortiz",
                "original_name": "Jewelianna Ramos-Ortiz",
                "popularity": 2.51,
                "profile_path": "/4HyaEY6yHuwnfXkQhObmswWM0WO.jpg",
                "cast_id": 59,
                "character": "Banker's Girlfriend",
                "credit_id": "66613ef5574a4a1df8adcee3",
                "order": 27
            },
            {
                "adult": false,
                "gender": 2,
                "id": 80779,
                "known_for_department": "Acting",
                "name": "Enoch King",
                "original_name": "Enoch King",
                "popularity": 2.206,
                "profile_path": null,
                "cast_id": 60,
                "character": "Convenience Store Clerk",
                "credit_id": "66613f25d956c67aa700b06e",
                "order": 28
            },
            {
                "adult": false,
                "gender": 2,
                "id": 4758270,
                "known_for_department": "Acting",
                "name": "James Lee Thomas",
                "original_name": "James Lee Thomas",
                "popularity": 0.801,
                "profile_path": "/2K9xips6H7e5RL5lKqHZSXsETOV.jpg",
                "cast_id": 61,
                "character": "Thief",
                "credit_id": "66613fb30d8e12e393447c23",
                "order": 29
            },
            {
                "adult": false,
                "gender": 2,
                "id": 3081264,
                "known_for_department": "Acting",
                "name": "Jay Shetty",
                "original_name": "Jay Shetty",
                "popularity": 2.219,
                "profile_path": "/mN0lKvfDjSaNByQXbDYPHzLxJAu.jpg",
                "cast_id": 62,
                "character": "Police Chaplain",
                "credit_id": "666140930d48b3f88ff29ac7",
                "order": 30
            },
            {
                "adult": false,
                "gender": 2,
                "id": 58733,
                "known_for_department": "Acting",
                "name": "Jason Davis",
                "original_name": "Jason Davis",
                "popularity": 17.118,
                "profile_path": "/thSH5TatER5b1WbgFpGt5YDdOu.jpg",
                "cast_id": 63,
                "character": "Grice",
                "credit_id": "666141d643638f937300be2d",
                "order": 31
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1615594,
                "known_for_department": "Acting",
                "name": "Ahmed Lucan",
                "original_name": "Ahmed Lucan",
                "popularity": 2.249,
                "profile_path": "/kKTco7xlaMtFwrUgh6PEwHYYAyM.jpg",
                "cast_id": 64,
                "character": "Doctor",
                "credit_id": "666142148ce0aec4dc00ba4c",
                "order": 32
            },
            {
                "adult": false,
                "gender": 1,
                "id": 2721623,
                "known_for_department": "Acting",
                "name": "Bria Brimmer",
                "original_name": "Bria Brimmer",
                "popularity": 1.546,
                "profile_path": "/yv0INjy38ra2AIX5uwcuvmiBHzm.jpg",
                "cast_id": 65,
                "character": "Nurse",
                "credit_id": "66614247b627ff41a7077ad0",
                "order": 33
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2729674,
                "known_for_department": "Acting",
                "name": "Alex Pires",
                "original_name": "Alex Pires",
                "popularity": 0.717,
                "profile_path": "/rVKZxy7Rn34J5WuxBDEKqQ3TgVx.jpg",
                "cast_id": 66,
                "character": "Paramedic",
                "credit_id": "6661431e760fbd1b89e6ead7",
                "order": 34
            },
            {
                "adult": false,
                "gender": 2,
                "id": 3568034,
                "known_for_department": "Acting",
                "name": "Nathan Hesse",
                "original_name": "Nathan Hesse",
                "popularity": 0.259,
                "profile_path": "/d3cdL1xbsDr2nfi4nu5LxKjzaGQ.jpg",
                "cast_id": 67,
                "character": "Trailer Park Redneck",
                "credit_id": "6661440d9cf08826b27dcab5",
                "order": 35
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1684351,
                "known_for_department": "Acting",
                "name": "Jesse Malinowski",
                "original_name": "Jesse Malinowski",
                "popularity": 3.543,
                "profile_path": "/mZK00u2EWDYdYd41vgnTLbdBy9V.jpg",
                "cast_id": 68,
                "character": "Trailer Park Redneck",
                "credit_id": "666145223969ea404db7807c",
                "order": 36
            },
            {
                "adult": false,
                "gender": 1,
                "id": 4646847,
                "known_for_department": "Acting",
                "name": "Blanca Goodfriend",
                "original_name": "Blanca Goodfriend",
                "popularity": 0.001,
                "profile_path": "/zRcvQyLapFVd8V3iJFFaZ6yFF1G.jpg",
                "cast_id": 69,
                "character": "Woman in Car",
                "credit_id": "66614569d956c67aa700b118",
                "order": 37
            },
            {
                "adult": false,
                "gender": 1,
                "id": 2122049,
                "known_for_department": "Acting",
                "name": "Jasmin Lawrence",
                "original_name": "Jasmin Lawrence",
                "popularity": 1.59,
                "profile_path": "/cdi49tm5Rc55oFPMUObZx7rl7d7.jpg",
                "cast_id": 70,
                "character": "Reporter Johnson",
                "credit_id": "6661460a8a57aa252d60a072",
                "order": 38
            },
            {
                "adult": false,
                "gender": 1,
                "id": 4758277,
                "known_for_department": "Acting",
                "name": "Adriana Sheri",
                "original_name": "Adriana Sheri",
                "popularity": 0.238,
                "profile_path": "/sWCAZJSkTU1eRaBXdNHpnLhM7BN.jpg",
                "cast_id": 71,
                "character": "Reporter Cobb",
                "credit_id": "6661464e2d254dd2c54f992d",
                "order": 39
            },
            {
                "adult": false,
                "gender": 2,
                "id": 4433125,
                "known_for_department": "Acting",
                "name": "Joyner Lucas",
                "original_name": "Joyner Lucas",
                "popularity": 0.79,
                "profile_path": "/n95q8exFP5R8XqTyo2YrI0AhuZK.jpg",
                "cast_id": 72,
                "character": "Gang A Leader",
                "credit_id": "666146e8970f6c4918087bc9",
                "order": 40
            },
            {
                "adult": false,
                "gender": 1,
                "id": 4758280,
                "known_for_department": "Acting",
                "name": "Marybel Rodriguez",
                "original_name": "Marybel Rodriguez",
                "popularity": 0.069,
                "profile_path": null,
                "cast_id": 73,
                "character": "Newscaster",
                "credit_id": "66614829b39069b7c760ae8f",
                "order": 41
            },
            {
                "adult": false,
                "gender": 0,
                "id": 4758281,
                "known_for_department": "Acting",
                "name": "Austin Carter",
                "original_name": "Austin Carter",
                "popularity": 0.053,
                "profile_path": null,
                "cast_id": 74,
                "character": "Newscaster",
                "credit_id": "6661488c7388d6b95a8d7c9d",
                "order": 42
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1300075,
                "known_for_department": "Acting",
                "name": "Dwight Turner",
                "original_name": "Dwight Turner",
                "popularity": 2.208,
                "profile_path": "/kaCEcDk4OaIvMrD0KjQC6qopVcV.jpg",
                "cast_id": 75,
                "character": "Newscaster",
                "credit_id": "666148c2a6c24c82e8e6ea2f",
                "order": 43
            },
            {
                "adult": false,
                "gender": 1,
                "id": 1303873,
                "known_for_department": "Acting",
                "name": "Jenna Kanell",
                "original_name": "Jenna Kanell",
                "popularity": 18.763,
                "profile_path": "/dzx7LYrEX5TnxSau43AZMYm5Mub.jpg",
                "cast_id": 76,
                "character": "Nicole",
                "credit_id": "666149498bc5573bd4b780c3",
                "order": 44
            },
            {
                "adult": false,
                "gender": 2,
                "id": 109422,
                "known_for_department": "Crew",
                "name": "Rob Mars",
                "original_name": "Rob Mars",
                "popularity": 7.527,
                "profile_path": "/hJFCXTiwTc4sh0c8eFTveBBEwYI.jpg",
                "cast_id": 77,
                "character": "Analyst",
                "credit_id": "6661499e584bef7ba6077b8f",
                "order": 45
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1813752,
                "known_for_department": "Acting",
                "name": "Bobby Hernandez",
                "original_name": "Bobby Hernandez",
                "popularity": 1.674,
                "profile_path": "/z2QZ5YSHxhHOKYSGuRqanICNkXU.jpg",
                "cast_id": 78,
                "character": "Sniper",
                "credit_id": "666149e771f60fae2308870c",
                "order": 46
            },
            {
                "adult": false,
                "gender": 2,
                "id": 4512499,
                "known_for_department": "Acting",
                "name": "Khaby Lame",
                "original_name": "Khaby Lame",
                "popularity": 0.539,
                "profile_path": "/1M9ay4eNMbBkyVUezpTxpGJsmdi.jpg",
                "cast_id": 87,
                "character": "Man on street",
                "credit_id": "6662c574d65670d4c9f0e877",
                "order": 47
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1399841,
                "known_for_department": "Directing",
                "name": "Adil El Arbi",
                "original_name": "Adil El Arbi",
                "popularity": 6.362,
                "profile_path": "/nQrv39ioSrzWUUiOYknzmpBzwzp.jpg",
                "cast_id": 89,
                "character": "Manny's Goon #1 (Uncredited)",
                "credit_id": "667ea81f652b9fa9f9c29cf9",
                "order": 48
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1399842,
                "known_for_department": "Directing",
                "name": "Bilall Fallah",
                "original_name": "Bilall Fallah",
                "popularity": 9.516,
                "profile_path": "/5CaNXBlmcGumtrKRot2WUQi3bAO.jpg",
                "cast_id": 90,
                "character": "Many's Goon #2 (Uncredited)",
                "credit_id": "667ea8321ffc9e4f138d77cb",
                "order": 49
            }
        ],
        "crew": [
            {
                "adult": false,
                "gender": 2,
                "id": 770,
                "known_for_department": "Production",
                "name": "Jerry Bruckheimer",
                "original_name": "Jerry Bruckheimer",
                "popularity": 15.43,
                "profile_path": "/vTKQVRrj9vOrKLkPEsXHxmpV9c3.jpg",
                "credit_id": "5e225970cf4b8b0017f277cd",
                "department": "Production",
                "job": "Producer"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 21792,
                "known_for_department": "Writing",
                "name": "George Gallo",
                "original_name": "George Gallo",
                "popularity": 6.101,
                "profile_path": "/9ioCmUzm6djPaw7wC1l4ArxsSOt.jpg",
                "credit_id": "5e221bf82811a10015a24a77",
                "department": "Writing",
                "job": "Characters"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1399841,
                "known_for_department": "Directing",
                "name": "Adil El Arbi",
                "original_name": "Adil El Arbi",
                "popularity": 6.362,
                "profile_path": "/nQrv39ioSrzWUUiOYknzmpBzwzp.jpg",
                "credit_id": "63d954c6955c65007bab87ed",
                "department": "Directing",
                "job": "Director"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1399842,
                "known_for_department": "Directing",
                "name": "Bilall Fallah",
                "original_name": "Bilall Fallah",
                "popularity": 9.516,
                "profile_path": "/5CaNXBlmcGumtrKRot2WUQi3bAO.jpg",
                "credit_id": "63d954d7a9117f0083fef156",
                "department": "Directing",
                "job": "Director"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2888,
                "known_for_department": "Acting",
                "name": "Will Smith",
                "original_name": "Will Smith",
                "popularity": 75.018,
                "profile_path": "/9QD9DvQUF5t8ZVKpeoW4k2sFZ4D.jpg",
                "credit_id": "63d95504955c65007bab880f",
                "department": "Production",
                "job": "Producer"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 2049399,
                "known_for_department": "Production",
                "name": "Doug Belgrad",
                "original_name": "Doug Belgrad",
                "popularity": 0.965,
                "profile_path": null,
                "credit_id": "63d95515a6c10400ab1ff402",
                "department": "Production",
                "job": "Producer"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2446,
                "known_for_department": "Production",
                "name": "Chad Oman",
                "original_name": "Chad Oman",
                "popularity": 12.578,
                "profile_path": "/l84amvUZOrpSU5GRTDYoEkvbh25.jpg",
                "credit_id": "63d95527a6c10400858736d0",
                "department": "Production",
                "job": "Producer"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 78029,
                "known_for_department": "Acting",
                "name": "Martin Lawrence",
                "original_name": "Martin Lawrence",
                "popularity": 44.489,
                "profile_path": "/kE78jD0UC3PvJvPlqbbHLuUUVr5.jpg",
                "credit_id": "63d9553d22df2e00df3f1c7c",
                "department": "Production",
                "job": "Executive Producer"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 46080,
                "known_for_department": "Production",
                "name": "James Lassiter",
                "original_name": "James Lassiter",
                "popularity": 7.684,
                "profile_path": null,
                "credit_id": "63d95553955c65008c7bb8e1",
                "department": "Production",
                "job": "Executive Producer"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2444,
                "known_for_department": "Production",
                "name": "Mike Stenson",
                "original_name": "Mike Stenson",
                "popularity": 2.417,
                "profile_path": "/70ioHzt1q5o9JDjxyXND0xOJDel.jpg",
                "credit_id": "63d95566a6c1040093ce721b",
                "department": "Production",
                "job": "Executive Producer"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 10122,
                "known_for_department": "Production",
                "name": "Barry H. Waldman",
                "original_name": "Barry H. Waldman",
                "popularity": 2.136,
                "profile_path": null,
                "credit_id": "63d95581c15b5500a0538d8c",
                "department": "Production",
                "job": "Executive Producer"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 114410,
                "known_for_department": "Production",
                "name": "Jon Mone",
                "original_name": "Jon Mone",
                "popularity": 2.279,
                "profile_path": null,
                "credit_id": "63d955a6c15b5500f0b8b70b",
                "department": "Production",
                "job": "Executive Producer"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 1500497,
                "known_for_department": "Camera",
                "name": "Robrecht Heyvaert",
                "original_name": "Robrecht Heyvaert",
                "popularity": 2.057,
                "profile_path": "/jHZZpTCyJZilDow7bBDvNx8DFW9.jpg",
                "credit_id": "6451d91733ad8f00fef2ac16",
                "department": "Camera",
                "job": "Director of Photography"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1986351,
                "known_for_department": "Writing",
                "name": "Chris Bremner",
                "original_name": "Chris Bremner",
                "popularity": 5.517,
                "profile_path": "/jkJXXw4dkvk4HBHa89ypggZtNuF.jpg",
                "credit_id": "66031879197de40163190299",
                "department": "Writing",
                "job": "Writer"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1986351,
                "known_for_department": "Writing",
                "name": "Chris Bremner",
                "original_name": "Chris Bremner",
                "popularity": 5.517,
                "profile_path": "/jkJXXw4dkvk4HBHa89ypggZtNuF.jpg",
                "credit_id": "660318b7197de401631902b3",
                "department": "Production",
                "job": "Executive Producer"
            },
            {
                "adult": false,
                "gender": 1,
                "id": 3961339,
                "known_for_department": "Crew",
                "name": "Michelle Andrea Adams",
                "original_name": "Michelle Andrea Adams",
                "popularity": 0.532,
                "profile_path": "/1Xy2svtCzZInGTWnE3C78Mkp2Jm.jpg",
                "credit_id": "6603755462f335016452d261",
                "department": "Crew",
                "job": "Stunt Double"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 929145,
                "known_for_department": "Sound",
                "name": "Lorne Balfe",
                "original_name": "Lorne Balfe",
                "popularity": 8.497,
                "profile_path": "/lHAhZC9RAUYtjhKDokKYyNNitLz.jpg",
                "credit_id": "663e6fd5207557ec4c5050a2",
                "department": "Sound",
                "job": "Original Music Composer"
            },
            {
                "adult": false,
                "gender": 1,
                "id": 2282383,
                "known_for_department": "Crew",
                "name": "Amanda Bradley",
                "original_name": "Amanda Bradley",
                "popularity": 2.634,
                "profile_path": "/gqHsBf8ufWfzgNFhJSVelK92rsV.jpg",
                "credit_id": "6647bd55a21d8730a48bc353",
                "department": "Crew",
                "job": "Stunt Driver"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 2260935,
                "known_for_department": "Crew",
                "name": "Gary Peebles",
                "original_name": "Gary Peebles",
                "popularity": 4.798,
                "profile_path": "/mSjrV4nWtAWxmFG61zJIsHtbMld.jpg",
                "credit_id": "6647d25d28f01b1abd25cc80",
                "department": "Crew",
                "job": "Stunts"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 3745297,
                "known_for_department": "Crew",
                "name": "Steven Shelby",
                "original_name": "Steven Shelby",
                "popularity": 0.204,
                "profile_path": null,
                "credit_id": "6647d317cee5ab90aa2dfeb1",
                "department": "Crew",
                "job": "Stunts"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 466391,
                "known_for_department": "Writing",
                "name": "Will Beall",
                "original_name": "Will Beall",
                "popularity": 7.056,
                "profile_path": "/a7cGswu8HuOpJ7sLREl8XOAW7Tl.jpg",
                "credit_id": "66554dfba5b319bb17e36d70",
                "department": "Writing",
                "job": "Writer"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 1309903,
                "known_for_department": "Crew",
                "name": "Kevin Waterman",
                "original_name": "Kevin Waterman",
                "popularity": 10.722,
                "profile_path": "/kFnoNPnSsn7gV3Rczhg0kdYVLUc.jpg",
                "credit_id": "665c4edc0ac3db78b4f8a30c",
                "department": "Crew",
                "job": "Stunt Driver"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 2543601,
                "known_for_department": "Costume & Make-Up",
                "name": "Ryan Dempsey",
                "original_name": "Ryan Dempsey",
                "popularity": 1.034,
                "profile_path": null,
                "credit_id": "665da1e0d7d56d2720ab4608",
                "department": "Costume & Make-Up",
                "job": "Set Costumer"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 1665446,
                "known_for_department": "Art",
                "name": "Federico D'Alessandro",
                "original_name": "Federico D'Alessandro",
                "popularity": 1.589,
                "profile_path": null,
                "credit_id": "665da79c4717b38275799254",
                "department": "Art",
                "job": "Storyboard Artist"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 76747,
                "known_for_department": "Art",
                "name": "Henrik Tamm",
                "original_name": "Henrik Tamm",
                "popularity": 2.071,
                "profile_path": "/6rjyNycbclqLAk1XIZ4eEPIgJUB.jpg",
                "credit_id": "665dc32bd55082ba7781b3f4",
                "department": "Art",
                "job": "Concept Artist"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 2507480,
                "known_for_department": "Editing",
                "name": "Asaf Eisenberg",
                "original_name": "Asaf Eisenberg",
                "popularity": 0.563,
                "profile_path": null,
                "credit_id": "66620fe8e9aae92d5a19de66",
                "department": "Editing",
                "job": "Editor"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 11455,
                "known_for_department": "Editing",
                "name": "Dan Lebental",
                "original_name": "Dan Lebental",
                "popularity": 6.366,
                "profile_path": "/kG4N93eMa6fzkJjBsRPQXUcGQlg.jpg",
                "credit_id": "66620ff97c9053f9b0d10ebc",
                "department": "Editing",
                "job": "Editor"
            },
            {
                "adult": false,
                "gender": 0,
                "id": 1530687,
                "known_for_department": "Art",
                "name": "Shawn D. Bronson",
                "original_name": "Shawn D. Bronson",
                "popularity": 1.172,
                "profile_path": null,
                "credit_id": "6662108e8ab8b5a3cb21ff92",
                "department": "Art",
                "job": "Art Direction"
            },
            {
                "adult": false,
                "gender": 1,
                "id": 1024910,
                "known_for_department": "Production",
                "name": "Lindsay Graham Ahanonu",
                "original_name": "Lindsay Graham Ahanonu",
                "popularity": 6.083,
                "profile_path": null,
                "credit_id": "666265999dc77e5dd4cff81e",
                "department": "Production",
                "job": "Casting Director"
            },
            {
                "adult": false,
                "gender": 1,
                "id": 5914,
                "known_for_department": "Production",
                "name": "Mary Vernieu",
                "original_name": "Mary Vernieu",
                "popularity": 4.948,
                "profile_path": "/fvPk2YNSpgqU2iBGgXCUCTcGRpo.jpg",
                "credit_id": "666265c02b56ebaf067624b8",
                "department": "Production",
                "job": "Casting Director"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 9819,
                "known_for_department": "Art",
                "name": "Jon Billington",
                "original_name": "Jon Billington",
                "popularity": 7.013,
                "profile_path": "/3wMaenFPT4rhJuPKJcE49eH7WGk.jpg",
                "credit_id": "666265e8ab47781f59cff861",
                "department": "Art",
                "job": "Production Design"
            },
            {
                "adult": false,
                "gender": 2,
                "id": 4351135,
                "known_for_department": "Lighting",
                "name": "John Sweet",
                "original_name": "John Sweet",
                "popularity": 0.001,
                "profile_path": null,
                "credit_id": "666f504dfe5e87485e236dc4",
                "department": "Lighting",
                "job": "Additional Lighting Technician"
            }
        ]
    }

    const collections: ICollectionDetails | null = {
        "id": 14890,
        "name": "Bad Boys Collection",
        "overview": "A franchise of films about the cop duo Mike Lowrey and Marcus Burnett, blowing stuff up and crazy car chases. They get the job done but at an expensive cost.",
        "poster_path": "/iB59poJBofg1ciKlu6LzZakf11m.jpg",
        "backdrop_path": "/k9hhSHg5GS4UgWQC6MHBOZrarji.jpg",
        "parts": [
            {
                "backdrop_path": "/eAIHqfS3kXm7kZl4j7ZBfdegyEz.jpg",
                "id": 38700,
                "title": "Bad Boys for Life",
                "original_title": "Bad Boys for Life",
                "overview": "Marcus and Mike are forced to confront new threats, career changes, and midlife crises as they join the newly created elite team AMMO of the Miami police department to take down the ruthless Armando Armas, the vicious leader of a Miami drug cartel.",
                "poster_path": "/y95lQLnuNKdPAzw9F9Ab8kJ80c3.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    53,
                    28,
                    80
                ],
                "popularity": 440.145,
                "release_date": "2020-01-15",
                "video": false,
                "vote_average": 7.132,
                "vote_count": 7994
            },
            {
                "backdrop_path": "/r4TxCaZvQ2bLFoXRLHGfii6b3tJ.jpg",
                "id": 9737,
                "title": "Bad Boys",
                "original_title": "Bad Boys",
                "overview": "Marcus Burnett is a henpecked family man. Mike Lowry is a footloose and fancy free ladies' man. Both Miami policemen, they have 72 hours to reclaim a consignment of drugs stolen from under their station's nose. To complicate matters, in order to get the assistance of the sole witness to a murder, they have to pretend to be each other.",
                "poster_path": "/x1ygBecKHfXX4M2kRhmFKWfWbJc.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    28,
                    35,
                    80,
                    53
                ],
                "popularity": 294.536,
                "release_date": "1995-04-07",
                "video": false,
                "vote_average": 6.806,
                "vote_count": 6127
            },
            {
                "backdrop_path": "/gxSVZCUlDd8upT1G2wdrUdz2hxG.jpg",
                "id": 8961,
                "title": "Bad Boys II",
                "original_title": "Bad Boys II",
                "overview": "Detectives Marcus Burnett and Mike Lowrey of the Miami Narcotics Task Force are tasked with stopping the flow of the drug ecstasy into Miami. They track the drugs to the whacked-out Cuban drug lord Johnny Tapia, who is also involved in a bloody war with Russian and Haitian mobsters. If that isn't bad enough, there's tension between the two detectives when Marcus discovers that playboy Mike is secretly romancing Marcus’ sister, Syd.",
                "poster_path": "/yCvB5fG5aEPqa1St7ihY6KEAsHD.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    28,
                    80,
                    35
                ],
                "popularity": 193.066,
                "release_date": "2003-07-18",
                "video": false,
                "vote_average": 6.627,
                "vote_count": 5240
            },
            {
                "backdrop_path": "/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",
                "id": 573435,
                "title": "Bad Boys: Ride or Die",
                "original_title": "Bad Boys: Ride or Die",
                "overview": "After their late former Captain is framed, Lowrey and Burnett try to clear his name, only to end up on the run themselves.",
                "poster_path": "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    28,
                    80,
                    53,
                    35
                ],
                "popularity": 1380.469,
                "release_date": "2024-06-05",
                "video": false,
                "vote_average": 6.995,
                "vote_count": 465
            }
        ]
    }

    const recommendation: IRecommendationResponse | null = {
        "page": 1,
        "results": [
            {
                "backdrop_path": "/iTWrsOVsUqcwYSxrpINNs3hG2nC.jpg",
                "id": 1001311,
                "title": "Under Paris",
                "original_title": "Sous la Seine",
                "overview": "In the Summer of 2024, Paris is hosting the World Triathlon Championships on the Seine for the first time. Sophia, a brilliant scientist, learns from Mika, a young environmental activist, that a large shark is swimming deep in the river. To avoid a bloodbath at the heart of the city, they have no choice but to join forces with Adil, the Seine river police commander.",
                "poster_path": "/qZPLK5ktRKa3CL4sKRZtj8UlPYc.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "fr",
                "genre_ids": [
                    53,
                    27,
                    28,
                    9648
                ],
                "popularity": 1234.064,
                "release_date": "2024-06-05",
                "video": false,
                "vote_average": 6.029,
                "vote_count": 799
            },
            {
                "backdrop_path": "/xg27NrXi7VXCGUr7MG75UqLl6Vg.jpg",
                "id": 1022789,
                "title": "Inside Out 2",
                "original_title": "Inside Out 2",
                "overview": "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust, who’ve long been running a successful operation by all accounts, aren’t sure how to feel when Anxiety shows up. And it looks like she’s not alone.",
                "poster_path": "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    16,
                    10751,
                    12,
                    35
                ],
                "popularity": 5393.121,
                "release_date": "2024-06-11",
                "video": false,
                "vote_average": 7.724,
                "vote_count": 1216
            },
            {
                "backdrop_path": "/whnFKx0Y54Ktg6o2TiwbnQfXdZf.jpg",
                "id": 1086747,
                "title": "The Watchers",
                "original_title": "The Watchers",
                "overview": "A young artist gets stranded in an extensive, immaculate forest in western Ireland, where, after finding shelter, she becomes trapped alongside three strangers, stalked by mysterious creatures each night.",
                "poster_path": "/vZVEUPychdvZLrTNwWErr9xZFmu.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    27,
                    9648,
                    14
                ],
                "popularity": 1096.842,
                "release_date": "2024-06-06",
                "video": false,
                "vote_average": 6.489,
                "vote_count": 318
            },
            {
                "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
                "id": 653346,
                "title": "Kingdom of the Planet of the Apes",
                "original_title": "Kingdom of the Planet of the Apes",
                "overview": "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
                "poster_path": "/gKkl37BQuKTanygYQG1pyYgLVgf.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    878,
                    12,
                    28
                ],
                "popularity": 2419.072,
                "release_date": "2024-05-08",
                "video": false,
                "vote_average": 6.868,
                "vote_count": 1283
            },
            {
                "backdrop_path": "/jvPMJ2zM92jfXxVEFsqP1MMrLaO.jpg",
                "id": 823464,
                "title": "Godzilla x Kong: The New Empire",
                "original_title": "Godzilla x Kong: The New Empire",
                "overview": "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
                "poster_path": "/z1p34vh7dEOnLDmyCrlUVLuoDzd.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    878,
                    28,
                    12
                ],
                "popularity": 1308.129,
                "release_date": "2024-03-27",
                "video": false,
                "vote_average": 7.2,
                "vote_count": 2991
            },
            {
                "backdrop_path": "/nxxCPRGTzxUH8SFMrIsvMmdxHti.jpg",
                "id": 639720,
                "title": "IF",
                "original_title": "IF",
                "overview": "A young girl who goes through a difficult experience begins to see everyone's imaginary friends who have been left behind as their real-life friends have grown up.",
                "poster_path": "/xbKFv4KF3sVYuWKllLlwWDmuZP7.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    35,
                    14,
                    10751
                ],
                "popularity": 881.654,
                "release_date": "2024-05-08",
                "video": false,
                "vote_average": 7.4,
                "vote_count": 511
            },
            {
                "backdrop_path": "/vblTCXOWUQGSc837vgbhDRi4HSc.jpg",
                "id": 955555,
                "title": "The Roundup: No Way Out",
                "original_title": "범죄도시 3",
                "overview": "Detective Ma Seok-do changes his affiliation from the Geumcheon Police Station to the Metropolitan Investigation Team, in order to eradicate Japanese gangsters who enter Korea to commit heinous crimes.",
                "poster_path": "/lW6IHrtaATxDKYVYoQGU5sh0OVm.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "ko",
                "genre_ids": [
                    28,
                    80,
                    35,
                    53
                ],
                "popularity": 787.797,
                "release_date": "2023-05-31",
                "video": false,
                "vote_average": 7.219,
                "vote_count": 338
            },
            {
                "backdrop_path": "/bynRHBHqxkWk0HU2sYXKtz9HYxF.jpg",
                "id": 848116,
                "title": "Rocky Aur Rani Kii Prem Kahaani",
                "original_title": "रॉकी और रानी की प्रेम कहानी",
                "overview": "Gym-freak brat Rocky falls in love with Rani, who comes from a well-educated Bengali family. Being from polar opposite worlds, the two decide to switch their families to adjust to each other's cultures and backgrounds and to know if their marriage will survive. Rocky and Rani are trapped in a world where they are united by love but divided by families and the ultimate question is will they fit in?",
                "poster_path": "/vTQIqlxUkOuyf2UKhlM2OUaFGKz.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "hi",
                "genre_ids": [
                    35,
                    18,
                    10751,
                    10749
                ],
                "popularity": 11.378,
                "release_date": "2023-07-28",
                "video": false,
                "vote_average": 6.106,
                "vote_count": 47
            },
            {
                "backdrop_path": "/k2ReC71gRNxpyXYHfI09h5mqGtE.jpg",
                "id": 31428,
                "title": "Someone's Watching Me!",
                "original_title": "Someone's Watching Me!",
                "overview": "A young woman moves to a high-rise apartment building and soon begins to be tormented by an unknown stalker who seems to know her every move.",
                "poster_path": "/o5pIEWzjnMMz7WgOcB6wVXayE0D.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    53,
                    9648,
                    27,
                    10770
                ],
                "popularity": 8.74,
                "release_date": "1978-11-29",
                "video": false,
                "vote_average": 6.192,
                "vote_count": 125
            },
            {
                "backdrop_path": "/qb6dKqpG1l5rypc2LcoxcKaVO4w.jpg",
                "id": 11366,
                "title": "Uzumaki",
                "original_title": "うずまき",
                "overview": "The inhabitants of a small Japanese town become increasingly obsessed with and tormented by spirals.",
                "poster_path": "/71SkvX0U1FinnoQkDAtrNyrYhtT.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "ja",
                "genre_ids": [
                    9648,
                    14,
                    27
                ],
                "popularity": 16.433,
                "release_date": "2000-02-11",
                "video": false,
                "vote_average": 5.878,
                "vote_count": 213
            },
            {
                "backdrop_path": "/dYGJ9cI3pUjCUITfxxsO5kEGKTF.jpg",
                "id": 1279433,
                "title": "Inheritance",
                "original_title": "Spadek",
                "overview": "When their rich uncle passes, his mansion of intricate puzzles becomes the backdrop for his estranged family's quest to secure a portion of his wealth.",
                "poster_path": "/A4UklDW0DYytzK5aydQIM3vw4dL.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "pl",
                "genre_ids": [
                    35,
                    9648
                ],
                "popularity": 168.85,
                "release_date": "2024-06-19",
                "video": false,
                "vote_average": 5.634,
                "vote_count": 71
            },
            {
                "backdrop_path": "/rZ8VxBH8QRHGQi9YztBRm3eAsxL.jpg",
                "id": 1279104,
                "title": "The Legend of Catclaws Mountain",
                "original_title": "The Legend of Catclaws Mountain",
                "overview": "Mindy adopts Angel, a high-spirited pony that—according to legend—will lead its owner to gold hidden in the nearby mountains. When Angel is kidnapped by a mad treasure hunter, Mindy and her school friends head into the hills to rescue the pony and hunt for the lost gold. But Mindy meets a mountain man that warns her the treasure is part of an ancient curse—if they remove the gold, they'll destroy the beautiful forest.",
                "poster_path": "/4T3Gz4ZC8H6kaEpq56S4j3mI40L.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    14,
                    10751
                ],
                "popularity": 261.93,
                "release_date": "2024-05-27",
                "video": false,
                "vote_average": 6.7,
                "vote_count": 10
            },
            {
                "backdrop_path": "/aRaZsCMMYvN7KCQKdyntiEiyqF7.jpg",
                "id": 1158416,
                "title": "Waiting for the Night",
                "original_title": "En attendant la nuit",
                "overview": "The day they move into a new neighborhood, the Feral family plans to look as normal and friendly as possible. But their son, Philemon, is no ordinary teenager. When he gets closer to his new neighbor, Camila, his thirst for blood grows and his difference becomes impossible to hide…",
                "poster_path": "/6mcoRtBJZm7RmxWoaL1AbBxNEjJ.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "fr",
                "genre_ids": [
                    18
                ],
                "popularity": 4.427,
                "release_date": "2024-06-05",
                "video": false,
                "vote_average": 5.611,
                "vote_count": 9
            },
            {
                "backdrop_path": "/rJnY56RDLdCTX7FTpnOaoR8q6Iv.jpg",
                "id": 40929,
                "title": "Heaven Help Us",
                "original_title": "Heaven Help Us",
                "overview": "Sixteen-year-old Michael Dunn arrives at St. Basil's Catholic Boys School in Brooklyn circa 1965. There, he befriends all of the misfits in his class as they collide with the repressive faculty and discover the opposite sex as they come of age.",
                "poster_path": "/ncmiNc4FfERFf4k5wSn148DKW4X.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    35,
                    18,
                    10749
                ],
                "popularity": 7.455,
                "release_date": "1985-02-08",
                "video": false,
                "vote_average": 6.381,
                "vote_count": 67
            },
            {
                "backdrop_path": "/mCFIArM43BoSZlMh88cYRtPVoLg.jpg",
                "id": 1294849,
                "title": "Perra Vida",
                "original_title": "Perra Vida",
                "overview": "Romina, a controlling lawyer, wants her daughter's affection. She offers rent for a recovering alcoholic's dog in exchange for a fake boyfriend role. Unexpectedly, it might turn real.",
                "poster_path": "/yAvQOUhmvlo0yrLj2Swnj9gSX5k.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "es",
                "genre_ids": [
                    35,
                    10749
                ],
                "popularity": 71.622,
                "release_date": "2024-05-24",
                "video": false,
                "vote_average": 7.313,
                "vote_count": 16
            },
            {
                "backdrop_path": "/srGWLsYBFyH8LEsW0eH7KqozNqm.jpg",
                "id": 1074054,
                "title": "Matusalén",
                "original_title": "Matusalén",
                "overview": "The story of a forty-something rapper considered a boy by his parents and a grandfather by his classmates. They send him to the university to change and he changes everyone else. This is Matusalen's history.",
                "poster_path": "/za8c915kuzBi9Y7MDK4J1sTTS02.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "es",
                "genre_ids": [
                    35,
                    10402
                ],
                "popularity": 85.589,
                "release_date": "2024-04-05",
                "video": false,
                "vote_average": 6.3,
                "vote_count": 40
            },
            {
                "backdrop_path": "/h8ocFPRoz2NZPFCftdiUrjNUSyX.jpg",
                "id": 595228,
                "title": "Soorarai Pottru",
                "original_title": "சூரரைப் போற்று",
                "overview": "Nedumaaran Rajangam \"Maara\" sets out to make the common man fly and in the process takes on the world's most capital intensive industry and several enemies who stand in his way.",
                "poster_path": "/83AFk8uxCpzAcCnVEnEw3sIKiiE.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "ta",
                "genre_ids": [
                    18,
                    28
                ],
                "popularity": 15.257,
                "release_date": "2020-11-12",
                "video": false,
                "vote_average": 7.778,
                "vote_count": 79
            },
            {
                "backdrop_path": "/ipa9h8BaZgBKWrbDZ9aNfLzYAh7.jpg",
                "id": 1283707,
                "title": "Shadow Land",
                "original_title": "Shadow Land",
                "overview": "Haunted by relentless nightmares foretelling his untimely demise, former President Robert Wainwright summons his past psychiatrist to his upstate residence, who discovers the threat may be more real than imagined.",
                "poster_path": "/n6tk8oqhUki6Zp4PIuQqr1aTSXq.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "en",
                "genre_ids": [
                    53
                ],
                "popularity": 18.124,
                "release_date": "2024-05-31",
                "video": false,
                "vote_average": 4.3,
                "vote_count": 7
            },
            {
                "backdrop_path": "/kVrb3FalKLxI0VSkKJwrIxlwye9.jpg",
                "id": 38025,
                "title": "Invisible Waves",
                "original_title": "คําพิพากษาของมหาสมุทร",
                "overview": "After inadvertently killing his girlfriend, a man flees Macau for Thailand in an attempt to cope with his guilt, and avoid possible arrest. But the relocation doesn't prevent his problems from following him, as his new friends could be potential enemies.",
                "poster_path": "/hkLRQNDOpaFRj8xyW6aTBhFxyLX.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "th",
                "genre_ids": [
                    18,
                    53,
                    80
                ],
                "popularity": 3.826,
                "release_date": "2006-03-02",
                "video": false,
                "vote_average": 5.953,
                "vote_count": 32
            },
            {
                "backdrop_path": "/o6G8llbhWHnhKzNPSSvIbic5NWe.jpg",
                "id": 1118224,
                "title": "Maharaja",
                "original_title": "மகாராஜா",
                "overview": "In a quiet neighborhood, Maharaja, a respected middle-aged barber, lives with his daughter Jothi and Lakshmi. When Maharaja reports to the police that masked intruders attacked him and robbed Lakshmi, the authorities reject this claim, doubting the authenticity of her loss. Despite his repeated attempts to seek help, he was willing to go all the way, even investigating it himself before his daughter returned. As suspicions grow and the Maharaja's sanity is questioned, the mystery deepens.",
                "poster_path": "/s0m4TM1XRAftQStgKpw024RvkJo.jpg",
                "media_type": "movie",
                "adult": false,
                "original_language": "ta",
                "genre_ids": [
                    28,
                    53
                ],
                "popularity": 30.377,
                "release_date": "2024-06-14",
                "video": false,
                "vote_average": 8.4,
                "vote_count": 5
            }
        ],
        "total_pages": 2,
        "total_results": 40
    }

    const images: IImages | null = {
        "backdrops": [
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": null,
                "file_path": "/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",
                "vote_average": 5.392,
                "vote_count": 8,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": null,
                "file_path": "/ga4OLm4qLxPqKLMzjJlqHxVjst3.jpg",
                "vote_average": 5.388,
                "vote_count": 4,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": null,
                "file_path": "/JtN7Q03S3oq7A4KZ7Z3I7m3osP.jpg",
                "vote_average": 5.33,
                "vote_count": 9,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 1080,
                "iso_639_1": null,
                "file_path": "/xHEOGkTom8b2UMq1rsDVqxUZ7Ce.jpg",
                "vote_average": 5.318,
                "vote_count": 3,
                "width": 1920
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": "en",
                "file_path": "/u6nzsgL8kHFO89CUydIW52UY0Og.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 1125,
                "iso_639_1": null,
                "file_path": "/2VW0sA0L945VdQasATMghZemN7I.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 1.778,
                "height": 1890,
                "iso_639_1": null,
                "file_path": "/letUA32spwcZuRaSHlCgcXcdM1m.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 3360
            },
            {
                "aspect_ratio": 1.778,
                "height": 1080,
                "iso_639_1": "es",
                "file_path": "/464ercDI5BPztFKw4BzcL6bkoID.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 1920
            },
            {
                "aspect_ratio": 1.778,
                "height": 1125,
                "iso_639_1": null,
                "file_path": "/2JmEZtZsGVYvcUeMWze9qb1Ui03.jpg",
                "vote_average": 5.19,
                "vote_count": 5,
                "width": 2000
            },
            {
                "aspect_ratio": 1.778,
                "height": 720,
                "iso_639_1": null,
                "file_path": "/wex2zlKvO33bnxQnwaLlxniYNAI.jpg",
                "vote_average": 5.18,
                "vote_count": 3,
                "width": 1280
            },
            {
                "aspect_ratio": 1.776,
                "height": 760,
                "iso_639_1": null,
                "file_path": "/xK2MJAXgYxlJRRMOmGfBkwbvEBD.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 1350
            },
            {
                "aspect_ratio": 1.778,
                "height": 1125,
                "iso_639_1": null,
                "file_path": "/j2gpwLEQemciyabAxpojOoouP0u.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 1.778,
                "height": 1125,
                "iso_639_1": null,
                "file_path": "/vFbFr68nxzX3JDdQUloFg2pOzHB.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 1.778,
                "height": 1125,
                "iso_639_1": null,
                "file_path": "/c2BcrMI91vs7yMov7w3TxE0zwlV.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": null,
                "file_path": "/1OdigEDQoAAz696Lo61RvfECAjS.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": "en",
                "file_path": "/qePB8Wz1z9oyC9N5kjJcmFgvKKn.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": "en",
                "file_path": "/sviLo1fTCqH1H3exeWan5oPl4Ip.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": "es",
                "file_path": "/2HuVvY5GLrrqLmAQdjaqOpLl7nF.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 3840
            },
            {
                "aspect_ratio": 1.778,
                "height": 2160,
                "iso_639_1": "es",
                "file_path": "/YCtJlgYsa3qYb26qtTYVDoyqmm.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 3840
            }
        ],
        "id": 573435,
        "logos": [
            {
                "aspect_ratio": 1.778,
                "height": 1080,
                "iso_639_1": "en",
                "file_path": "/A38YMEsKLrPftHlNABasQR1uj1R.svg",
                "vote_average": 5.384,
                "vote_count": 2,
                "width": 1920
            },
            {
                "aspect_ratio": 2.483,
                "height": 271,
                "iso_639_1": "en",
                "file_path": "/8RuqOjVeNEyjxNxWY1R5IgtAU8V.png",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 673
            },
            {
                "aspect_ratio": 2.847,
                "height": 281,
                "iso_639_1": "sk",
                "file_path": "/m0VXoBX4Gob6m62r60WuG5Cohag.png",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 800
            },
            {
                "aspect_ratio": 2.847,
                "height": 281,
                "iso_639_1": "cs",
                "file_path": "/gw1TB6hKJ3rDGsKwrDbmr3x37hk.png",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 800
            },
            {
                "aspect_ratio": 2.2,
                "height": 295,
                "iso_639_1": "pt",
                "file_path": "/79ti1rWqMsvjP4l1m1HO6RhfLEH.png",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 649
            },
            {
                "aspect_ratio": 1.778,
                "height": 1080,
                "iso_639_1": "en",
                "file_path": "/uwILv4QmReVbqpzVnzM2RxjDB83.svg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1920
            },
            {
                "aspect_ratio": 5.118,
                "height": 153,
                "iso_639_1": "ru",
                "file_path": "/A2sxy8j3Uf1Jed7zB2Rc6fAIKNc.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 783
            },
            {
                "aspect_ratio": 2.522,
                "height": 515,
                "iso_639_1": "he",
                "file_path": "/cpWHXdBVfzpLKkH109g0eWgM6JC.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1299
            },
            {
                "aspect_ratio": 2.817,
                "height": 284,
                "iso_639_1": "sk",
                "file_path": "/zb9FttrDrEnCmYEedCtJA72Fy7d.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 800
            },
            {
                "aspect_ratio": 2.817,
                "height": 284,
                "iso_639_1": "cs",
                "file_path": "/9P05H0wUv3xp4PrLcAzpsdZy3km.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 800
            },
            {
                "aspect_ratio": 1.809,
                "height": 1291,
                "iso_639_1": "en",
                "file_path": "/4KqzvqfiXk7gPH6g1zwyPA48NKn.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2336
            },
            {
                "aspect_ratio": 8.426,
                "height": 345,
                "iso_639_1": "en",
                "file_path": "/6Lar11dUiouQlb0xDAcwU9X16TP.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2907
            },
            {
                "aspect_ratio": 2.83,
                "height": 2416,
                "iso_639_1": "es",
                "file_path": "/wZOqfOtqVqZMsUyjTLbNdENaYNg.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 6838
            },
            {
                "aspect_ratio": 2.831,
                "height": 1504,
                "iso_639_1": "es",
                "file_path": "/zdgjLXIsRRiiva79dsrsza5bH1X.png",
                "vote_average": 0,
                "vote_count": 0,
                "width": 4258
            },
            {
                "aspect_ratio": 2.833,
                "height": 504,
                "iso_639_1": "es",
                "file_path": "/ySAY1sKexkYypHavNJ95eMURY01.svg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1428
            }
        ],
        "posters": [
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/nP6RliHjxsz4irTKsxe8FRhKZYl.jpg",
                "vote_average": 5.562,
                "vote_count": 25,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "es",
                "file_path": "/5jI2vEHJReAx8iFDmhC2O3yW37w.jpg",
                "vote_average": 5.454,
                "vote_count": 3,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": null,
                "file_path": "/sZVYVK1cyeCCxYbKuZJBlFiEZ9V.jpg",
                "vote_average": 5.384,
                "vote_count": 2,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": null,
                "file_path": "/wOJPQIud5AXEgFT8mESVTIQb5PB.jpg",
                "vote_average": 5.384,
                "vote_count": 2,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": null,
                "file_path": "/vTXH3p7sZ0g3gnhl1AqpqKHoONW.jpg",
                "vote_average": 5.384,
                "vote_count": 2,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "pt",
                "file_path": "/ak6VZDHms5T4p0eFISk336kqjR6.jpg",
                "vote_average": 5.384,
                "vote_count": 2,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 2100,
                "iso_639_1": "en",
                "file_path": "/57yov1Boc2I0VJ753DnoAHnaiXG.jpg",
                "vote_average": 5.338,
                "vote_count": 13,
                "width": 1400
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/s63kP4H67DQItzHGP4CzSKfdGgW.jpg",
                "vote_average": 5.326,
                "vote_count": 7,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "it",
                "file_path": "/9VRDZbTg9eAfY7ZqMyU1fbq897W.jpg",
                "vote_average": 5.318,
                "vote_count": 3,
                "width": 2000
            },
            {
                "aspect_ratio": 0.666,
                "height": 1999,
                "iso_639_1": "zh",
                "file_path": "/vbnH411ZmLz2ZmkUwq74HVEIFJZ.jpg",
                "vote_average": 5.318,
                "vote_count": 3,
                "width": 1332
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/ixUOlggHDTosQfzEW54Tgqq583V.jpg",
                "vote_average": 5.318,
                "vote_count": 3,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 2100,
                "iso_639_1": "hu",
                "file_path": "/zACuJAEYRxNvfRMtufOJv3KDML5.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 1400
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "uk",
                "file_path": "/6hGTGI5SqOXum2NbqZL3Np5oLdo.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "ru",
                "file_path": "/1d44Y7WsS6WTzVDmS0sJyzJNb2N.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 2362,
                "iso_639_1": "sk",
                "file_path": "/99IZgC3gfDLgyDJQA4ZPNw80mtT.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 1575
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "cs",
                "file_path": "/nds7wfg3bFTgUAZeT53wAEGLewI.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.699,
                "height": 1716,
                "iso_639_1": "tr",
                "file_path": "/qWWsxnHBajcAjSlL6EsHdtIBmf9.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 1200
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": null,
                "file_path": "/xuBLTYNDJNgRUDl4xFNWNxcppDD.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "bg",
                "file_path": "/4A6lCa1KD7q1HGtsRdPplBDSoWJ.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.701,
                "height": 1426,
                "iso_639_1": "hu",
                "file_path": "/dSAPyA7sQ9qwsapN65NPdiaXGlS.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "es",
                "file_path": "/sH1papavCNl0CcCwHePQ6kohnhb.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "fr",
                "file_path": "/zCZJXSDPZKGml4I5zvxNpdx8jra.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "th",
                "file_path": "/huVg7GXt0aTmaGlMIH17aHLtCUk.jpg",
                "vote_average": 5.312,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1350,
                "iso_639_1": "ru",
                "file_path": "/vI72e6DY8BaYvDBrHZeGPq6dJ9X.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 900
            },
            {
                "aspect_ratio": 0.675,
                "height": 757,
                "iso_639_1": "es",
                "file_path": "/gPX5rCARA3rUywjdgLP5o7VzNJN.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 511
            },
            {
                "aspect_ratio": 0.702,
                "height": 1709,
                "iso_639_1": "he",
                "file_path": "/nwfbwHg06gCXfcPmoFU7Y3hZ0Fq.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1200
            },
            {
                "aspect_ratio": 0.667,
                "height": 1605,
                "iso_639_1": "he",
                "file_path": "/kKYnQHH48rhL5xisNcQeLHBTGxU.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1070
            },
            {
                "aspect_ratio": 0.667,
                "height": 1779,
                "iso_639_1": "es",
                "file_path": "/53y0ETa1TGdVrMEVx7oLW86ay8r.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1186
            },
            {
                "aspect_ratio": 0.667,
                "height": 1620,
                "iso_639_1": "en",
                "file_path": "/fGYDtPRbXchmPkXihJeYHFk1qdb.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1080
            },
            {
                "aspect_ratio": 0.675,
                "height": 2965,
                "iso_639_1": "zh",
                "file_path": "/mCYBz9Rk62sRkaqqoMoNGmxmMWl.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1709,
                "iso_639_1": "he",
                "file_path": "/A6qw0RS6DPskTjA8iF2Eo1LAfqo.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1140
            },
            {
                "aspect_ratio": 0.667,
                "height": 1709,
                "iso_639_1": "he",
                "file_path": "/x9tFT73WOJuJEgtTXDYuFmCXmeR.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1140
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/cWdRhqxS8av1rqIBXZnzUpfIrE9.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 2000
            },
            {
                "aspect_ratio": 0.675,
                "height": 1600,
                "iso_639_1": "fr",
                "file_path": "/rHRErXpF2AIhw6i4GD1ikqy8uak.jpg",
                "vote_average": 5.246,
                "vote_count": 2,
                "width": 1080
            },
            {
                "aspect_ratio": 0.667,
                "height": 2048,
                "iso_639_1": "th",
                "file_path": "/nJzoEn3gq4MvawXOAcqDT4YaV8f.jpg",
                "vote_average": 5.238,
                "vote_count": 0,
                "width": 1366
            },
            {
                "aspect_ratio": 0.677,
                "height": 1280,
                "iso_639_1": "zh",
                "file_path": "/ngzLYcGzaAl7fHEgS5tJjMh8kX2.jpg",
                "vote_average": 5.18,
                "vote_count": 3,
                "width": 866
            },
            {
                "aspect_ratio": 0.667,
                "height": 2100,
                "iso_639_1": "en",
                "file_path": "/5mmqAjpPjqD44rNwRXTHPoAQLBb.jpg",
                "vote_average": 5.18,
                "vote_count": 3,
                "width": 1400
            },
            {
                "aspect_ratio": 0.675,
                "height": 2965,
                "iso_639_1": "en",
                "file_path": "/kRxl6cT2YBLap0NyEdR2zqYfps9.jpg",
                "vote_average": 5.18,
                "vote_count": 3,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/xs84wQpWUxVo3InnVALnJtclocW.jpg",
                "vote_average": 5.18,
                "vote_count": 3,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1134,
                "iso_639_1": "en",
                "file_path": "/mCAIYEtOajcdaJPEHGUUo63vurC.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 756
            },
            {
                "aspect_ratio": 0.667,
                "height": 1470,
                "iso_639_1": "de",
                "file_path": "/3n38bN08n2n5YXxCG6VlD0gQMYp.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 980
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": null,
                "file_path": "/vpKy1Vqw6arB2hyBaKQVZiKjA3J.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "pt",
                "file_path": "/wleinVtd0XSNiSDbD16RAd2cNYn.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "pt",
                "file_path": "/neRJNKml1hJg05AJy1Nycew3hn5.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/iVDIlTAitGk8BxKuiXBAKz0ycQX.jpg",
                "vote_average": 5.172,
                "vote_count": 1,
                "width": 2000
            },
            {
                "aspect_ratio": 0.68,
                "height": 1000,
                "iso_639_1": "en",
                "file_path": "/bKHed0TUCvbiu9I99tbHZzPHvhv.jpg",
                "vote_average": 5.118,
                "vote_count": 4,
                "width": 680
            },
            {
                "aspect_ratio": 0.675,
                "height": 2964,
                "iso_639_1": "zh",
                "file_path": "/cxPgBz2mnv3hxyGwK7Y4OhGqvpS.jpg",
                "vote_average": 5.106,
                "vote_count": 2,
                "width": 2000
            },
            {
                "aspect_ratio": 0.677,
                "height": 1280,
                "iso_639_1": "ru",
                "file_path": "/dtgoXVGWFmxw0ikDxxGIfGKx73z.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 866
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "vi",
                "file_path": "/jEVHd1JId1zrA1drCknGIvHX70o.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.674,
                "height": 949,
                "iso_639_1": "es",
                "file_path": "/en7ukwiIReP0ov4yWMvYHwUSLDd.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 640
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "ja",
                "file_path": "/wmkyaKiqwugRriDkxuCNnE84Y4G.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "uk",
                "file_path": "/7TazqZ0cxN5zZcDUJgPooyyWg3c.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 2850,
                "iso_639_1": "zh",
                "file_path": "/7HAcl7CEmjyKeTRfUB8mKrBxIHF.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1900
            },
            {
                "aspect_ratio": 0.667,
                "height": 1350,
                "iso_639_1": "pl",
                "file_path": "/9iH7jNWI4vctHz7sTcJBoXhGGDH.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 900
            },
            {
                "aspect_ratio": 0.7,
                "height": 2048,
                "iso_639_1": "lt",
                "file_path": "/mQ6fm0bUdv8eVduqrZqxvdIim3L.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1434
            },
            {
                "aspect_ratio": 0.667,
                "height": 2362,
                "iso_639_1": "sk",
                "file_path": "/sfxCzqJuObc23NfVMqqOj1q1X51.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1575
            },
            {
                "aspect_ratio": 0.675,
                "height": 1601,
                "iso_639_1": "it",
                "file_path": "/6G1sYABxwes7OvHGQrONoweDtxS.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1080
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "cs",
                "file_path": "/4OArDyUuSojklwYGONBd65B0nt1.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 2337,
                "iso_639_1": "ko",
                "file_path": "/wIrhEUBWjRmZuL1Ix41cF2LhJrW.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1558
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/r8BASPhx2IEfAWc7fZLgl6rzOoW.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "bg",
                "file_path": "/hA3zpuqRYudXrHxGe3FpR3PMoBA.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "nl",
                "file_path": "/gQZodRNtAl7IJTyWLI0heUQQk4K.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 2480,
                "iso_639_1": "sv",
                "file_path": "/2LPqnXzCmusYuEblCWfHujDY8fl.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1653
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "ka",
                "file_path": "/awzWT1sjYWVAX76Yl0t1BcG77lX.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1350,
                "iso_639_1": "hr",
                "file_path": "/4xyjiXvPJ3u7wmkc9oydTfQvsjK.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 900
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "ar",
                "file_path": "/ltmyhLmHqcwHlJvswOLsLK4whq9.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.707,
                "height": 2828,
                "iso_639_1": "zh",
                "file_path": "/7E9dk2MsT0O8PnQtuGr9DHeiswx.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "zh",
                "file_path": "/mYwTrbpopoYE74po8FouhV2qCFa.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.714,
                "height": 2800,
                "iso_639_1": "zh",
                "file_path": "/8LrzEUmz9LRwiU5BLEp3xatDysY.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.675,
                "height": 2963,
                "iso_639_1": "zh",
                "file_path": "/o1NO6hbvU0SVeDXRok9TXCzB1Y6.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.675,
                "height": 2520,
                "iso_639_1": "zh",
                "file_path": "/cc25cgDEc4BLlLDhNmsDr8yfuXd.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1701
            },
            {
                "aspect_ratio": 0.714,
                "height": 2800,
                "iso_639_1": "zh",
                "file_path": "/sl5LBZSdocSiPZL4Vb0Ol6tQ3Ww.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.675,
                "height": 2520,
                "iso_639_1": "zh",
                "file_path": "/ol0ufP79EbgPsHtICs67edreKOD.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1701
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/bouVxb8I5V6Dmke6uSs8YCbNG3Z.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.7,
                "height": 2286,
                "iso_639_1": "el",
                "file_path": "/8POlUC8EOfV9lVX7YQUAWlcbVwm.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1600
            },
            {
                "aspect_ratio": 0.667,
                "height": 750,
                "iso_639_1": "ro",
                "file_path": "/ouy9n28pPXA1iNiGbgCsvyRAIau.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 500
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "ro",
                "file_path": "/fj7EYTp9MLTpMzktTVbubzkR1vJ.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "vi",
                "file_path": "/6gsYPVffOS8j7fvInc3JIEoBST0.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.665,
                "height": 1245,
                "iso_639_1": "en",
                "file_path": "/v5jDgOCSXzGeRIykmoyM9Ad03h6.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 828
            },
            {
                "aspect_ratio": 0.675,
                "height": 1186,
                "iso_639_1": "es",
                "file_path": "/5UdPqMfhNLWqzdNJxMGNohvGLe.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 800
            },
            {
                "aspect_ratio": 0.667,
                "height": 2806,
                "iso_639_1": "tr",
                "file_path": "/gEQSx2fXOuKaDA2yvjtnAN4okza.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1871
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "es",
                "file_path": "/oT4xH0Q8biS0aeu7X34QHURKXup.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "es",
                "file_path": "/2KC2KGMTKOja0OfWXDQJCRElhNT.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "es",
                "file_path": "/25PVk2NFoZoCnaqxb4nSQqwxNd7.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/9DJC3dPhaRvV6QvnefC8iL3osN1.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/jjn2b269WVsUDVTTQmwxOg4q0Sy.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "en",
                "file_path": "/ccX1weyHLkjDxG4NJEIPgwsW3t8.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "fa",
                "file_path": "/e99EsxqzJY8KmbbSzuhcQGdVVR2.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "fa",
                "file_path": "/tBpaBzyqJaSI96gjAspWE978ZNG.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "fa",
                "file_path": "/ZeL3xvxurD88Ueoa4sCLFUGVN8.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.669,
                "height": 1237,
                "iso_639_1": "en",
                "file_path": "/tV67RB0hNG8qPSVRymC4LRto0Zm.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 828
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "sa",
                "file_path": "/jeGMEmlIuZZgjsfHf7HUd97OyN8.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.675,
                "height": 2132,
                "iso_639_1": "th",
                "file_path": "/9eWB1xfKixF2f4DQPkPQV9u1nEa.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1440
            },
            {
                "aspect_ratio": 0.67,
                "height": 1235,
                "iso_639_1": "en",
                "file_path": "/3lqnULXaNm4eSd1zqcknEj4CSP2.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 828
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "fr",
                "file_path": "/kyl7bqWfbeHcXqTEaI8fK0CVVMj.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "fr",
                "file_path": "/4QNq8tUylQGZDMTb98LAR0xdR7.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": "fr",
                "file_path": "/o34knWB5gIc8GMrjEI5jdfZPoY1.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": null,
                "file_path": "/jhh4jTmf28LR8Rm7NmxJ81U2862.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 3000,
                "iso_639_1": null,
                "file_path": "/fq1hkjM3UwVyKlwvd5VDveHeM2m.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 2000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "fr",
                "file_path": "/uknsasmoE0VimeXNGoj8l7JHW43.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "fr",
                "file_path": "/m9xwp80sOzG2tjuJ4oMpDqR268f.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 1500,
                "iso_639_1": "fr",
                "file_path": "/yOhsdlCx592DPt3RPaYRrM3F64z.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 1000
            },
            {
                "aspect_ratio": 0.667,
                "height": 750,
                "iso_639_1": "sl",
                "file_path": "/ct9ZOoVsAxK7c08RxsjlHhBhfKv.jpg",
                "vote_average": 0,
                "vote_count": 0,
                "width": 500
            }
        ]
    }
*/