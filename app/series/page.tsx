
import { MainSliderSeries } from "../components/MainSlider/MainSliderSeries"
import { CategorySlider } from "../components/CategorySlider/CategorySlider"
import { MovieSliderGeneral } from "../components/MovieSlider/MovieSliderGeneral"
import { SerieCard } from "../components/SerieCard/SerieCard"
import { SerieCardUpcoming } from "../components/SerieCardUpcoming/SerieCardUpcoming"
import { ISerieResponse } from "../interfaces/responses"
import styles from "./series.module.scss"
import { ISerie } from "../interfaces/serie"
import { FormattedDate, FormattedDateSearch } from "../utils/helpers"


export default async function Page() {

    const airingToday: ISerieResponse =
    {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg",
                "genre_ids": [
                    10765,
                    10759
                ],
                "id": 76479,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Boys",
                "overview": "La serie tiene lugar en un mundo en el que los superhéroes representan el lado oscuro de la celebridad y la fama. Un grupo de vigilantes que se hacen llamar \"The Boys\" decide hacer todo lo posible por frenar a los superhéroes que están perjudicando a la sociedad, independientemente de los riesgos que ello conlleva.",
                "popularity": 3089.748,
                "poster_path": "/cSAN6ofLRwRiuwOHYD81p4k6Yks.jpg",
                "first_air_date": "2019-07-25",
                "name": "The Boys",
                "vote_average": 8.469,
                "vote_count": 9686
            },
            {
                "adult": false,
                "backdrop_path": "/mZCq3ldk7hUIyDvfZIOvTrxPWYS.jpg",
                "genre_ids": [],
                "id": 209374,
                "origin_country": [
                    "US"
                ],
                "original_language": "es",
                "original_name": "Top Chef VIP",
                "overview": "Dieciséis celebridades ponen a prueba sus habilidades culinarias y son juzgadas por un panel de chefs profesionales con un concursante eliminado cada semana. El ganador recibirá 100.000 dólares estadounidenses.",
                "popularity": 2841.349,
                "poster_path": "/cw6M4c2MpLSzqzmrrqpSJlEbwCF.jpg",
                "first_air_date": "2022-08-09",
                "name": "Top Chef VIP",
                "vote_average": 4.2,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/i8iqYtAy9qcO5RSrA1f6fY1n6SN.jpg",
                "genre_ids": [
                    10766
                ],
                "id": 235484,
                "origin_country": [
                    "ZA"
                ],
                "original_language": "af",
                "original_name": "Suidooster",
                "overview": "",
                "popularity": 2859.527,
                "poster_path": "/naCgSiacvV685kait6fBvhVhdce.jpg",
                "first_air_date": "2015-11-16",
                "name": "Suidooster",
                "vote_average": 8.273,
                "vote_count": 11
            },
            {
                "adult": false,
                "backdrop_path": "/2Bkqjc9tNWo3KLr1aRYyJ7vMQtM.jpg",
                "genre_ids": [
                    10764
                ],
                "id": 235493,
                "origin_country": [
                    "NL"
                ],
                "original_language": "nl",
                "original_name": "De Bondgenoten",
                "overview": "",
                "popularity": 2787.042,
                "poster_path": "/wsipinibYxrZhpkQ6MKxIMgL0hv.jpg",
                "first_air_date": "2023-10-22",
                "name": "De Bondgenoten",
                "vote_average": 7.2,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/uCY1j1YqfDWRbbS7hJwd9szX1sJ.jpg",
                "genre_ids": [
                    10766,
                    18,
                    35
                ],
                "id": 237480,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "No Rancho Fundo",
                "overview": "",
                "popularity": 2351.525,
                "poster_path": "/eONkvEahSQJan1HTzWJKjvaMe29.jpg",
                "first_air_date": "2024-04-15",
                "name": "No Rancho Fundo",
                "vote_average": 4.95,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/lhdUwhInXu31qHm65jwBAlpTp8P.jpg",
                "genre_ids": [
                    10767
                ],
                "id": 82873,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Kelly Clarkson Show",
                "overview": "",
                "popularity": 2372.036,
                "poster_path": "/9Gg1oM8Us8gCS5aJA8e0ZRuIHnf.jpg",
                "first_air_date": "2019-09-09",
                "name": "The Kelly Clarkson Show",
                "vote_average": 6.255,
                "vote_count": 55
            },
            {
                "adult": false,
                "backdrop_path": "/5S0SI4NjyMji05OPL0GOZ4BsiMh.jpg",
                "genre_ids": [
                    10764
                ],
                "id": 136166,
                "origin_country": [
                    "NL"
                ],
                "original_language": "nl",
                "original_name": "Lang Leve de Liefde",
                "overview": "",
                "popularity": 2242.99,
                "poster_path": "/9lpvvzEl5kViIc2vUJG4QKzj2ds.jpg",
                "first_air_date": "2020-01-20",
                "name": "Lang Leve de Liefde",
                "vote_average": 6.333,
                "vote_count": 6
            },
            {
                "adult": false,
                "backdrop_path": "/vSrR7pq1wtPw85XpiOrdNcYdtUb.jpg",
                "genre_ids": [
                    18
                ],
                "id": 239526,
                "origin_country": [
                    "ES"
                ],
                "original_language": "es",
                "original_name": "Sueños de libertad",
                "overview": "",
                "popularity": 2085.664,
                "poster_path": "/95RVeMWMvk97PBW0msryIJC32XD.jpg",
                "first_air_date": "2024-02-25",
                "name": "Sueños de libertad",
                "vote_average": 6,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/wqebNDaopLixqxeQRDaqhNfy866.jpg",
                "genre_ids": [
                    18
                ],
                "id": 242551,
                "origin_country": [
                    "TR"
                ],
                "original_language": "tr",
                "original_name": "Rüzgarlı Tepe",
                "overview": "",
                "popularity": 1839.656,
                "poster_path": "/vGrrdx21rS69tl55mxpl9pn9ebx.jpg",
                "first_air_date": "2024-01-01",
                "name": "Rüzgarlı Tepe",
                "vote_average": 7.9,
                "vote_count": 15
            },
            {
                "adult": false,
                "backdrop_path": "/dfnKyfoyvSlcxb6gAgmyYS1vWk2.jpg",
                "genre_ids": [
                    18
                ],
                "id": 215709,
                "origin_country": [
                    "TR"
                ],
                "original_language": "tr",
                "original_name": "Esaret",
                "overview": "",
                "popularity": 2023.768,
                "poster_path": "/d1YiLLhjGnCoC0D4G0ri2MloFqO.jpg",
                "first_air_date": "2022-11-21",
                "name": "Esaret",
                "vote_average": 8.5,
                "vote_count": 6
            },
            {
                "adult": false,
                "backdrop_path": "/jESV5q99Xa7lGHu0pGHcxXl5AGe.jpg",
                "genre_ids": [
                    18,
                    10751
                ],
                "id": 242722,
                "origin_country": [
                    "IN"
                ],
                "original_language": "hi",
                "original_name": "श्रीमद् रामायण",
                "overview": "",
                "popularity": 1635.374,
                "poster_path": "/aCDK83ykQYnQGFOTfiLjnoqXv1b.jpg",
                "first_air_date": "2024-01-22",
                "name": "श्रीमद् रामायण",
                "vote_average": 9,
                "vote_count": 2
            },
            {
                "adult": false,
                "backdrop_path": "/7EU7IuIk6CCmYgAVSR91twaVzOL.jpg",
                "genre_ids": [
                    10766,
                    18
                ],
                "id": 243117,
                "origin_country": [
                    "FR"
                ],
                "original_language": "fr",
                "original_name": "Plus belle la vie, encore plus belle",
                "overview": "",
                "popularity": 1590.06,
                "poster_path": "/5js5JCtxfiYF2MdNn0zGyCwyg8L.jpg",
                "first_air_date": "2024-01-08",
                "name": "Plus belle la vie, encore plus belle",
                "vote_average": 3,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/zwXvUwXgOHbBJmZSFLmBfAwHDE6.jpg",
                "genre_ids": [
                    18
                ],
                "id": 243487,
                "origin_country": [
                    "MX"
                ],
                "original_language": "es",
                "original_name": "Vivir de amor",
                "overview": "Hace veinte años Elena perdió a su hija Frida y la dieron por muerta. Alma y Antonio la encontraron y la adoptaron. Ahora, años después, Frida descubre la verdad.  Basada en la historia portuguesa de 2010 creado por Pedro Lopes y Aguinaldo Silva, \"Lazos de sangre\".",
                "popularity": 1577.115,
                "poster_path": "/5I0koi3lvHtGDhYvfAkLssQKEGO.jpg",
                "first_air_date": "2024-01-29",
                "name": "Vivir de amor",
                "vote_average": 7.577,
                "vote_count": 52
            },
            {
                "adult": false,
                "backdrop_path": "/bIhmqQNXcyWRzH153d3jaCbLTy3.jpg",
                "genre_ids": [
                    10759,
                    10765,
                    18,
                    10751,
                    10766,
                    35
                ],
                "id": 244643,
                "origin_country": [
                    "MX"
                ],
                "original_language": "es",
                "original_name": "El amor no tiene receta",
                "overview": "Paz, cocinera talentosa, dedica su vida a la búsqueda de su hija secuestrada al nacer. Se enamora de Esteban, un viudo con tres hijos. Juntos deberán superar la oposición de sus familias a su romance.",
                "popularity": 1566.158,
                "poster_path": "/fDRy8B1KdapuvBsgkCkEETY4MNr.jpg",
                "first_air_date": "2024-02-19",
                "name": "El amor no tiene receta",
                "vote_average": 7.66,
                "vote_count": 51
            },
            {
                "adult": false,
                "backdrop_path": "/jWXrQstj7p3Wl5MfYWY6IHqRpDb.jpg",
                "genre_ids": [
                    10763
                ],
                "id": 94722,
                "origin_country": [
                    "DE"
                ],
                "original_language": "de",
                "original_name": "Tagesschau",
                "overview": "Programa matutino de noticias alemán, el programa más antiguo aún existente en la televisión alemana.",
                "popularity": 1400.484,
                "poster_path": "/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg",
                "first_air_date": "1952-12-26",
                "name": "Noticias Diarias",
                "vote_average": 6.8,
                "vote_count": 202
            },
            {
                "adult": false,
                "backdrop_path": "/aRtLEHMrcbG5InnfL8l3ZdIWS5I.jpg",
                "genre_ids": [
                    10751,
                    18
                ],
                "id": 246331,
                "origin_country": [
                    "KR"
                ],
                "original_language": "ko",
                "original_name": "수지맞은 우리",
                "overview": "",
                "popularity": 1481.203,
                "poster_path": "/gErKBJHpxVqGTfYwoNaqtMuuMF1.jpg",
                "first_air_date": "2024-03-25",
                "name": "수지맞은 우리",
                "vote_average": 6.3,
                "vote_count": 3
            },
            {
                "adult": false,
                "backdrop_path": "/hpZ5VJP1MvQjuFUMORuAoDFAH30.jpg",
                "genre_ids": [
                    35,
                    10766,
                    10759
                ],
                "id": 222289,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "Família é Tudo",
                "overview": "",
                "popularity": 1270.609,
                "poster_path": "/tDbJuSfVhf3ZnxiJrXlXEALyAz5.jpg",
                "first_air_date": "2024-03-04",
                "name": "Família é Tudo",
                "vote_average": 6.4,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/butPVWgcbtAjL9Z7jU7Xj1KA8KD.jpg",
                "genre_ids": [
                    10767,
                    35
                ],
                "id": 22980,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Watch What Happens Live with Andy Cohen",
                "overview": "",
                "popularity": 1591.286,
                "poster_path": "/onSD9UXfJwrMXWhq7UY7hGF2S1h.jpg",
                "first_air_date": "2009-07-16",
                "name": "Watch What Happens Live with Andy Cohen",
                "vote_average": 5.009,
                "vote_count": 55
            },
            {
                "adult": false,
                "backdrop_path": "/bEKRyT7WN5TjFKv0JTWI2cyNlak.jpg",
                "genre_ids": [
                    10766,
                    18
                ],
                "id": 223365,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "Renascer",
                "overview": "",
                "popularity": 1285.985,
                "poster_path": "/kUWvvMkNIf21UUDmHjYw55v6o7C.jpg",
                "first_air_date": "2024-01-22",
                "name": "Renascer",
                "vote_average": 7.1,
                "vote_count": 15
            },
            {
                "adult": false,
                "backdrop_path": "/iF1W066gp2pkPMAqNDCLpqcCXIW.jpg",
                "genre_ids": [
                    18
                ],
                "id": 248155,
                "origin_country": [
                    "KR"
                ],
                "original_language": "ko",
                "original_name": "용감무쌍 용수정",
                "overview": "",
                "popularity": 1271.756,
                "poster_path": "/fcq6mxceIRT7HhKuD020va7lEyc.jpg",
                "first_air_date": "2024-05-06",
                "name": "용감무쌍 용수정",
                "vote_average": 8.5,
                "vote_count": 2
            }
        ],
        "total_pages": 12,
        "total_results": 232
    }

    const popularSeries: ISerieResponse = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
                "genre_ids": [
                    10765,
                    18,
                    10759
                ],
                "id": 94997,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "House of the Dragon",
                "overview": "La casa del dragon Basada en el libro 'Fuego y Sangre' de George R.R. Martin. La serie se centra en la casa Targaryen, trescientos años antes de los eventos vistos en 'Juego de Tronos'.",
                "popularity": 4410.688,
                "poster_path": "/8MaxftF69sEAAD5673vTjIl8yT3.jpg",
                "first_air_date": "2022-08-21",
                "name": "La Casa del Dragón",
                "vote_average": 8.422,
                "vote_count": 4201
            },
            {
                "adult": false,
                "backdrop_path": "/mZCq3ldk7hUIyDvfZIOvTrxPWYS.jpg",
                "genre_ids": [],
                "id": 209374,
                "origin_country": [
                    "US"
                ],
                "original_language": "es",
                "original_name": "Top Chef VIP",
                "overview": "Dieciséis celebridades ponen a prueba sus habilidades culinarias y son juzgadas por un panel de chefs profesionales con un concursante eliminado cada semana. El ganador recibirá 100.000 dólares estadounidenses.",
                "popularity": 2841.349,
                "poster_path": "/cw6M4c2MpLSzqzmrrqpSJlEbwCF.jpg",
                "first_air_date": "2022-08-09",
                "name": "Top Chef VIP",
                "vote_average": 4.2,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/i8iqYtAy9qcO5RSrA1f6fY1n6SN.jpg",
                "genre_ids": [
                    10766
                ],
                "id": 235484,
                "origin_country": [
                    "ZA"
                ],
                "original_language": "af",
                "original_name": "Suidooster",
                "overview": "",
                "popularity": 2859.527,
                "poster_path": "/naCgSiacvV685kait6fBvhVhdce.jpg",
                "first_air_date": "2015-11-16",
                "name": "Suidooster",
                "vote_average": 8.273,
                "vote_count": 11
            },
            {
                "adult": false,
                "backdrop_path": "/2Bkqjc9tNWo3KLr1aRYyJ7vMQtM.jpg",
                "genre_ids": [
                    10764
                ],
                "id": 235493,
                "origin_country": [
                    "NL"
                ],
                "original_language": "nl",
                "original_name": "De Bondgenoten",
                "overview": "",
                "popularity": 2787.042,
                "poster_path": "/wsipinibYxrZhpkQ6MKxIMgL0hv.jpg",
                "first_air_date": "2023-10-22",
                "name": "De Bondgenoten",
                "vote_average": 7.2,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/uCY1j1YqfDWRbbS7hJwd9szX1sJ.jpg",
                "genre_ids": [
                    10766,
                    18,
                    35
                ],
                "id": 237480,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "No Rancho Fundo",
                "overview": "",
                "popularity": 2351.525,
                "poster_path": "/eONkvEahSQJan1HTzWJKjvaMe29.jpg",
                "first_air_date": "2024-04-15",
                "name": "No Rancho Fundo",
                "vote_average": 4.95,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/lhdUwhInXu31qHm65jwBAlpTp8P.jpg",
                "genre_ids": [
                    10767
                ],
                "id": 82873,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Kelly Clarkson Show",
                "overview": "",
                "popularity": 2372.036,
                "poster_path": "/9Gg1oM8Us8gCS5aJA8e0ZRuIHnf.jpg",
                "first_air_date": "2019-09-09",
                "name": "The Kelly Clarkson Show",
                "vote_average": 6.255,
                "vote_count": 55
            },
            {
                "adult": false,
                "backdrop_path": "/5S0SI4NjyMji05OPL0GOZ4BsiMh.jpg",
                "genre_ids": [
                    10764
                ],
                "id": 136166,
                "origin_country": [
                    "NL"
                ],
                "original_language": "nl",
                "original_name": "Lang Leve de Liefde",
                "overview": "",
                "popularity": 2242.99,
                "poster_path": "/9lpvvzEl5kViIc2vUJG4QKzj2ds.jpg",
                "first_air_date": "2020-01-20",
                "name": "Lang Leve de Liefde",
                "vote_average": 6.333,
                "vote_count": 6
            },
            {
                "adult": false,
                "backdrop_path": "/vSrR7pq1wtPw85XpiOrdNcYdtUb.jpg",
                "genre_ids": [
                    18
                ],
                "id": 239526,
                "origin_country": [
                    "ES"
                ],
                "original_language": "es",
                "original_name": "Sueños de libertad",
                "overview": "",
                "popularity": 2085.664,
                "poster_path": "/95RVeMWMvk97PBW0msryIJC32XD.jpg",
                "first_air_date": "2024-02-25",
                "name": "Sueños de libertad",
                "vote_average": 6,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg",
                "genre_ids": [
                    10765,
                    10759
                ],
                "id": 76479,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Boys",
                "overview": "La serie tiene lugar en un mundo en el que los superhéroes representan el lado oscuro de la celebridad y la fama. Un grupo de vigilantes que se hacen llamar \"The Boys\" decide hacer todo lo posible por frenar a los superhéroes que están perjudicando a la sociedad, independientemente de los riesgos que ello conlleva.",
                "popularity": 3089.748,
                "poster_path": "/cSAN6ofLRwRiuwOHYD81p4k6Yks.jpg",
                "first_air_date": "2019-07-25",
                "name": "The Boys",
                "vote_average": 8.469,
                "vote_count": 9684
            },
            {
                "adult": false,
                "backdrop_path": "/wqebNDaopLixqxeQRDaqhNfy866.jpg",
                "genre_ids": [
                    18
                ],
                "id": 242551,
                "origin_country": [
                    "TR"
                ],
                "original_language": "tr",
                "original_name": "Rüzgarlı Tepe",
                "overview": "",
                "popularity": 1839.656,
                "poster_path": "/vGrrdx21rS69tl55mxpl9pn9ebx.jpg",
                "first_air_date": "2024-01-01",
                "name": "Rüzgarlı Tepe",
                "vote_average": 7.9,
                "vote_count": 15
            },
            {
                "adult": false,
                "backdrop_path": "/dfnKyfoyvSlcxb6gAgmyYS1vWk2.jpg",
                "genre_ids": [
                    18
                ],
                "id": 215709,
                "origin_country": [
                    "TR"
                ],
                "original_language": "tr",
                "original_name": "Esaret",
                "overview": "",
                "popularity": 2023.768,
                "poster_path": "/d1YiLLhjGnCoC0D4G0ri2MloFqO.jpg",
                "first_air_date": "2022-11-21",
                "name": "Esaret",
                "vote_average": 8.5,
                "vote_count": 6
            },
            {
                "adult": false,
                "backdrop_path": "/nVRyd8hlg0ZLxBn9RaI7mUMQLnz.jpg",
                "genre_ids": [
                    18,
                    9648,
                    10765
                ],
                "id": 1622,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Supernatural",
                "overview": "Dos hermanos luchan contra fantasmas, demonios y todas las potestades del mal, después que el cielo y el infierno dejan un caos luego de una serie de eventos apocalípticos, donde monstruos, ángeles y demonios deambulan en el caótico territorio.",
                "popularity": 1705.484,
                "poster_path": "/58Qaj36FZDz54H36LsUI8mGiW9y.jpg",
                "first_air_date": "2005-09-13",
                "name": "Supernatural",
                "vote_average": 8.294,
                "vote_count": 7360
            },
            {
                "adult": false,
                "backdrop_path": "/jESV5q99Xa7lGHu0pGHcxXl5AGe.jpg",
                "genre_ids": [
                    18,
                    10751
                ],
                "id": 242722,
                "origin_country": [
                    "IN"
                ],
                "original_language": "hi",
                "original_name": "श्रीमद् रामायण",
                "overview": "",
                "popularity": 1635.374,
                "poster_path": "/aCDK83ykQYnQGFOTfiLjnoqXv1b.jpg",
                "first_air_date": "2024-01-22",
                "name": "श्रीमद् रामायण",
                "vote_average": 9,
                "vote_count": 2
            },
            {
                "adult": false,
                "backdrop_path": "/7EU7IuIk6CCmYgAVSR91twaVzOL.jpg",
                "genre_ids": [
                    10766,
                    18
                ],
                "id": 243117,
                "origin_country": [
                    "FR"
                ],
                "original_language": "fr",
                "original_name": "Plus belle la vie, encore plus belle",
                "overview": "",
                "popularity": 1590.06,
                "poster_path": "/5js5JCtxfiYF2MdNn0zGyCwyg8L.jpg",
                "first_air_date": "2024-01-08",
                "name": "Plus belle la vie, encore plus belle",
                "vote_average": 3,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/zwXvUwXgOHbBJmZSFLmBfAwHDE6.jpg",
                "genre_ids": [
                    18
                ],
                "id": 243487,
                "origin_country": [
                    "MX"
                ],
                "original_language": "es",
                "original_name": "Vivir de amor",
                "overview": "Hace veinte años Elena perdió a su hija Frida y la dieron por muerta. Alma y Antonio la encontraron y la adoptaron. Ahora, años después, Frida descubre la verdad.  Basada en la historia portuguesa de 2010 creado por Pedro Lopes y Aguinaldo Silva, \"Lazos de sangre\".",
                "popularity": 1577.115,
                "poster_path": "/5I0koi3lvHtGDhYvfAkLssQKEGO.jpg",
                "first_air_date": "2024-01-29",
                "name": "Vivir de amor",
                "vote_average": 7.577,
                "vote_count": 52
            },
            {
                "adult": false,
                "backdrop_path": "/bIhmqQNXcyWRzH153d3jaCbLTy3.jpg",
                "genre_ids": [
                    10759,
                    10765,
                    18,
                    10751,
                    10766,
                    35
                ],
                "id": 244643,
                "origin_country": [
                    "MX"
                ],
                "original_language": "es",
                "original_name": "El amor no tiene receta",
                "overview": "Paz, cocinera talentosa, dedica su vida a la búsqueda de su hija secuestrada al nacer. Se enamora de Esteban, un viudo con tres hijos. Juntos deberán superar la oposición de sus familias a su romance.",
                "popularity": 1566.158,
                "poster_path": "/fDRy8B1KdapuvBsgkCkEETY4MNr.jpg",
                "first_air_date": "2024-02-19",
                "name": "El amor no tiene receta",
                "vote_average": 7.66,
                "vote_count": 51
            },
            {
                "adult": false,
                "backdrop_path": "/jWXrQstj7p3Wl5MfYWY6IHqRpDb.jpg",
                "genre_ids": [
                    10763
                ],
                "id": 94722,
                "origin_country": [
                    "DE"
                ],
                "original_language": "de",
                "original_name": "Tagesschau",
                "overview": "Programa matutino de noticias alemán, el programa más antiguo aún existente en la televisión alemana.",
                "popularity": 1715.746,
                "poster_path": "/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg",
                "first_air_date": "1952-12-26",
                "name": "Noticias Diarias",
                "vote_average": 6.8,
                "vote_count": 202
            },
            {
                "adult": false,
                "backdrop_path": "/aRtLEHMrcbG5InnfL8l3ZdIWS5I.jpg",
                "genre_ids": [
                    10751,
                    18
                ],
                "id": 246331,
                "origin_country": [
                    "KR"
                ],
                "original_language": "ko",
                "original_name": "수지맞은 우리",
                "overview": "",
                "popularity": 1481.203,
                "poster_path": "/gErKBJHpxVqGTfYwoNaqtMuuMF1.jpg",
                "first_air_date": "2024-03-25",
                "name": "수지맞은 우리",
                "vote_average": 6.3,
                "vote_count": 3
            },
            {
                "adult": false,
                "backdrop_path": "/hpZ5VJP1MvQjuFUMORuAoDFAH30.jpg",
                "genre_ids": [
                    35,
                    10766,
                    10759
                ],
                "id": 222289,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "Família é Tudo",
                "overview": "",
                "popularity": 1585.248,
                "poster_path": "/tDbJuSfVhf3ZnxiJrXlXEALyAz5.jpg",
                "first_air_date": "2024-03-04",
                "name": "Família é Tudo",
                "vote_average": 6.4,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/butPVWgcbtAjL9Z7jU7Xj1KA8KD.jpg",
                "genre_ids": [
                    10767,
                    35
                ],
                "id": 22980,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Watch What Happens Live with Andy Cohen",
                "overview": "",
                "popularity": 1560.703,
                "poster_path": "/onSD9UXfJwrMXWhq7UY7hGF2S1h.jpg",
                "first_air_date": "2009-07-16",
                "name": "Watch What Happens Live with Andy Cohen",
                "vote_average": 5.009,
                "vote_count": 55
            }
        ],
        "total_pages": 8754,
        "total_results": 175070
    }

    const ratingSeries: ISerieResponse = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/9kyyQXy79YRdY5mhrYKyktbFMev.jpg",
                "genre_ids": [
                    16,
                    35,
                    10765
                ],
                "id": 94954,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Hazbin Hotel",
                "overview": "En un intento por encontrar una alternativa no violenta para reducir la superpoblación del infierno, la hija de Lucifer abre un hotel de rehabilitación que ofrece a un grupo de demonios inadaptados una oportunidad de redención.",
                "popularity": 150.568,
                "poster_path": "/rXojaQcxVUubPLSrFV8PD4xdjrs.jpg",
                "first_air_date": "2024-01-18",
                "name": "Hazbin Hotel",
                "vote_average": 8.974,
                "vote_count": 970
            },
            {
                "adult": false,
                "backdrop_path": "/96RT2A47UdzWlUfvIERFyBsLhL2.jpg",
                "genre_ids": [
                    16,
                    18,
                    10759,
                    10765
                ],
                "id": 209867,
                "origin_country": [
                    "JP"
                ],
                "original_language": "ja",
                "original_name": "葬送のフリーレン",
                "overview": "La maga Frieren formaba parte del grupo del héroe Himmel, quienes derrotaron al Rey Demonio tras un viaje de 10 años y devolvieron la paz al reino. Frieren es una elfa de más de mil años de vida, así que al despedirse de Himmel y sus compañeros promete que regresará para verlos y parte de viaje sola. Al cabo de cincuenta años, Frieren cumple su promesa y acude a visitar a Himmel y al resto. Aunque ella no ha cambiado, Himmel y los demás han envejecido y están en el final de sus vidas. Cuando Himmel muere, Frieren se arrepiente de no haber pasado más tiempo a su lado conociéndolo, así que emprende un viaje para conocer mejor a sus antiguos compañeros, a las personas y descubrir más del mundo.",
                "popularity": 149.093,
                "poster_path": "/v7i3yNKxsDwB5IG9ElWgOGPieE8.jpg",
                "first_air_date": "2023-09-29",
                "name": "Frieren: Más allá del final del viaje",
                "vote_average": 8.932,
                "vote_count": 205
            },
            {
                "adult": false,
                "backdrop_path": "/9faGSFi5jam6pDWGNd0p8JcJgXQ.jpg",
                "genre_ids": [
                    18,
                    80
                ],
                "id": 1396,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Breaking Bad",
                "overview": "Tras cumplir 50 años, Walter White , un profesor de química de un instituto de Albuquerque, Nuevo México,  se entera de que tiene un cáncer de pulmón incurable. Casado con Skyler  y con un hijo discapacitado , la brutal noticia lo impulsa a dar un drástico cambio a su vida: decide, con la ayuda de un antiguo alumno ,  fabricar anfetaminas y ponerlas a la venta. Lo que pretende es liberar a su familia de problemas económicos cuando se produzca el fatal desenlace.",
                "popularity": 445.657,
                "poster_path": "/u9ruVVPJWGPuzWCv4DDK9DyDebZ.jpg",
                "first_air_date": "2008-01-20",
                "name": "Breaking Bad",
                "vote_average": 8.91,
                "vote_count": 13737
            },
            {
                "adult": false,
                "backdrop_path": "/rkB4LyZHo1NHXFEDHl9vSD9r1lI.jpg",
                "genre_ids": [
                    16,
                    18,
                    10765,
                    10759
                ],
                "id": 94605,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Arcane",
                "overview": "Mientras la discordia separa las ciudades gemelas de Piltóver y Zaun, dos hermanas se enfrentan en una guerra feroz entre tecnologías mágicas y convicciones opuestas.",
                "popularity": 83.062,
                "poster_path": "/fqldf2t8ztc9aiwn3k6mlX3tvRT.jpg",
                "first_air_date": "2021-11-06",
                "name": "Arcane",
                "vote_average": 8.749,
                "vote_count": 3828
            },
            {
                "adult": false,
                "backdrop_path": "/iDnTAeR2WNA62XQG0ivtteDSjd5.jpg",
                "genre_ids": [
                    16,
                    10759,
                    10765
                ],
                "id": 138502,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "X-Men '97",
                "overview": "Un grupo de mutantes usa sus insólitos dones para proteger a un mundo que los odia y les teme.",
                "popularity": 239.292,
                "poster_path": "/oudLzoZ9vqcH7BQAOAeHeC7bcjT.jpg",
                "first_air_date": "2024-03-20",
                "name": "X-Men '97",
                "vote_average": 8.736,
                "vote_count": 354
            },
            {
                "adult": false,
                "backdrop_path": "/kU98MbVVgi72wzceyrEbClZmMFe.jpg",
                "genre_ids": [
                    16,
                    10759,
                    10765
                ],
                "id": 246,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Avatar: The Last Airbender",
                "overview": "El mundo está dividido en cuatro naciones, correspondientes a los cuatro elementos: La Tribu del Agua, El Reino de la Tierra, la Nación del Fuego y los Nómadas del Aire. En cada nación hay una notable orden llamada de los \"Maestros\" que aprenden a potenciar su talento nato y manipular su elemento nativo, combinando artes marciales y magia elemental. En cada generación, sólo un Maestro es capaz de controlar los cuatro elementos, y recibe el nombre de Avatar, el espíritu del mundo manifestado en forma humana, capaz de mantener la armonía de las cuatro naciones.",
                "popularity": 131.24,
                "poster_path": "/ucNtkZfpZ6KgxqPo039nN4LAyFR.jpg",
                "first_air_date": "2005-02-21",
                "name": "Avatar: La leyenda de Aang",
                "vote_average": 8.73,
                "vote_count": 3968
            },
            {
                "adult": false,
                "backdrop_path": "/2rmK7mnchw9Xr3XdiTFSxTTLXqv.jpg",
                "genre_ids": [
                    10759,
                    35,
                    16
                ],
                "id": 37854,
                "origin_country": [
                    "JP"
                ],
                "original_language": "ja",
                "original_name": "ワンピース",
                "overview": "Riqueza, fama, poder... un hombre había obtenido todo en este mundo, era el Rey de los Piratas Gold D. Roger. Antes de morir sus últimas palabras inspiraron al mundo a aventurarse al mar: \"¿Mi tesoro? Si lo queréis es vuestro... lo he escondido todo en ese lugar\". Y así dio comienzo lo que se conoce como la Gran Era de la Piratería, lanzando a cientos de piratas al mar para encontrar el gran tesoro One Piece. Esta serie relata las aventuras y desventuras de uno de esos piratas, Monkey D. Luffy, quien accidentalmente de pequeño, comió una Fruta del Diablo (Akuma no Mi en japonés), en particular una Gomu Gomu no Mi que hizo que su cuerpo ganara las propiedades físicas de la goma, convirtiéndose en el hombre de goma. Luffy, después de dicho suceso, decide que se convertirá en el próximo Rey de los Piratas y para ello, deberá encontrar el \"One Piece\".",
                "popularity": 152.584,
                "poster_path": "/6nyfkXDGngwY6PCW58n7CHQ2aMt.jpg",
                "first_air_date": "1999-10-20",
                "name": "One Piece",
                "vote_average": 8.722,
                "vote_count": 4499
            },
            {
                "adult": false,
                "backdrop_path": "/rBF8wVQN8hTWHspVZBlI3h7HZJ.jpg",
                "genre_ids": [
                    16,
                    35,
                    10765,
                    10759
                ],
                "id": 60625,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Rick and Morty",
                "overview": "Rick Sánchez es un genio científico alcohólico que se ha mudado con la familia de su hija Beth. Él pasa el tiempo con su nieto adolescente Morty (y en ocasiones con otros miembros de la familia) en aventuras peligrosas y surrealistas a través del espacio y universos paralelos.",
                "popularity": 508.645,
                "poster_path": "/5Yiep9EwcQgLolg013ETBVqHxuD.jpg",
                "first_air_date": "2013-12-02",
                "name": "Rick y Morty",
                "vote_average": 8.701,
                "vote_count": 9483
            },
            {
                "adult": false,
                "backdrop_path": "/A6tMQAo6t6eRFCPhsrShmxZLqFB.jpg",
                "genre_ids": [
                    10759,
                    16,
                    10765,
                    35,
                    18
                ],
                "id": 31911,
                "origin_country": [
                    "JP"
                ],
                "original_language": "ja",
                "original_name": "鋼の錬金術師 FULLMETAL ALCHEMIST",
                "overview": "La imprudente indiferencia de Edward y Alphonse Elric por las leyes fundamentales de la alquimia le arrancaron la mitad de las extremidades a Ed y dejaron el alma de Al pegada a una fría armadura. Para restaurar lo que se perdió, los hermanos recorren una tierra devastada por la guerra para la Piedra Filosofal, una reliquia legendaria que otorga la capacidad de realizar la alquimia de maneras imposibles.\n\nLos Elrics no están solos en su búsqueda; el corrupto Estado Militar también está ansioso por aprovechar el poder del artefacto. También lo son los extraños Homúnculos y su oscuro creador. La gema mítica atrae a los alquimistas exóticos de reinos distantes, dejando cicatrices profundas que inspiran el asesinato. A medida que los Elrics encuentran su curso alterado por estos enemigos y aliados, su propósito permanece inalterado, y su vínculo es irrompible.",
                "popularity": 316.285,
                "poster_path": "/tYwLXkxosyU3OOj2IFxzxuajvBI.jpg",
                "first_air_date": "2009-04-05",
                "name": "Fullmetal Alchemist: Brotherhood",
                "vote_average": 8.697,
                "vote_count": 1955
            },
            {
                "adult": false,
                "backdrop_path": "/7BoRhg8zXP0ca9Zql4p8llCFR2P.jpg",
                "genre_ids": [
                    18,
                    10765,
                    35
                ],
                "id": 221851,
                "origin_country": [
                    "KR"
                ],
                "original_language": "ko",
                "original_name": "내 남편과 결혼해줘",
                "overview": "Ji-won, una mujer de vida limitada, regresa a 10 años atrás y sueña con vengarse tras ser asesinada por su marido, que tuvo una aventura con su mejor amiga.",
                "popularity": 105.494,
                "poster_path": "/4YaV9hJ1vJWLROjIC0Sqj6g7nNc.jpg",
                "first_air_date": "2024-01-01",
                "name": "Cásate con mi Esposo",
                "vote_average": 8.684,
                "vote_count": 310
            },
            {
                "adult": false,
                "backdrop_path": "/70YdbMELM4b8x8VXjlubymb2bQ0.jpg",
                "genre_ids": [
                    18,
                    10751
                ],
                "id": 70785,
                "origin_country": [
                    "CA"
                ],
                "original_language": "en",
                "original_name": "Anne with an E",
                "overview": "Anne Shirley es una niña huérfana que vive en un pequeño pueblo llamado Avonlea que pertenece a la Isla del Príncipe Eduardo, en el año 1890. Después de una infancia difícil, donde fue pasando de orfanato a hogares de acogida, es enviada por error a vivir con una solterona y su hermano. Cuando cumple 13 años, Anne va a conseguir transformar su vida y el pequeño pueblo donde vive gracias a su fuerte personalidad, intelecto e imaginación. Basada en la inolvidable novela.",
                "popularity": 96.551,
                "poster_path": "/6P6tXhjT5tK3qOXzxF9OMLlG7iz.jpg",
                "first_air_date": "2017-03-19",
                "name": "Anne with an E",
                "vote_average": 8.7,
                "vote_count": 4574
            },
            {
                "adult": false,
                "backdrop_path": "/hPea3Qy5Gd6z4kJLUruBbwAH8Rm.jpg",
                "genre_ids": [
                    80,
                    18
                ],
                "id": 60059,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Better Call Saul",
                "overview": "La acción se ubica en el año 2002 en torno al abogado James Morgan \"Jimmy\" McGill, seis años antes de su aparición en Breaking Bad como Saul Goodman. A pesar de ser una precuela también se muestra brevemente cual fue el destino de Saul tras los hechos de la serie original.",
                "popularity": 191.096,
                "poster_path": "/fC2HDm5t0kHl7mTm7jxMR31b7by.jpg",
                "first_air_date": "2015-02-08",
                "name": "Better Call Saul",
                "vote_average": 8.676,
                "vote_count": 4930
            },
            {
                "adult": false,
                "backdrop_path": "/3GQKYh6Trm8pxd2AypovoYQf4Ay.jpg",
                "genre_ids": [
                    16,
                    10759,
                    10765
                ],
                "id": 85937,
                "origin_country": [
                    "JP"
                ],
                "original_language": "ja",
                "original_name": "鬼滅の刃",
                "overview": "En la era Taisho de Japón. Tanjiro, un joven que se gana la vida vendiendo carbón, descubre un día que su familia ha sido asesinada por un demonio. Para empeorar las cosas, su hermana menor Nezuko, la única superviviente de la masacre, ha sufrido una transformación en demonio. Destrozado por los acontecimientos Tanjiro decide convertirse en un cazador de demonios para poder devolver a su hermana a la normalidad y matar al demonio que masacró a su familia.",
                "popularity": 227.737,
                "poster_path": "/tK4GsDa6BREEh6Hfng1tWPuq8oE.jpg",
                "first_air_date": "2019-04-06",
                "name": "Demon Slayer: Kimetsu no Yaiba",
                "vote_average": 8.674,
                "vote_count": 6120
            },
            {
                "adult": false,
                "backdrop_path": "/900tHlUYUkp7Ol04XFSoAaEIXcT.jpg",
                "genre_ids": [
                    18
                ],
                "id": 87108,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Chernobyl",
                "overview": "Sigue «la verdadera historia de una de las peores catástrofes provocadas por el hombre y habla de los valientes hombres y mujeres que se sacrificaron para salvar a Europa de un desastre inimaginable. La miniserie se centra en el desgarrador alcance del desastre de la planta nuclear que ocurrió en Ucrania en abril de 1986, revelando cómo y por qué ocurrió, además contando las sorprendentes y notables historias de los héroes que lucharon y cayeron.",
                "popularity": 80.863,
                "poster_path": "/hlLXt2tOPT6RRnjiUmoxyG1LTFi.jpg",
                "first_air_date": "2019-05-06",
                "name": "Chernobyl",
                "vote_average": 8.67,
                "vote_count": 6027
            },
            {
                "adult": false,
                "backdrop_path": "/nBZyWSGAUEzCH7Mna0zUNTpBQlQ.jpg",
                "genre_ids": [
                    10765,
                    18,
                    10759,
                    9648
                ],
                "id": 135157,
                "origin_country": [
                    "KR"
                ],
                "original_language": "ko",
                "original_name": "환혼",
                "overview": "Una poderosa hechicera atrapada en el cuerpo de una mujer ciega se encuentra con un integrante de una prestigiosa familia, que necesita su ayuda para cambiar su destino.",
                "popularity": 155.52,
                "poster_path": "/1TtUh6UT1eLcOxYsBaUBdaBrSws.jpg",
                "first_air_date": "2022-06-18",
                "name": "Alquimia de Almas",
                "vote_average": 8.669,
                "vote_count": 519
            },
            {
                "adult": false,
                "backdrop_path": "/rqbCbjB19amtOtFQbb3K2lgm2zv.jpg",
                "genre_ids": [
                    16,
                    10765,
                    10759
                ],
                "id": 1429,
                "origin_country": [
                    "JP"
                ],
                "original_language": "ja",
                "original_name": "進撃の巨人",
                "overview": "Muchos años atrás, la humanidad estuvo al borde de la extinción con la aparición de unas criaturas gigantes que devoraban a todas las personas. Huyendo, la humanidad consiguió sobrevivir en una ciudad fortificada de altas murallas que se ha convertido en el último reducto de la civilización contra los Titanes que campan a sus anchas por el mundo. Ahora esa paz está a punto de verse interrumpida por una cadena de acontecimientos que llevará a desvelar qué son los Titanes y cómo aparecieron.",
                "popularity": 148.573,
                "poster_path": "/yFPQ4JhhirnCVe2UIKGMYX7TOGZ.jpg",
                "first_air_date": "2013-04-07",
                "name": "Attack on Titan",
                "vote_average": 8.662,
                "vote_count": 6133
            },
            {
                "adult": false,
                "backdrop_path": "/cHyY5z4txdVyGtYMvBJhCqCcJso.jpg",
                "genre_ids": [
                    16,
                    10765,
                    18,
                    10759,
                    35
                ],
                "id": 92685,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Owl House",
                "overview": "Luz, una adolescente humana muy segura de sí misma, se topa accidentalmente con un portal que la lleva a un mágico y nuevo mundo, en el cual se hace amiga de la bruja rebelde Eda y de King, un adorable guerrero en miniatura. A pesar de no tener habilidades mágicas, Luz va tras su sueño de convertirse en bruja.",
                "popularity": 101.729,
                "poster_path": "/lE5OYF0axjCVtrxLMetA8i8QpZ8.jpg",
                "first_air_date": "2020-01-10",
                "name": "La Casa Búho",
                "vote_average": 8.661,
                "vote_count": 1529
            },
            {
                "adult": false,
                "backdrop_path": "/2w8FaLwwJTWr6ExUMeVgT2Th5YT.jpg",
                "genre_ids": [
                    16,
                    35,
                    18,
                    10759
                ],
                "id": 42705,
                "origin_country": [
                    "JP"
                ],
                "original_language": "ja",
                "original_name": "はじめの一歩",
                "overview": "Makunouchi Ippo es un estudiante corriente en una escuela de secundaria en Japón. Dado que pasa la mayor parte del tiempo ayudando a su madre con el negocio familiar, no tiene mucho tiempo libre para disfrutar sus años de adolescente, como el resto de los chicos de su edad. Además siempre es objeto de burlas y abusos debido a su carácter tímido y a un olor característico que le suele acompañar, debido al negocio de pesca de su madre. Sin duda la vida de Ippo es bastante difícil.",
                "popularity": 249.267,
                "poster_path": "/umMYjHm7FjsyllUnC8lWDy9rrZQ.jpg",
                "first_air_date": "2000-10-03",
                "name": "Espíritu de Lucha",
                "vote_average": 8.7,
                "vote_count": 995
            },
            {
                "adult": false,
                "backdrop_path": "/dfmPbyeZZSz3bekeESvMJaH91gS.jpg",
                "genre_ids": [
                    16,
                    10765,
                    10759,
                    18
                ],
                "id": 95557,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "INVINCIBLE",
                "overview": "Mark Grayson hereda superpoderes a los diecisiete años y se une a su padre como uno de los mayores héroes de la Tierra. Todos sus sueños se hacen realidad, hasta que un evento impactante lo cambia todo.",
                "popularity": 185.298,
                "poster_path": "/uCRZrXZNzzDijApmREUTFywhUmW.jpg",
                "first_air_date": "2021-03-25",
                "name": "Invencible",
                "vote_average": 8.655,
                "vote_count": 4300
            },
            {
                "adult": false,
                "backdrop_path": "/cH39aJg9VlEaYo6yY37Iah8RAaz.jpg",
                "genre_ids": [
                    10759,
                    16,
                    10765
                ],
                "id": 65930,
                "origin_country": [
                    "JP"
                ],
                "original_language": "ja",
                "original_name": "僕のヒーローアカデミア",
                "overview": "El 80% de la población mundial ha desarrollado superpoderes y son entrenados en la Academia de Héroes. Como consecuencia, han surgido tanto superhéroes como supervillanos. Izuku Midoriya es parte de ese 20% sin ningún poder sobrenatural. Sin embargo, su mayor deseo es poder estudiar en la Academia y convertirse en un héroe",
                "popularity": 92.866,
                "poster_path": "/dmUuNVWAJumRkDNuauFaLSvga00.jpg",
                "first_air_date": "2016-04-03",
                "name": "My Hero Academia",
                "vote_average": 8.653,
                "vote_count": 4760
            }
        ],
        "total_pages": 100,
        "total_results": 1990
    }

    const upcomingSeries: ISerieResponse = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/etj8E2o0Bud0HkONVQPjyCkIvpv.jpg",
                "genre_ids": [
                    10765,
                    18,
                    10759
                ],
                "id": 94997,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "House of the Dragon",
                "overview": "La casa del dragon Basada en el libro 'Fuego y Sangre' de George R.R. Martin. La serie se centra en la casa Targaryen, trescientos años antes de los eventos vistos en 'Juego de Tronos'.",
                "popularity": 3106.788,
                "poster_path": "/8MaxftF69sEAAD5673vTjIl8yT3.jpg",
                "first_air_date": "2022-08-21",
                "name": "La Casa del Dragón",
                "vote_average": 8.421,
                "vote_count": 4202
            },
            {
                "adult": false,
                "backdrop_path": "/7cqKGQMnNabzOpi7qaIgZvQ7NGV.jpg",
                "genre_ids": [
                    10765,
                    10759
                ],
                "id": 76479,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Boys",
                "overview": "La serie tiene lugar en un mundo en el que los superhéroes representan el lado oscuro de la celebridad y la fama. Un grupo de vigilantes que se hacen llamar \"The Boys\" decide hacer todo lo posible por frenar a los superhéroes que están perjudicando a la sociedad, independientemente de los riesgos que ello conlleva.",
                "popularity": 3089.748,
                "poster_path": "/cSAN6ofLRwRiuwOHYD81p4k6Yks.jpg",
                "first_air_date": "2019-07-25",
                "name": "The Boys",
                "vote_average": 8.469,
                "vote_count": 9686
            },
            {
                "adult": false,
                "backdrop_path": "/mZCq3ldk7hUIyDvfZIOvTrxPWYS.jpg",
                "genre_ids": [],
                "id": 209374,
                "origin_country": [
                    "US"
                ],
                "original_language": "es",
                "original_name": "Top Chef VIP",
                "overview": "Dieciséis celebridades ponen a prueba sus habilidades culinarias y son juzgadas por un panel de chefs profesionales con un concursante eliminado cada semana. El ganador recibirá 100.000 dólares estadounidenses.",
                "popularity": 2841.349,
                "poster_path": "/cw6M4c2MpLSzqzmrrqpSJlEbwCF.jpg",
                "first_air_date": "2022-08-09",
                "name": "Top Chef VIP",
                "vote_average": 4.2,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/i8iqYtAy9qcO5RSrA1f6fY1n6SN.jpg",
                "genre_ids": [
                    10766
                ],
                "id": 235484,
                "origin_country": [
                    "ZA"
                ],
                "original_language": "af",
                "original_name": "Suidooster",
                "overview": "",
                "popularity": 2859.527,
                "poster_path": "/naCgSiacvV685kait6fBvhVhdce.jpg",
                "first_air_date": "2015-11-16",
                "name": "Suidooster",
                "vote_average": 8.273,
                "vote_count": 11
            },
            {
                "adult": false,
                "backdrop_path": "/2Bkqjc9tNWo3KLr1aRYyJ7vMQtM.jpg",
                "genre_ids": [
                    10764
                ],
                "id": 235493,
                "origin_country": [
                    "NL"
                ],
                "original_language": "nl",
                "original_name": "De Bondgenoten",
                "overview": "",
                "popularity": 2787.042,
                "poster_path": "/wsipinibYxrZhpkQ6MKxIMgL0hv.jpg",
                "first_air_date": "2023-10-22",
                "name": "De Bondgenoten",
                "vote_average": 7.2,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/uCY1j1YqfDWRbbS7hJwd9szX1sJ.jpg",
                "genre_ids": [
                    10766,
                    18,
                    35
                ],
                "id": 237480,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "No Rancho Fundo",
                "overview": "",
                "popularity": 2351.525,
                "poster_path": "/eONkvEahSQJan1HTzWJKjvaMe29.jpg",
                "first_air_date": "2024-04-15",
                "name": "No Rancho Fundo",
                "vote_average": 4.95,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/lhdUwhInXu31qHm65jwBAlpTp8P.jpg",
                "genre_ids": [
                    10767
                ],
                "id": 82873,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "The Kelly Clarkson Show",
                "overview": "",
                "popularity": 2372.036,
                "poster_path": "/9Gg1oM8Us8gCS5aJA8e0ZRuIHnf.jpg",
                "first_air_date": "2019-09-09",
                "name": "The Kelly Clarkson Show",
                "vote_average": 6.255,
                "vote_count": 55
            },
            {
                "adult": false,
                "backdrop_path": "/5S0SI4NjyMji05OPL0GOZ4BsiMh.jpg",
                "genre_ids": [
                    10764
                ],
                "id": 136166,
                "origin_country": [
                    "NL"
                ],
                "original_language": "nl",
                "original_name": "Lang Leve de Liefde",
                "overview": "",
                "popularity": 2242.99,
                "poster_path": "/9lpvvzEl5kViIc2vUJG4QKzj2ds.jpg",
                "first_air_date": "2020-01-20",
                "name": "Lang Leve de Liefde",
                "vote_average": 6.333,
                "vote_count": 6
            },
            {
                "adult": false,
                "backdrop_path": "/vSrR7pq1wtPw85XpiOrdNcYdtUb.jpg",
                "genre_ids": [
                    18
                ],
                "id": 239526,
                "origin_country": [
                    "ES"
                ],
                "original_language": "es",
                "original_name": "Sueños de libertad",
                "overview": "",
                "popularity": 2085.664,
                "poster_path": "/95RVeMWMvk97PBW0msryIJC32XD.jpg",
                "first_air_date": "2024-02-25",
                "name": "Sueños de libertad",
                "vote_average": 6,
                "vote_count": 10
            },
            {
                "adult": false,
                "backdrop_path": "/wqebNDaopLixqxeQRDaqhNfy866.jpg",
                "genre_ids": [
                    18
                ],
                "id": 242551,
                "origin_country": [
                    "TR"
                ],
                "original_language": "tr",
                "original_name": "Rüzgarlı Tepe",
                "overview": "",
                "popularity": 1839.656,
                "poster_path": "/vGrrdx21rS69tl55mxpl9pn9ebx.jpg",
                "first_air_date": "2024-01-01",
                "name": "Rüzgarlı Tepe",
                "vote_average": 7.9,
                "vote_count": 15
            },
            {
                "adult": false,
                "backdrop_path": "/dfnKyfoyvSlcxb6gAgmyYS1vWk2.jpg",
                "genre_ids": [
                    18
                ],
                "id": 215709,
                "origin_country": [
                    "TR"
                ],
                "original_language": "tr",
                "original_name": "Esaret",
                "overview": "",
                "popularity": 2023.768,
                "poster_path": "/d1YiLLhjGnCoC0D4G0ri2MloFqO.jpg",
                "first_air_date": "2022-11-21",
                "name": "Esaret",
                "vote_average": 8.5,
                "vote_count": 6
            },
            {
                "adult": false,
                "backdrop_path": "/jESV5q99Xa7lGHu0pGHcxXl5AGe.jpg",
                "genre_ids": [
                    18,
                    10751
                ],
                "id": 242722,
                "origin_country": [
                    "IN"
                ],
                "original_language": "hi",
                "original_name": "श्रीमद् रामायण",
                "overview": "",
                "popularity": 1635.374,
                "poster_path": "/aCDK83ykQYnQGFOTfiLjnoqXv1b.jpg",
                "first_air_date": "2024-01-22",
                "name": "श्रीमद् रामायण",
                "vote_average": 9,
                "vote_count": 2
            },
            {
                "adult": false,
                "backdrop_path": "/7EU7IuIk6CCmYgAVSR91twaVzOL.jpg",
                "genre_ids": [
                    10766,
                    18
                ],
                "id": 243117,
                "origin_country": [
                    "FR"
                ],
                "original_language": "fr",
                "original_name": "Plus belle la vie, encore plus belle",
                "overview": "",
                "popularity": 1590.06,
                "poster_path": "/5js5JCtxfiYF2MdNn0zGyCwyg8L.jpg",
                "first_air_date": "2024-01-08",
                "name": "Plus belle la vie, encore plus belle",
                "vote_average": 3,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/zwXvUwXgOHbBJmZSFLmBfAwHDE6.jpg",
                "genre_ids": [
                    18
                ],
                "id": 243487,
                "origin_country": [
                    "MX"
                ],
                "original_language": "es",
                "original_name": "Vivir de amor",
                "overview": "Hace veinte años Elena perdió a su hija Frida y la dieron por muerta. Alma y Antonio la encontraron y la adoptaron. Ahora, años después, Frida descubre la verdad.  Basada en la historia portuguesa de 2010 creado por Pedro Lopes y Aguinaldo Silva, \"Lazos de sangre\".",
                "popularity": 1577.115,
                "poster_path": "/5I0koi3lvHtGDhYvfAkLssQKEGO.jpg",
                "first_air_date": "2024-01-29",
                "name": "Vivir de amor",
                "vote_average": 7.577,
                "vote_count": 52
            },
            {
                "adult": false,
                "backdrop_path": "/bIhmqQNXcyWRzH153d3jaCbLTy3.jpg",
                "genre_ids": [
                    10759,
                    10765,
                    18,
                    10751,
                    10766,
                    35
                ],
                "id": 244643,
                "origin_country": [
                    "MX"
                ],
                "original_language": "es",
                "original_name": "El amor no tiene receta",
                "overview": "Paz, cocinera talentosa, dedica su vida a la búsqueda de su hija secuestrada al nacer. Se enamora de Esteban, un viudo con tres hijos. Juntos deberán superar la oposición de sus familias a su romance.",
                "popularity": 1566.158,
                "poster_path": "/fDRy8B1KdapuvBsgkCkEETY4MNr.jpg",
                "first_air_date": "2024-02-19",
                "name": "El amor no tiene receta",
                "vote_average": 7.66,
                "vote_count": 51
            },
            {
                "adult": false,
                "backdrop_path": "/jWXrQstj7p3Wl5MfYWY6IHqRpDb.jpg",
                "genre_ids": [
                    10763
                ],
                "id": 94722,
                "origin_country": [
                    "DE"
                ],
                "original_language": "de",
                "original_name": "Tagesschau",
                "overview": "Programa matutino de noticias alemán, el programa más antiguo aún existente en la televisión alemana.",
                "popularity": 1400.484,
                "poster_path": "/7dFZJ2ZJJdcmkp05B9NWlqTJ5tq.jpg",
                "first_air_date": "1952-12-26",
                "name": "Noticias Diarias",
                "vote_average": 6.8,
                "vote_count": 202
            },
            {
                "adult": false,
                "backdrop_path": "/aRtLEHMrcbG5InnfL8l3ZdIWS5I.jpg",
                "genre_ids": [
                    10751,
                    18
                ],
                "id": 246331,
                "origin_country": [
                    "KR"
                ],
                "original_language": "ko",
                "original_name": "수지맞은 우리",
                "overview": "",
                "popularity": 1481.203,
                "poster_path": "/gErKBJHpxVqGTfYwoNaqtMuuMF1.jpg",
                "first_air_date": "2024-03-25",
                "name": "수지맞은 우리",
                "vote_average": 6.3,
                "vote_count": 3
            },
            {
                "adult": false,
                "backdrop_path": "/butPVWgcbtAjL9Z7jU7Xj1KA8KD.jpg",
                "genre_ids": [
                    10767,
                    35
                ],
                "id": 22980,
                "origin_country": [
                    "US"
                ],
                "original_language": "en",
                "original_name": "Watch What Happens Live with Andy Cohen",
                "overview": "",
                "popularity": 1591.286,
                "poster_path": "/onSD9UXfJwrMXWhq7UY7hGF2S1h.jpg",
                "first_air_date": "2009-07-16",
                "name": "Watch What Happens Live with Andy Cohen",
                "vote_average": 5.009,
                "vote_count": 55
            },
            {
                "adult": false,
                "backdrop_path": "/hpZ5VJP1MvQjuFUMORuAoDFAH30.jpg",
                "genre_ids": [
                    35,
                    10766,
                    10759
                ],
                "id": 222289,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "Família é Tudo",
                "overview": "",
                "popularity": 1270.609,
                "poster_path": "/tDbJuSfVhf3ZnxiJrXlXEALyAz5.jpg",
                "first_air_date": "2024-03-04",
                "name": "Família é Tudo",
                "vote_average": 6.4,
                "vote_count": 5
            },
            {
                "adult": false,
                "backdrop_path": "/bEKRyT7WN5TjFKv0JTWI2cyNlak.jpg",
                "genre_ids": [
                    10766,
                    18
                ],
                "id": 223365,
                "origin_country": [
                    "BR"
                ],
                "original_language": "pt",
                "original_name": "Renascer",
                "overview": "",
                "popularity": 1285.985,
                "poster_path": "/kUWvvMkNIf21UUDmHjYw55v6o7C.jpg",
                "first_air_date": "2024-01-22",
                "name": "Renascer",
                "vote_average": 7.1,
                "vote_count": 15
            }
        ],
        "total_pages": 42,
        "total_results": 827
    }

    const dateStart = FormattedDateSearch(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 7)).toISOString())
    const dateEnd = FormattedDateSearch(new Date(Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 14)).toISOString())


    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <MainSliderSeries movies={airingToday.results.filter((_, index) => index < 10) as ISerie[]} />
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
        </section>
    )
}