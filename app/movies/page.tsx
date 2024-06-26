import { MainSlider } from "../components/MainSlider/MainSlider"
import { MovieCard } from "../components/MovieCard/MovieCard"
import { MovieCardUpcoming } from "../components/MovieCardUpcoming/MovieCardUpcoming"
import { MovieSliderGeneral } from "../components/MovieSlider/MovieSliderGeneral"
import { IMovieResponse } from "../interfaces/responses"
import styles from "./movies.module.scss"


export default async function Page() {

    const currentTheatres: IMovieResponse = {

        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
                "genre_ids": [
                    16,
                    10751,
                    12,
                    35
                ],
                "id": 1022789,
                "original_language": "en",
                "original_title": "Inside Out 2",
                "overview": "Una aventura completamente nueva dentro de la cabeza adolescente de Riley que presenta un nuevo conjunto de emociones.",
                "popularity": 7298.32,
                "poster_path": "/2PuAY3xSvbchQWqpSiXw08Yt0NP.jpg",
                "release_date": "2024-06-13",
                "title": "IntensaMente 2",
                "video": false,
                "vote_average": 7.779,
                "vote_count": 769
            },
            {
                "adult": false,
                "backdrop_path": "/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",
                "genre_ids": [
                    28,
                    80,
                    53,
                    35
                ],
                "id": 573435,
                "original_language": "en",
                "original_title": "Bad Boys: Ride or Die",
                "overview": "Tras escuchar falsas acusaciones sobre su excapitán y mentor Mike y Marcus deciden investigar el asunto incluso volverse los más buscados de ser necesarios",
                "popularity": 1919.105,
                "poster_path": "/5jI2vEHJReAx8iFDmhC2O3yW37w.jpg",
                "release_date": "2024-06-06",
                "title": "Bad Boys: Hasta la muerte",
                "video": false,
                "vote_average": 7.046,
                "vote_count": 423
            },
            {
                "adult": false,
                "backdrop_path": "/nxxCPRGTzxUH8SFMrIsvMmdxHti.jpg",
                "genre_ids": [
                    35,
                    14,
                    10751
                ],
                "id": 639720,
                "original_language": "en",
                "original_title": "IF",
                "overview": "Una joven descubre la capacidad de ver a los amigos imaginarios de las personas que han sido abandonados por los niños a los que ayudaron.",
                "popularity": 1655.174,
                "poster_path": "/8RgGuC7w8JxhykauzTC4bwha1J8.jpg",
                "release_date": "2024-05-15",
                "title": "Amigos imaginarios",
                "video": false,
                "vote_average": 7.499,
                "vote_count": 384
            },
            {
                "adult": false,
                "backdrop_path": "/oZDRuGHhe5uY8wBqFJcJZT9kdvJ.jpg",
                "genre_ids": [
                    27,
                    9648,
                    14
                ],
                "id": 1086747,
                "original_language": "en",
                "original_title": "The Watchers",
                "overview": "Mina, la artista de 28 años, queda varada en un extenso bosque virgen en el oeste de Irlanda. Al encontrar refugio, sin saberlo, queda atrapada junto a tres extraños que son observados y acechados por criaturas misteriosas cada noche.",
                "popularity": 851.398,
                "poster_path": "/13G0wKhucGWiERNloOicAuzQIyd.jpg",
                "release_date": "2024-06-06",
                "title": "Observados",
                "video": false,
                "vote_average": 6.2,
                "vote_count": 170
            },
            {
                "adult": false,
                "backdrop_path": "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
                "genre_ids": [
                    27
                ],
                "id": 719221,
                "original_language": "en",
                "original_title": "Tarot",
                "overview": "Cuando un grupo de amigos viola imprudentemente la regla sagrada de las lecturas de Tarot -nunca usar la baraja de otra persona-, desatan sin saberlo un mal innombrable atrapado en las cartas malditas. Uno a uno, se enfrentan cara a cara con el destino y terminan en una carrera contra la muerte para escapar del futuro predicho en sus lecturas.",
                "popularity": 816.846,
                "poster_path": "/Adh7xmtgSIUGZBaMj9VLTmq2G8z.jpg",
                "release_date": "2024-05-16",
                "title": "Tarot de la muerte",
                "video": false,
                "vote_average": 6.602,
                "vote_count": 571
            },
            {
                "adult": false,
                "backdrop_path": "/raph7qjAGTMXaIjVxt6ZDSXRzUr.jpg",
                "genre_ids": [
                    28,
                    12,
                    878
                ],
                "id": 786892,
                "original_language": "en",
                "original_title": "Furiosa: A Mad Max Saga",
                "overview": "Mientras el mundo se derrumba, la joven Furiosa es secuestrada del Lugar Verde de Muchas Madres y cae en manos de una Horda de Motociclistas liderada por el Señor de la Guerra Dementus. Recorriendo la tierra baldía llega a la Ciudadela, presidida por Inmortan Joe. Mientras los dos tiranos luchan por el dominio de la zona, Furiosa deberá sobrevivir a muchas pruebas buscando volver a casa",
                "popularity": 1106.883,
                "poster_path": "/tGHUlykWn9V2IIQ4ZaATIAq9VLB.jpg",
                "release_date": "2024-05-23",
                "title": "Furiosa: De la Saga Mad Max",
                "video": false,
                "vote_average": 7.639,
                "vote_count": 1023
            },
            {
                "adult": false,
                "backdrop_path": "/5Eip60UDiPLASyKjmHPMruggTc4.jpg",
                "genre_ids": [
                    27,
                    9648,
                    53
                ],
                "id": 1041613,
                "original_language": "en",
                "original_title": "Immaculate",
                "overview": "A Cecilia, una mujer de fe devota, se le ofrece un nuevo y satisfactorio puesto en un ilustre convento italiano. Su cálida bienvenida a la pintoresca campiña italiana pronto se ve interrumpida cuando Cecilia descubre que su nuevo hogar esconde algunos secretos oscuros y horripilantes.",
                "popularity": 435.104,
                "poster_path": "/kz4y4ngB2DyhIwe81hL76Jj6rKU.jpg",
                "release_date": "2024-05-30",
                "title": "Inmaculada",
                "video": false,
                "vote_average": 6.3,
                "vote_count": 625
            },
            {
                "adult": false,
                "backdrop_path": "/nv6F6tz7r61DUhE7zgHwLJFcTYp.jpg",
                "genre_ids": [
                    10749,
                    35,
                    80
                ],
                "id": 974635,
                "original_language": "en",
                "original_title": "Hit Man",
                "overview": "Un profesor puritano descubre su talento oculto como falso asesino a sueldo. Encuentra su pareja en un cliente que le roba el corazón y enciende un polvorín de engaño, deleite e identidades confusas. Inspirado en una increíble historia real.",
                "popularity": 448.256,
                "poster_path": "/lUA3eDLlgeWORvuuUz3s7vLHa1s.jpg",
                "release_date": "2024-06-20",
                "title": "Cómplices del engaño",
                "video": false,
                "vote_average": 7.068,
                "vote_count": 388
            },
            {
                "adult": false,
                "backdrop_path": "/cZmOrIOkJ2SNfVdiO85dUbOAYnL.jpg",
                "genre_ids": [
                    16,
                    18
                ],
                "id": 1012201,
                "original_language": "ja",
                "original_title": "劇場版ハイキュー!! ゴミ捨て場の決戦",
                "overview": "El encuentro entre los equipos rivales de Karasuno y Nekoma hará que la tensión aumente, ya que ambos equipos están decididos a salir victoriosos en el campeonato nacional de voleibol. Primera película del proyecto en dos partes para el final de \"Haikyu!\".",
                "popularity": 531.185,
                "poster_path": "/gFmY2GY2X71ErIlLbO1j9MqGn4J.jpg",
                "release_date": "2024-05-30",
                "title": "HAIKYU!! La batalla del basurero",
                "video": false,
                "vote_average": 7.38,
                "vote_count": 54
            },
            {
                "adult": false,
                "backdrop_path": "/kGWpaisyiOrOhkjn5FviMRUaoCb.jpg",
                "genre_ids": [
                    18,
                    10751
                ],
                "id": 1107387,
                "original_language": "zh",
                "original_title": "忠犬八公",
                "overview": "",
                "popularity": 227.764,
                "poster_path": "/uTETTVc9ghtGwKMvHpsJJMe46Xe.jpg",
                "release_date": "2024-05-23",
                "title": "Hachiko 2: Siempre a tu Lado",
                "video": false,
                "vote_average": 7.826,
                "vote_count": 135
            },
            {
                "adult": false,
                "backdrop_path": "/aINel9503ompOlGKn4sIVMg09Un.jpg",
                "genre_ids": [
                    9648,
                    27,
                    53
                ],
                "id": 838209,
                "original_language": "ko",
                "original_title": "파묘",
                "overview": "Una renombrada chamana (Kim Go-eun) y su aprendiz son contratados por una enigmática familia adinerada para investigar la enfermedad sobrenatural que afecta a su hijo primogénito. Con la ayuda de un embalsamador y el experto en feng shui más famoso del país (Choi Min-sik), rastrean una tumba familiar oculta, ubicada en tierra sagrada. Percibiendo un aura ominosa alrededor del lugar, el equipo opta por exhumar y reubicar los restos ancestrales de inmediato. Pero algo mucho más oscuro emerge en la remota montaña, desatando fuerzas sobrenaturales que amenazan con destruirlos a todos.",
                "popularity": 202.171,
                "poster_path": "/tw0i3kkmOTjDjGFZTLHKhoeXVvA.jpg",
                "release_date": "2024-06-20",
                "title": "Exhuma: La Tumba Del Diablo",
                "video": false,
                "vote_average": 7.492,
                "vote_count": 189
            },
            {
                "adult": false,
                "backdrop_path": "/cqf3o3UrL7icGN0cTd1w7Fx0C38.jpg",
                "genre_ids": [
                    80,
                    18
                ],
                "id": 1008409,
                "original_language": "en",
                "original_title": "The Bikeriders",
                "overview": "Kathy, una tenaz miembro de los Vandals que está casada con un ciclista salvaje e imprudente llamado Benny, relata la evolución de los Vandals a lo largo de una década, comenzando como un club local de forasteros unidos por los buenos tiempos, las bicicletas ruidosas y el respeto. por su fuerte y firme líder Johnny. A lo largo de los años, Kathy hace todo lo posible para navegar la naturaleza indómita de su marido y su lealtad a Johnny, con quien siente que debe competir por la atención de Benny. A medida que la vida en los Vandals se vuelve más peligrosa y el club amenaza con convertirse en una pandilla más siniestra, Kathy, Benny y Johnny se ven obligados a tomar decisiones sobre su lealtad al club y entre ellos.",
                "popularity": 196.013,
                "poster_path": "/xSxOuco3CsaRQNkDLU31PJTTALX.jpg",
                "release_date": "2024-06-20",
                "title": "El club de los vándalos",
                "video": false,
                "vote_average": 7.469,
                "vote_count": 81
            },
            {
                "adult": false,
                "backdrop_path": "/lA6KdSkCTxwzvqzPqxch997RabQ.jpg",
                "genre_ids": [
                    28,
                    53
                ],
                "id": 560016,
                "original_language": "en",
                "original_title": "Monkey Man",
                "overview": "Kid, un joven anónimo que se gana la vida a duras penas en un club de lucha clandestino donde, noche tras noche, con una máscara de gorila, es golpeado hasta sangrar por luchadores más populares a cambio de dinero. Después de años de ira reprimida, Kid descubre una manera de infiltrarse en el enclave de la siniestra élite de la ciudad. A medida que el trauma de su infancia se desborda, sus manos misteriosamente llenas de cicatrices desataron una explosiva campaña de represalia para ajustar cuentas con los hombres que le quitaron todo.",
                "popularity": 114.54,
                "poster_path": "/kJhQfICVsZGeYGGRudgcqiD1zQY.jpg",
                "release_date": "2024-05-16",
                "title": "Monkey Man: El Despertar De La Bestia",
                "video": false,
                "vote_average": 7.088,
                "vote_count": 520
            },
            {
                "adult": false,
                "backdrop_path": "/pEm2iEVFVqbhiNwx7UAzezJ1Et4.jpg",
                "genre_ids": [
                    27,
                    53
                ],
                "id": 1010600,
                "original_language": "en",
                "original_title": "The Strangers: Chapter 1",
                "overview": "Durante una parada en un viaje por carretera, en una remota casa de alquiler en el bosque, una joven pareja se convierte en la presa de una misteriosa banda de tres extraños enmascarados que atacan sin previo aviso ni motivo.",
                "popularity": 130.193,
                "poster_path": "/tnKmLDpSpJ3CfCav43z13fkeEnr.jpg",
                "release_date": "2024-05-23",
                "title": "Los Extraños Capítulo 1",
                "video": false,
                "vote_average": 5.7,
                "vote_count": 143
            },
            {
                "adult": false,
                "backdrop_path": "/rBo0yYQTruIYEuXdyCAyVVlNb2H.jpg",
                "genre_ids": [
                    18
                ],
                "id": 974036,
                "original_language": "en",
                "original_title": "Ordinary Angels",
                "overview": "Inspirada en la historia real de una peluquera que, sin ayuda de nadie, intentó reunir a toda una comunidad para ayudar a un padre viudo a intentar salvar la vida de su pequeña hija gravemente enferma.",
                "popularity": 87.105,
                "poster_path": "/x1jkzJGnerhMrweZsoCVgefPQ0L.jpg",
                "release_date": "2024-05-30",
                "title": "Ángeles inesperados",
                "video": false,
                "vote_average": 7.924,
                "vote_count": 126
            },
            {
                "adult": false,
                "backdrop_path": "/sQCjcWPoAVuTvDJfBJitBlDstNU.jpg",
                "genre_ids": [
                    53,
                    18,
                    80
                ],
                "id": 664341,
                "original_language": "en",
                "original_title": "Eileen",
                "overview": "Boston, años 60. Eileen es una chica atrapada entre un hogar lúgubre con un padre alcohólico y su empleo en una prisión, donde sus compañeros la han condenado al ostracismo. Cuando una guapa y magnética mujer se une al personal de la prisión, Eileen es incapaz de resistirse a esa milagrosa e incipiente amistad. Pero esa amistad la involucrará en un crimen que alterará todo.",
                "popularity": 63.643,
                "poster_path": "/qvKeT2Supw0xv1fWQn7Myx53gFx.jpg",
                "release_date": "2024-05-23",
                "title": "Mi Nombre Era Eileen",
                "video": false,
                "vote_average": 6.286,
                "vote_count": 161
            },
            {
                "adult": false,
                "backdrop_path": "/dFznp4lrpdkKKWa32tL8BErWToG.jpg",
                "genre_ids": [
                    27,
                    53
                ],
                "id": 983507,
                "original_language": "no",
                "original_title": "Meg, deg & Frank",
                "overview": "Sigrid cree haber encontrado a su media naranja en Christian, un hombre rico y atractivo. Sin embargo, hay un detalle peculiar: Christian vive con un chico que viste y se comporta como un perro de compañía. Sigrid, dispuesta a mantener la mente abierta, continúa con la relación, pero empieza a darse cuenta de un aspecto oscuro en Christian. El ‘juego del perrito’ puede no ser tan inocente como parece.",
                "popularity": 62.067,
                "poster_path": "/jWR3el9gvfEZfICBUTF2jbR52uq.jpg",
                "release_date": "2024-05-23",
                "title": "Good Boy",
                "video": false,
                "vote_average": 6.477,
                "vote_count": 218
            },
            {
                "adult": false,
                "backdrop_path": "/3e8IhctkdEXfBxxC9ms2eWEjjCE.jpg",
                "genre_ids": [
                    10402,
                    99
                ],
                "id": 1203397,
                "original_language": "en",
                "original_title": "Rite Here Rite Now",
                "overview": "",
                "popularity": 78.388,
                "poster_path": "/13ZKITe1dacTwavKsGc02gOWbqB.jpg",
                "release_date": "2024-06-20",
                "title": "Rite Here Rite Now",
                "video": false,
                "vote_average": 9,
                "vote_count": 4
            },
            {
                "adult": false,
                "backdrop_path": "/okXIAgFc2U6jf4uZrivhwEu7vbW.jpg",
                "genre_ids": [
                    35,
                    14
                ],
                "id": 823482,
                "original_language": "en",
                "original_title": "Dream Scenario",
                "overview": "El desafortunado hombre de familia Paul Matthews encuentra su vida patas arriba cuando millones de extraños de repente comienzan a verlo en sus sueños. Pero cuando sus apariciones nocturnas toman un giro de pesadilla, Paul se ve obligado a navegar por su nuevo estrellato.",
                "popularity": 72.542,
                "poster_path": "/8LJVauVacKhi0xuUa8aKTPGn4pW.jpg",
                "release_date": "2024-05-16",
                "title": "El Hombre de Los Sueños",
                "video": false,
                "vote_average": 6.706,
                "vote_count": 686
            },
            {
                "adult": false,
                "backdrop_path": "/eVPMCjjZ3kDRIYrTooNKwjZnUl.jpg",
                "genre_ids": [
                    27,
                    9648
                ],
                "id": 1082063,
                "original_language": "pt",
                "original_title": "A Semente do Mal",
                "overview": "Edward y su novia Riley se embarcan en un viaje al norte de Portugal para encontrarse con la familia perdida de Edward. Al llegar a la magnífica villa, Edward está encantado de conocer a su madre y a su hermano gemelo ansioso por conectarse con sus orígenes. Pronto Edward descubrirá el terrible secreto que lo une a ellos.",
                "popularity": 38.049,
                "poster_path": "/unpFLaxiqbCjQLssTZLVuws6t43.jpg",
                "release_date": "2024-06-20",
                "title": "Herencia Siniestra",
                "video": false,
                "vote_average": 5.3,
                "vote_count": 21
            }
        ],
        "total_pages": 1,
        "total_results": 0
    }

    const popularMovies: IMovieResponse = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/stKGOm8UyhuLPR9sZLjs5AkmncA.jpg",
                "genre_ids": [
                    16,
                    10751,
                    12,
                    35
                ],
                "id": 1022789,
                "original_language": "en",
                "original_title": "Inside Out 2",
                "overview": "Una aventura completamente nueva dentro de la cabeza adolescente de Riley que presenta un nuevo conjunto de emociones.",
                "popularity": 9019.354,
                "poster_path": "/2PuAY3xSvbchQWqpSiXw08Yt0NP.jpg",
                "release_date": "2024-06-13",
                "title": "IntensaMente 2",
                "video": false,
                "vote_average": 7.78,
                "vote_count": 758
            },
            {
                "adult": false,
                "backdrop_path": "/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
                "genre_ids": [
                    878,
                    12,
                    28
                ],
                "id": 653346,
                "original_language": "en",
                "original_title": "Kingdom of the Planet of the Apes",
                "overview": "300 años después del reinado de César, un nuevo líder tiránico construye su imperio esclavizando a otros clanes de primates, un joven simio llamado Noa emprende un viaje desgarrador que lo hará cuestionar todo lo que sabía sobre el pasado y tomar decisiones que definirán el futuro tanto de simios como humanos.",
                "popularity": 4144.345,
                "poster_path": "/kkFn3KM47Qq4Wjhd8GuFfe3LX27.jpg",
                "release_date": "2024-05-09",
                "title": "El planeta de los simios: Nuevo reino",
                "video": false,
                "vote_average": 6.875,
                "vote_count": 1214
            },
            {
                "adult": false,
                "backdrop_path": "/j29ekbcLpBvxnGk6LjdTc2EI5SA.jpg",
                "genre_ids": [
                    16,
                    10751,
                    12,
                    18,
                    35
                ],
                "id": 150540,
                "original_language": "en",
                "original_title": "Inside Out",
                "overview": "Riley es una chica que disfruta o padece toda clase de sentimientos. Aunque su vida ha estado marcada por la Alegría, también se ve afectada por otro tipo de emociones. Lo que Riley no entiende muy bien es por qué motivo tiene que existir la Tristeza en su vida. Una serie de acontecimientos hacen que Alegría y Tristeza se mezclen en una peligrosa aventura que dará un vuelco al mundo de Riley.",
                "popularity": 3112.285,
                "poster_path": "/sG3bHZWCMOZwhUq71WbPG9Vrrwc.jpg",
                "release_date": "2015-06-19",
                "title": "Intensa-Mente",
                "video": false,
                "vote_average": 7.915,
                "vote_count": 20833
            },
            {
                "adult": false,
                "backdrop_path": "/gRApXuxWmO2forYTuTmcz5RaNUV.jpg",
                "genre_ids": [
                    28,
                    80,
                    53,
                    35
                ],
                "id": 573435,
                "original_language": "en",
                "original_title": "Bad Boys: Ride or Die",
                "overview": "Tras escuchar falsas acusaciones sobre su excapitán y mentor Mike y Marcus deciden investigar el asunto incluso volverse los más buscados de ser necesarios",
                "popularity": 2467.417,
                "poster_path": "/5jI2vEHJReAx8iFDmhC2O3yW37w.jpg",
                "release_date": "2024-06-06",
                "title": "Bad Boys: Hasta la muerte",
                "video": false,
                "vote_average": 7.075,
                "vote_count": 420
            },
            {
                "adult": false,
                "backdrop_path": "/nxxCPRGTzxUH8SFMrIsvMmdxHti.jpg",
                "genre_ids": [
                    35,
                    14,
                    10751
                ],
                "id": 639720,
                "original_language": "en",
                "original_title": "IF",
                "overview": "Una joven descubre la capacidad de ver a los amigos imaginarios de las personas que han sido abandonados por los niños a los que ayudaron.",
                "popularity": 2283.41,
                "poster_path": "/8RgGuC7w8JxhykauzTC4bwha1J8.jpg",
                "release_date": "2024-05-15",
                "title": "Amigos imaginarios",
                "video": false,
                "vote_average": 7.503,
                "vote_count": 378
            },
            {
                "adult": false,
                "backdrop_path": "/iTWrsOVsUqcwYSxrpINNs3hG2nC.jpg",
                "genre_ids": [
                    53,
                    27,
                    28,
                    9648
                ],
                "id": 1001311,
                "original_language": "fr",
                "original_title": "Sous la Seine",
                "overview": "Para salvar París de un baño de sangre internacional, una científica en duelo se ve obligada a enfrentarse a su trágico pasado cuando un tiburón gigante aparece en el Sena.",
                "popularity": 2283.255,
                "poster_path": "/ww9s0QSZ06WIxyZAKAdg6nqfE5v.jpg",
                "release_date": "2024-06-05",
                "title": "En las Profundidades del Sena",
                "video": false,
                "vote_average": 6.02,
                "vote_count": 704
            },
            {
                "adult": false,
                "backdrop_path": "/lLh39Th5plbrQgbQ4zyIULsd0Pp.jpg",
                "genre_ids": [
                    878,
                    28,
                    12
                ],
                "id": 823464,
                "original_language": "en",
                "original_title": "Godzilla x Kong: The New Empire",
                "overview": "Una aventura cinematográfica completamente nueva, que enfrentará al todopoderoso Kong y al temible Godzilla contra una colosal amenaza desconocida escondida dentro de nuestro mundo. La nueva y épica película profundizará en las historias de estos titanes, sus orígenes y los misterios de Isla Calavera y más allá, mientras descubre la batalla mítica que ayudó a forjar a estos seres extraordinarios y los unió a la humanidad para siempre.",
                "popularity": 2106.664,
                "poster_path": "/2YqZ6IyFk7menirwziJvfoVvSOh.jpg",
                "release_date": "2024-03-27",
                "title": "Godzilla y Kong: El nuevo imperio",
                "video": false,
                "vote_average": 7.219,
                "vote_count": 2900
            },
            {
                "adult": false,
                "backdrop_path": "/z121dSTR7PY9KxKuvwiIFSYW8cf.jpg",
                "genre_ids": [
                    10752,
                    28,
                    18
                ],
                "id": 929590,
                "original_language": "en",
                "original_title": "Civil War",
                "overview": "En un futuro cercano, un grupo de periodistas de guerra intenta sobrevivir mientras informan la verdad mientras Estados Unidos se encuentra al borde de una guerra civil.",
                "popularity": 1823.966,
                "poster_path": "/iCOQUVVaPqRuR3JqF71akguf6Mj.jpg",
                "release_date": "2024-04-18",
                "title": "Guerra Civil",
                "video": false,
                "vote_average": 7.013,
                "vote_count": 1699
            },
            {
                "adult": false,
                "backdrop_path": "/vblTCXOWUQGSc837vgbhDRi4HSc.jpg",
                "genre_ids": [
                    28,
                    80,
                    35,
                    53
                ],
                "id": 955555,
                "original_language": "ko",
                "original_title": "The Roundup: Punishment",
                "overview": "Secuela de la taquilera película de acción coreana The Roundup. Siete años después de la redada en Vietnam, Ma Seok-do se une a un nuevo escuadrón para investigar un asesinato. No tardará en indagar más cuando descubre que el caso tiene que ver con una droga sintética y una banda de matones.",
                "popularity": 1431.725,
                "poster_path": "/cB607Cz7Mpdwepnz6RncXOW9gDD.jpg",
                "release_date": "2023-05-31",
                "title": "Fuerza bruta: sin salida",
                "video": false,
                "vote_average": 7.209,
                "vote_count": 316
            },
            {
                "adult": false,
                "backdrop_path": "/g5Ha2DhXIuxsUl4gaDnbw3jOAlo.jpg",
                "genre_ids": [
                    28
                ],
                "id": 1115623,
                "original_language": "en",
                "original_title": "The Last Kumite",
                "overview": "Un último kumite, una batalla final - por la vida de su hija.",
                "popularity": 1251.462,
                "poster_path": "/zDkaJgsPoSqa2cMe2hW2HAfyWwO.jpg",
                "release_date": "2024-05-09",
                "title": "The Last Kumite",
                "video": false,
                "vote_average": 7.271,
                "vote_count": 48
            },
            {
                "adult": false,
                "backdrop_path": "/fZv4EldEPurSz0d2uVIoL4Sng8x.jpg",
                "genre_ids": [
                    28,
                    18,
                    53
                ],
                "id": 1016346,
                "original_language": "bn",
                "original_title": "MR-9: Do or Die",
                "overview": "Masud Rana es un agente secreto con el nombre en clave MR-9 de la Agencia de Contrainteligencia de Bangladesh, que forma equipo con un agente de la CIA para acabar con una organización criminal internacional dirigida por un despiadado hombre de negocios.",
                "popularity": 1223.754,
                "poster_path": "/euAVHzSzZY14H7pnInO2ANXIaKB.jpg",
                "release_date": "2023-08-25",
                "title": "MR-9: Mision Mortal",
                "video": false,
                "vote_average": 6.742,
                "vote_count": 66
            },
            {
                "adult": false,
                "backdrop_path": "/oZDRuGHhe5uY8wBqFJcJZT9kdvJ.jpg",
                "genre_ids": [
                    27,
                    9648,
                    14
                ],
                "id": 1086747,
                "original_language": "en",
                "original_title": "The Watchers",
                "overview": "Mina, la artista de 28 años, queda varada en un extenso bosque virgen en el oeste de Irlanda. Al encontrar refugio, sin saberlo, queda atrapada junto a tres extraños que son observados y acechados por criaturas misteriosas cada noche.",
                "popularity": 1179.031,
                "poster_path": "/13G0wKhucGWiERNloOicAuzQIyd.jpg",
                "release_date": "2024-06-06",
                "title": "Observados",
                "video": false,
                "vote_average": 6.2,
                "vote_count": 170
            },
            {
                "adult": false,
                "backdrop_path": "/SI22DaQXIfDvLrNBHGpSVShrsC.jpg",
                "genre_ids": [
                    16,
                    878,
                    10751,
                    28
                ],
                "id": 829402,
                "original_language": "en",
                "original_title": "Ultraman: Rising",
                "overview": "Con Tokio bajo el ataque de los kaiju, Ultraman descubre que su mayor desafío no es luchar contra monstruos gigantes, sino criar uno.",
                "popularity": 1159.908,
                "poster_path": "/2D7SsqU8VZOl838KR7q9pzljaLe.jpg",
                "release_date": "2024-06-14",
                "title": "Ultraman: El ascenso",
                "video": false,
                "vote_average": 8.349,
                "vote_count": 109
            },
            {
                "adult": false,
                "backdrop_path": "/3TNSoa0UHGEzEz5ndXGjJVKo8RJ.jpg",
                "genre_ids": [
                    878,
                    28
                ],
                "id": 614933,
                "original_language": "en",
                "original_title": "Atlas",
                "overview": "Una analista antiterrorista que no confía en la inteligencia artificial descubre que esta puede ser su única esperanza cuando una misión para capturar a un robot rebelde sale mal.",
                "popularity": 1128.477,
                "poster_path": "/wSnBSv7oHgm1kZmiM8IqithlTmJ.jpg",
                "release_date": "2024-05-24",
                "title": "Atlas",
                "video": false,
                "vote_average": 6.816,
                "vote_count": 882
            },
            {
                "adult": false,
                "backdrop_path": "/gGmf3CyHdXvaZtcun0DvU1WSNft.jpg",
                "genre_ids": [
                    28,
                    14,
                    12
                ],
                "id": 626412,
                "original_language": "ko",
                "original_title": "외계+인 2부",
                "overview": "",
                "popularity": 1126.439,
                "poster_path": "/3l04H9ljNegDGG9gnKDhLExJvpz.jpg",
                "release_date": "2024-01-10",
                "title": "Alienoid: El regreso hacia al futuro",
                "video": false,
                "vote_average": 6.714,
                "vote_count": 309
            },
            {
                "adult": false,
                "backdrop_path": "/kYgQzzjNis5jJalYtIHgrom0gOx.jpg",
                "genre_ids": [
                    16,
                    28,
                    10751,
                    35,
                    14
                ],
                "id": 1011985,
                "original_language": "en",
                "original_title": "Kung Fu Panda 4",
                "overview": "Po se está preparando para convertirse en el líder espiritual de su Valle de la Paz, pero también necesita a alguien que ocupe su lugar como Guerrero Dragón. Como tal, entrenará a un nuevo practicante de kung fu para el lugar y se encontrará con un villano llamado Camaleón que evoca villanos del pasado.",
                "popularity": 1090.508,
                "poster_path": "/zS8BSQdbOesql0EWbs17kPvLoAT.jpg",
                "release_date": "2024-03-09",
                "title": "Kung Fu Panda 4",
                "video": false,
                "vote_average": 7.124,
                "vote_count": 2103
            },
            {
                "adult": false,
                "backdrop_path": "/oavbmL3iddJUmC8nQjL6bLHwAP4.jpg",
                "genre_ids": [
                    27
                ],
                "id": 719221,
                "original_language": "en",
                "original_title": "Tarot",
                "overview": "Cuando un grupo de amigos viola imprudentemente la regla sagrada de las lecturas de Tarot -nunca usar la baraja de otra persona-, desatan sin saberlo un mal innombrable atrapado en las cartas malditas. Uno a uno, se enfrentan cara a cara con el destino y terminan en una carrera contra la muerte para escapar del futuro predicho en sus lecturas.",
                "popularity": 1083.243,
                "poster_path": "/Adh7xmtgSIUGZBaMj9VLTmq2G8z.jpg",
                "release_date": "2024-05-16",
                "title": "Tarot de la muerte",
                "video": false,
                "vote_average": 6.601,
                "vote_count": 569
            },
            {
                "adult": false,
                "backdrop_path": "/H5HjE7Xb9N09rbWn1zBfxgI8uz.jpg",
                "genre_ids": [
                    28,
                    35
                ],
                "id": 746036,
                "original_language": "en",
                "original_title": "The Fall Guy",
                "overview": "Un especialista maltratado y pasado de su mejor momento se encuentra de nuevo en una película con la estrella para la que fue su doble hace mucho tiempo y que lo reemplazó. El problema, sin embargo, es que la estrella ha desaparecido.",
                "popularity": 1039.948,
                "poster_path": "/ceiGl0SNZpR01o5lfYImt2QgKuq.jpg",
                "release_date": "2024-05-01",
                "title": "Profesión peligro",
                "video": false,
                "vote_average": 7.287,
                "vote_count": 1375
            },
            {
                "adult": false,
                "backdrop_path": "/11G6N5zW0KykVS0EcNKeXHUmQj8.jpg",
                "genre_ids": [
                    10752
                ],
                "id": 1136318,
                "original_language": "en",
                "original_title": "Battle Over Britain",
                "overview": "Durante el apogeo de la Batalla de Inglaterra, una tropa de exhaustos pilotos de Spitfire lucha hasta el último hombre en defensa de su país.",
                "popularity": 812.053,
                "poster_path": "/6wVVt9mWcwZJaVTQnv02BiSsQSv.jpg",
                "release_date": "2023-12-01",
                "title": "Batalla aérea",
                "video": false,
                "vote_average": 7.291,
                "vote_count": 55
            },
            {
                "adult": false,
                "backdrop_path": "/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
                "genre_ids": [
                    878,
                    12
                ],
                "id": 693134,
                "original_language": "en",
                "original_title": "Dune: Part Two",
                "overview": "Sigue la mítica jornada de Paul Atreides mientras se une con Chani y los Fremen en su camino hacia la venganza contra los conspiradores que destruyeron a su familia. Enfrentado a una elección entre el amor de su vida y el destino del universo conocido, Paul se esfuerza por prevenir un terrible futuro que solo él puede prever.",
                "popularity": 800.704,
                "poster_path": "/v2NN1TMK3ifuiEyawa3ukkcSOUQ.jpg",
                "release_date": "2024-02-29",
                "title": "Duna: Parte dos",
                "video": false,
                "vote_average": 8.171,
                "vote_count": 4645
            }
        ],
        "total_pages": 44799,
        "total_results": 895979
    }

    const ratingMovies: IMovieResponse = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/zfbjgQE1uSd9wiPTX4VzsLi0rGG.jpg",
                "genre_ids": [
                    18,
                    80
                ],
                "id": 278,
                "original_language": "en",
                "original_title": "The Shawshank Redemption",
                "overview": "Andy Dufresne es un banquero injustamente encarcelado en la prisión de Shawshank por el asesinato de su esposa y su amante. Dentro de prisión, Andy entabla una amistad con Red, un prisionero con habilidades para conseguir cosas. Estos dos hombres encarcelados se unirán durante años, encontrando consuelo y eventual redención a través de actos de decencia común.",
                "popularity": 134.068,
                "poster_path": "/uRRTV7p6l2ivtODWJVVAMRrwTn2.jpg",
                "release_date": "1994-09-23",
                "title": "Sueño de fuga",
                "video": false,
                "vote_average": 8.705,
                "vote_count": 26362
            },
            {
                "adult": false,
                "backdrop_path": "/tmU7GeKVybMWFButWEGl2M4GeiP.jpg",
                "genre_ids": [
                    18,
                    80
                ],
                "id": 238,
                "original_language": "en",
                "original_title": "The Godfather",
                "overview": "Don Vito Corleone es el respetado y temido jefe de una de las cinco familias de la mafia de Nueva York. Tiene cuatro hijos: una chica, Connie, y tres varones: el impulsivo Sonny, el pusilánime Freddie y Michael, que no quiere saber nada de los negocios de su padre. Cuando Corleone, siempre aconsejado por su consejero Tom Hagen, se niega a intervenir en el negocio de las drogas, el jefe de otra banda ordena su asesinato. Empieza entonces una violenta y cruenta guerra entre las familias mafiosas.",
                "popularity": 192.441,
                "poster_path": "/5HlLUsmsv60cZVTzVns9ICZD6zU.jpg",
                "release_date": "1998-08-14",
                "title": "El Padrino",
                "video": false,
                "vote_average": 8.694,
                "vote_count": 19996
            },
            {
                "adult": false,
                "backdrop_path": "/b6w7gKLQLS2zw4JK0XmKgQ4gnzr.jpg",
                "genre_ids": [
                    18,
                    80
                ],
                "id": 240,
                "original_language": "en",
                "original_title": "The Godfather Part II",
                "overview": "Continuación de la historia de los Corleone por medio de dos historias paralelas: la elección de Michael como jefe de los negocios familiares y los orígenes del patriarca, Don Vito Corleone, primero en su Sicilia natal y posteriormente en Estados Unidos, donde, empezando desde abajo, llegó a ser un poderosísimo jefe de la mafia de Nueva York.",
                "popularity": 96.805,
                "poster_path": "/mbry0W5PRylSUHsYzdiY2FSJwze.jpg",
                "release_date": "1976-03-12",
                "title": "El Padrino II",
                "video": false,
                "vote_average": 8.577,
                "vote_count": 12073
            },
            {
                "adult": false,
                "backdrop_path": "/zb6fM1CX41D9rF9hdgclu0peUmy.jpg",
                "genre_ids": [
                    18,
                    36,
                    10752
                ],
                "id": 424,
                "original_language": "en",
                "original_title": "Schindler's List",
                "overview": "La emotiva y desgarradora historia real de Oskar Schindler, un empresario alemán que, durante el Holocausto, emplea a judíos en su fábrica para salvarlos del exterminio nazi, mostrando cómo un acto de compasión puede desafiar el horror y la barbarie.",
                "popularity": 70.26,
                "poster_path": "/xnvHaMFNXzemoH4uXHDMtKnpF7l.jpg",
                "release_date": "1994-02-24",
                "title": "La Lista de Schindler",
                "video": false,
                "vote_average": 8.568,
                "vote_count": 15477
            },
            {
                "adult": false,
                "backdrop_path": "/qqHQsStV6exghCM7zbObuYBiYxw.jpg",
                "genre_ids": [
                    18
                ],
                "id": 389,
                "original_language": "en",
                "original_title": "12 Angry Men",
                "overview": "Doce miembros de un jurado deliberan sobre el veredicto de un caso de homicidio. A medida que discuten, los prejuicios personales y las opiniones en conflicto emergen, desafiando la justicia y revelando la complejidad del sistema legal.",
                "popularity": 56.653,
                "poster_path": "/t88XfoxO5cX3f0qaSxWsBS0Lc3.jpg",
                "release_date": "2000-01-01",
                "title": "12 Hombres en Pugna",
                "video": false,
                "vote_average": 8.544,
                "vote_count": 8326
            },
            {
                "adult": false,
                "backdrop_path": "/90ez6ArvpO8bvpyIngBuwXOqJm5.jpg",
                "genre_ids": [
                    35,
                    18,
                    10749
                ],
                "id": 19404,
                "original_language": "hi",
                "original_title": "दिलवाले दुल्हनिया ले जायेंगे",
                "overview": "Los Singh son una familia india con grandes convicciones culturales de su nación de origen, que emigraron a Reino Unido antes de nacer sus primeros hijos. Uno de ellos querrá casarse con una mujer ajena a su cultura y para ello deberá hacer todos los esfuerzos por convencer a su familia.",
                "popularity": 31.563,
                "poster_path": "/2CAL2433ZeIihfX1Hb2139CX0pW.jpg",
                "release_date": "1995-10-20",
                "title": "Amor Contra Viento Y Marea",
                "video": false,
                "vote_average": 8.537,
                "vote_count": 4401
            },
            {
                "adult": false,
                "backdrop_path": "/mSDsSDwaP3E7dEfUPWy4J0djt4O.jpg",
                "genre_ids": [
                    16,
                    10751,
                    14
                ],
                "id": 129,
                "original_language": "ja",
                "original_title": "千と千尋の神隠し",
                "overview": "Durante la mudanza de su familia a los suburbios, una huraña niña de 10 años de edad deambula por un mundo gobernado por dioses, brujas y espíritus, y donde los humanos se convierten en bestias.",
                "popularity": 107.606,
                "poster_path": "/wn0wOGqFKl5hF4If8ev78mn4LGY.jpg",
                "release_date": "2004-01-16",
                "title": "El viaje de Chihiro",
                "video": false,
                "vote_average": 8.537,
                "vote_count": 16048
            },
            {
                "adult": false,
                "backdrop_path": "/dqK9Hag1054tghRQSqLSfrkvQnA.jpg",
                "genre_ids": [
                    18,
                    28,
                    80,
                    53
                ],
                "id": 155,
                "original_language": "en",
                "original_title": "The Dark Knight",
                "overview": "Cuando la amenaza conocida como el Joker causa estragos y caos en la gente de Ciudad Gótica, Batman debe aceptar una de las mayores pruebas psicológicas y físicas de su capacidad para luchar contra la injusticia.",
                "popularity": 94.65,
                "poster_path": "/8QDQExnfNFOtabLDKqfDQuHDsIg.jpg",
                "release_date": "2008-07-18",
                "title": "Batman: El caballero de la noche",
                "video": false,
                "vote_average": 8.516,
                "vote_count": 32122
            },
            {
                "adult": false,
                "backdrop_path": "/TU9NIjwzjoKPwQHoHshkFcQUCG.jpg",
                "genre_ids": [
                    35,
                    53,
                    18
                ],
                "id": 496243,
                "original_language": "ko",
                "original_title": "기생충",
                "overview": "Tanto Gi Taek como su familia están sin trabajo. Cuando su hijo mayor, Gi Woo, empieza a recibir clases particulares en casa de Park, las dos familias, que tienen mucho en común pese a pertenecer a dos mundos totalmente distintos, comienzan una interrelación de resultados impresivibles.",
                "popularity": 91.546,
                "poster_path": "/4N55tgxDW0RRATyrZHbx0q9HUKv.jpg",
                "release_date": "2019-12-25",
                "title": "Parásitos",
                "video": false,
                "vote_average": 8.509,
                "vote_count": 17677
            },
            {
                "adult": false,
                "backdrop_path": "/vxJ08SvwomfKbpboCWynC3uqUg4.jpg",
                "genre_ids": [
                    14,
                    18,
                    80
                ],
                "id": 497,
                "original_language": "en",
                "original_title": "The Green Mile",
                "overview": "Las vidas de los guardias del corredor de la muerte se ven afectadas por uno de sus cargos: un hombre negro acusado de asesinato y violación de niños, pero que tiene un misterioso don.",
                "popularity": 122.595,
                "poster_path": "/1EFS40uFzv5ZVLSpu3xqYqnou67.jpg",
                "release_date": "1999-12-10",
                "title": "Milagros Inesperados",
                "video": false,
                "vote_average": 8.505,
                "vote_count": 16925
            },
            {
                "adult": false,
                "backdrop_path": "/dIWwZW7dJJtqC6CgWzYkNVKIUm8.jpg",
                "genre_ids": [
                    16,
                    10749,
                    18
                ],
                "id": 372058,
                "original_language": "ja",
                "original_title": "君の名は。",
                "overview": "Mitsuha es la hija del alcalde de una pequeña ciudad de montaña. Es una joven sencilla de escuela secundaria que vive con su hermana y su abuela y no tiene ningún reparo en que se sepa que no está interesada en los rituales sintoístas ni en ayudar a la campaña electoral de su padre. En su lugar sueña con abandonar la aburrida ciudad y probar suerte en Tokio. Taki es un chico de secundaria en Tokio que trabaja medio tiempo en un restaurante italiano y aspira a convertirse en arquitecto o artista. Cada noche tiene un extraño sueño donde se convierte... en una chica de escuela secundaria en un pequeño pueblo de montaña.",
                "popularity": 91.835,
                "poster_path": "/iaiy3tg9QVkDpObm1IGqmbC9A5C.jpg",
                "release_date": "2017-08-04",
                "title": "Tu Nombre",
                "video": false,
                "vote_average": 8.492,
                "vote_count": 11055
            },
            {
                "adult": false,
                "backdrop_path": "/suaEOtk1N1sgg2MTM7oZd2cfVp3.jpg",
                "genre_ids": [
                    53,
                    80
                ],
                "id": 680,
                "original_language": "en",
                "original_title": "Pulp Fiction",
                "overview": "Jules y Vincent, dos asesinos a sueldo con muy pocas luces, trabajan para Marsellus Wallace. Vincent le confiesa a Jules que Marsellus le ha pedido que cuide de Mia, su mujer. Jules le recomienda prudencia porque es muy peligroso sobrepasarse con la novia del jefe. Cuando llega la hora de trabajar, ambos deben ponerse manos a la obra. Su misión: recuperar un misterioso maletín.",
                "popularity": 215.637,
                "poster_path": "/hNcQAuquJxTxl2fJFs1R42DrWcf.jpg",
                "release_date": "1994-09-10",
                "title": "Tiempos Violentos",
                "video": false,
                "vote_average": 8.488,
                "vote_count": 27280
            },
            {
                "adult": false,
                "backdrop_path": "/2u7zbn8EudG6kLlBzUYqP8RyFU4.jpg",
                "genre_ids": [
                    12,
                    14,
                    28
                ],
                "id": 122,
                "original_language": "en",
                "original_title": "The Lord of the Rings: The Return of the King",
                "overview": "Las fuerzas de Saruman han sido destruidas, y su fortaleza sitiada. Ha llegado el momento de que se decida el destino de la Tierra Media, y por primera vez en mucho tiempo, parece que hay una pequeña esperanza. La atención del señor oscuro Sauron se centra ahora en Gondor, el último reducto de los hombres, y del cual Aragorn tendrá que reclamar el trono para ocupar su puesto de rey. Pero las fuerzas de Sauron ya se preparan para lanzar el último y definitivo ataque contra el reino de Gondor, la batalla que decidirá el destino de todos. Mientras tanto, Frodo y Sam continuan su camino hacia Mordor, a la espera de que Sauron no repare en que dos pequeños Hobbits se acercan cada día más al final de su camino, el Monte del Destino.",
                "popularity": 102.902,
                "poster_path": "/mWuFbQrXyLk2kMBKF9TUPtDwuPx.jpg",
                "release_date": "2003-12-17",
                "title": "El señor de los anillos: El retorno del rey",
                "video": false,
                "vote_average": 8.481,
                "vote_count": 23545
            },
            {
                "adult": false,
                "backdrop_path": "/mzfx54nfDPTUXZOG48u4LaEheDy.jpg",
                "genre_ids": [
                    35,
                    18,
                    10749
                ],
                "id": 13,
                "original_language": "en",
                "original_title": "Forrest Gump",
                "overview": "Basada en la novela homónima del escritor Winston Groom, la película fue dirigida por Robert Zemeckis y protagonizada por Tom Hanks. La historia describe varias décadas de la vida de Forrest Gump, un nativo de Alabama que sufre de una leve discapacidad intelectual.",
                "popularity": 133.323,
                "poster_path": "/oiqKEhEfxl9knzWXvWecJKN3aj6.jpg",
                "release_date": "1994-06-23",
                "title": "Forrest Gump",
                "video": false,
                "vote_average": 8.475,
                "vote_count": 26791
            },
            {
                "adult": false,
                "backdrop_path": "/Adrip2Jqzw56KeuV2nAxucKMNXA.jpg",
                "genre_ids": [
                    37
                ],
                "id": 429,
                "original_language": "it",
                "original_title": "Il buono, il brutto, il cattivo",
                "overview": "Durante la rabia de la Guerra civil americana entre la Unión y la Confederación, tres hombres, “una persona solitaria tranquila, un asesino a sueldo despiadado y un bandido mexicano, peinan el territorio americano hacia el Sudoeste en busca de una caja fuerte que contiene $200,000 en el oro robado.",
                "popularity": 132.493,
                "poster_path": "/vd9uj5KLlOrJnvNH03exLDlMAE0.jpg",
                "release_date": "1969-04-17",
                "title": "El Bueno, El Malo y El Feo",
                "video": false,
                "vote_average": 8.464,
                "vote_count": 8334
            },
            {
                "adult": false,
                "backdrop_path": "/d6UxFCGQxpszcf8mwgGjQ3ynqGl.jpg",
                "genre_ids": [
                    18,
                    80
                ],
                "id": 769,
                "original_language": "en",
                "original_title": "GoodFellas",
                "overview": "Henry Hill, hijo de padre irlandés y madre siciliana, vive en Brooklyn y se siente fascinado por la vida que llevan los gángsters de su barrio, donde la mayoría de los vecinos son inmigrantes. Paul Cicero, el patriarca de la familia Pauline, es el protector del barrio. A los trece años, Henry decide abandonar la escuela y entrar a formar parte de la organización mafiosa como chico de los recados; muy pronto se gana la confianza de sus jefes, gracias a lo cual irá subiendo de categoría.",
                "popularity": 149.63,
                "poster_path": "/3Yy0zBO9AlyAZH1cTI8Ko2ouCi.jpg",
                "release_date": "1990-09-19",
                "title": "Buenos Muchachos",
                "video": false,
                "vote_average": 8.464,
                "vote_count": 12498
            },
            {
                "adult": false,
                "backdrop_path": "/gwj4R8Uy1GwejKqfofREKI9Jh7L.jpg",
                "genre_ids": [
                    16,
                    18,
                    10752
                ],
                "id": 12477,
                "original_language": "ja",
                "original_title": "火垂るの墓",
                "overview": "Centrada en la ciudad de Kōbe, Japón, narra la dura historia de dos hermanos, Seita y Setsuko, y de su lucha desesperada por sobrevivir durante los últimos meses de la Segunda Guerra Mundial.",
                "popularity": 0.076,
                "poster_path": "/ufXfPXN5Yr4tS1oawcXdTr3oXw4.jpg",
                "release_date": "2012-01-20",
                "title": "La Tumba de las Luciérnagas",
                "video": false,
                "vote_average": 8.46,
                "vote_count": 5295
            },
            {
                "adult": false,
                "backdrop_path": "/qvZ91FwMq6O47VViAr8vZNQz3WI.jpg",
                "genre_ids": [
                    28,
                    18
                ],
                "id": 346,
                "original_language": "ja",
                "original_title": "七人の侍",
                "overview": "Una banda de forajidos atemorizan a los habitantes de un pequeño pueblo, saqueándolos periódicamente sin piedad. Para repeler estos ataques, los aldeanos deciden contratar a mercenarios. Finalmente, consiguen los servicios de 7 guerreros, 7 samurais dispuestos a defenderlos a cambio, tan solo, de cobijo y comida.",
                "popularity": 61.674,
                "poster_path": "/zr4DkzWIMjaWtj6hlsbN6dnNeTX.jpg",
                "release_date": "1954-04-26",
                "title": "Los Siete Samuráis",
                "video": false,
                "vote_average": 8.459,
                "vote_count": 3530
            },
            {
                "adult": false,
                "backdrop_path": "/k3SBILYxHRgjORb5tbvA5dm2N4h.jpg",
                "genre_ids": [
                    18,
                    10749
                ],
                "id": 11216,
                "original_language": "it",
                "original_title": "Nuovo Cinema Paradiso",
                "overview": "En los años previos a la llegada de la televisión (justo después del final de la Segunda Guerra Mundial), en un pequeño pueblo siciliano, el joven Toto vivía fascinado por el cine. Toto trata de entablar amistad con Alfredo, el proyeccionista del cine local, una persona muy irritable pero con un gran corazón. Todos estos hechos se presentan en forma de nostálgicos recuerdos de Toto que ha crecido hasta convertirse en un cineasta de éxito, y que revive a su infancia cuando recibe la noticia de que Alfredo ha muerto.",
                "popularity": 59.717,
                "poster_path": "/hHwsr3t5n7VVUbPyU8VZswn0jkL.jpg",
                "release_date": "2000-01-25",
                "title": "Cinema Paradiso",
                "video": false,
                "vote_average": 8.453,
                "vote_count": 4227
            },
            {
                "adult": false,
                "backdrop_path": "/gavyCu1UaTaTNPsVaGXT6pe5u24.jpg",
                "genre_ids": [
                    35,
                    18
                ],
                "id": 637,
                "original_language": "it",
                "original_title": "La vita è bella",
                "overview": "Una obra maestra cinematográfica inspiradora. La vida es bella fue nominada para siete premios de la Academia® en 1998, ganando 3 Óscares®, incluyendo el de Mejor actor, para Roberto Benigni. En esta historia extraordinaria, Guido (Benigni), un encantador, pero incompetente camarero, dotado de una vívida imaginación y de un irresistible sentido del humor, ha conquistado el corazón de la mujer que ama y creado una hermosa vida para su joven familia. Sin embargo, la vida se ve amenazada por la Segunda Guerra Mundial y Guido debe tomar partido de sus fortalezas para salvar a su querida esposa e hijo de un destino cruel. Tras recibir un volumen abrumador de alabanzas por parte de la crítica, este logro cinematográfico excepcional reavivará su espíritu y cautivará su corazón.",
                "popularity": 85.704,
                "poster_path": "/aZ7MFlKPfB02Lr9NwZQ4vsYRgcy.jpg",
                "release_date": "1999-02-26",
                "title": "La Vida es Bella",
                "video": false,
                "vote_average": 8.451,
                "vote_count": 12775
            }
        ],
        "total_pages": 474,
        "total_results": 9462
    }

    const upcomingMovies: IMovieResponse = {
        "page": 1,
        "results": [
            {
                "adult": false,
                "backdrop_path": "/fDmci71SMkfZM8RnCuXJVDPaSdE.jpg",
                "genre_ids": [
                    16,
                    10751,
                    35,
                    28
                ],
                "id": 519182,
                "original_language": "en",
                "original_title": "Despicable Me 4",
                "overview": "Gru y Lucy dan a luz a Gru Jr. y ahi Gru, con su hijo y una aprendiz robaran algo para detener a los nuevos villanos de turno.",
                "popularity": 711.785,
                "poster_path": "/pbCfLF4pys3mXfpXsFtp7tMLtLb.jpg",
                "release_date": "2024-07-04",
                "title": "Mi villano favorito 4",
                "video": false,
                "vote_average": 8.49,
                "vote_count": 49
            },
            {
                "adult": false,
                "backdrop_path": "/7aPrv2HFssWcOtpig5G3HEVk3uS.jpg",
                "genre_ids": [
                    28,
                    53,
                    12
                ],
                "id": 718821,
                "original_language": "en",
                "original_title": "Twisters",
                "overview": "Kate Cooper, una ex cazadora de tormentas perseguida por un devastador encuentro con un tornado durante, es llamada por su amigo Javi de regreso a las llanuras abiertas para probar un nuevo e innovador sistema de seguimiento. Allí, se cruza con la encantadora e imprudente superestrella de las redes sociales Tyler Owens y su estridente equipo. A medida que la temporada de tormentas se intensifica, se desatarán fenómenos aterradores nunca antes vistos, y Kate, Tyler y sus equipos competidores se encuentran de lleno en el camino de múltiples sistemas de tormentas que convergen sobre el centro de Oklahoma en la lucha de sus vidas.",
                "popularity": 68.691,
                "poster_path": "/50xgtaDR0xJkLSVghdTGUeMoPHP.jpg",
                "release_date": "2024-07-18",
                "title": "Tornados",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": "/hP3HWRujFCM2qLUYhSAJEm23ElP.jpg",
                "genre_ids": [
                    10749,
                    35,
                    18
                ],
                "id": 1096342,
                "original_language": "en",
                "original_title": "Beautiful Wedding",
                "overview": "Abby y Travis se despiertan después de una noche loca en Las Vegas como recién casados accidentales. Con la mafia pisándoles los talones, huyen a México para una luna de miel salvaje y extraña, pero ¿les espera otro desastre?",
                "popularity": 45.874,
                "poster_path": "/zBUVnahhmgnj9j6igjFD1xqafG2.jpg",
                "release_date": "2024-07-18",
                "title": "Una Boda y Otros Desastres",
                "video": false,
                "vote_average": 4.84,
                "vote_count": 97
            },
            {
                "adult": false,
                "backdrop_path": "/dapb1b0mQtGcxP4PYzNCjuN7gOr.jpg",
                "genre_ids": [
                    27,
                    9648,
                    53
                ],
                "id": 1023922,
                "original_language": "en",
                "original_title": "MaXXXine",
                "overview": "En los años 80 en Hollywood, la estrella de cine para adultos y aspirante a actriz Maxine Minx finalmente obtiene su gran oportunidad. Pero cuando un misterioso asesino acecha a las estrellas de Hollywood, un rastro de sangre amenaza con revelar su siniestro pasado.",
                "popularity": 59.352,
                "poster_path": "/jDw7wTs3qg7M06uQyoMvBpT2Y6U.jpg",
                "release_date": "2024-07-11",
                "title": "MaXXXine",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": "/dcGf6amsVeJ2oT75GhpeqavCWO8.jpg",
                "genre_ids": [
                    36,
                    18,
                    10752
                ],
                "id": 944194,
                "original_language": "en",
                "original_title": "The Great Escaper",
                "overview": "En el verano de 2014, Bernard Jordan, un veterano de la Segunda Guerra Mundial de 89 años, se escapa de su residencia en la que vive junto a su mujer Rene, para unirse a sus compañeros veteranos de guerra en una playa de Normandía, conmemorando a sus camaradas caídos en el 70 aniversario del Desembarco del Día D.",
                "popularity": 26.188,
                "poster_path": "/6wUW0fLnLhApWlI72g5A0NsdwpN.jpg",
                "release_date": "2024-07-04",
                "title": "El Último Escape",
                "video": false,
                "vote_average": 6.676,
                "vote_count": 54
            },
            {
                "adult": false,
                "backdrop_path": "/mKVHpoLi68ZL7FbrjBYkUhdUJT3.jpg",
                "genre_ids": [
                    35
                ],
                "id": 852247,
                "original_language": "en",
                "original_title": "Problemista",
                "overview": "Alejandro, un aspirante a diseñador de juguetes, lucha por dar vida a sus insólitas ideas en Nueva York. A medida que se le acaba el tiempo de su visado de trabajo, su única esperanza es ayudar a un personaje particular y extraño del mundo del arte.",
                "popularity": 18.293,
                "poster_path": "/5uNMGqWEBWvdoWzbffTvlsdyCti.jpg",
                "release_date": "2024-07-18",
                "title": "Problemista",
                "video": false,
                "vote_average": 6.6,
                "vote_count": 38
            },
            {
                "adult": false,
                "backdrop_path": "/f9jS1ASt9wSmNYxER0Dkzq3itAm.jpg",
                "genre_ids": [
                    18,
                    14
                ],
                "id": 831395,
                "original_language": "en",
                "original_title": "Tuesday",
                "overview": "",
                "popularity": 23.993,
                "poster_path": "/zrd6blans3SqghHSxPAl7tqnaOf.jpg",
                "release_date": "2024-07-11",
                "title": "Tuesday",
                "video": false,
                "vote_average": 6.7,
                "vote_count": 3
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    35,
                    10749
                ],
                "id": 1294931,
                "original_language": "es",
                "original_title": "Entra en mi vida",
                "overview": "Eugenia está harta de los desengaños amorosos y laborales que ha vivido, por lo cual decide darle un giro a su vida tratatando de convertirse en influencer.",
                "popularity": 4.016,
                "poster_path": "/rrOQ4qAw6hrYTnS6AcPBW81b8q2.jpg",
                "release_date": "2024-07-11",
                "title": "Entra en mi vida",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    16,
                    18
                ],
                "id": 1103569,
                "original_language": "es",
                "original_title": "Un Desvelo de Indocilidad",
                "overview": "",
                "popularity": 3.957,
                "poster_path": "/1CXexqRZJOqzmITGMOGMwuc9MRl.jpg",
                "release_date": "2024-07-06",
                "title": "Un Desvelo de Indocilidad",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": "/8hnzgv3YQzAGaaJhvCHNNhFB7qJ.jpg",
                "genre_ids": [
                    16
                ],
                "id": 717168,
                "original_language": "en",
                "original_title": "Scatter Brain",
                "overview": "",
                "popularity": 2.638,
                "poster_path": "/P26tbRA5N0ku9EVHkl26mSvLwT.jpg",
                "release_date": "2024-07-11",
                "title": "Scatter Brain",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            },
            {
                "adult": false,
                "backdrop_path": null,
                "genre_ids": [
                    28,
                    12,
                    878,
                    10751
                ],
                "id": 1199937,
                "original_language": "es",
                "original_title": "Xenobot",
                "overview": "",
                "popularity": 2.538,
                "poster_path": "/otPlq977eujwTfH2YIZEyrWfFsN.jpg",
                "release_date": "2024-07-18",
                "title": "Xenobot",
                "video": false,
                "vote_average": 0,
                "vote_count": 0
            }
        ],
        "total_pages": 1,
        "total_results": 11
    }

    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <MainSlider movies={currentTheatres.results} />
            <MovieSliderGeneral title="Mejor Valoradas" list_link="toprated">
                <>
                    {
                        ratingMovies.results.map((movie, index) => (
                            <MovieCard key={movie.id} movie={movie} top={index + 1} />
                        ))
                    }
                </>
            </MovieSliderGeneral>
            <div className="separator"></div>
            <MovieSliderGeneral title="Populares" list_link="popular">
                <>
                    {
                        popularMovies.results.map((movie, index) => (
                            <MovieCard key={movie.id} movie={movie} top={index + 1} />
                        ))
                    }
                </>
            </MovieSliderGeneral>
            <div className="separator"></div>
            <MovieSliderGeneral title="Próximamente" list_link="upcoming">
                <>
                    {
                        upcomingMovies.results.map((movie, index) => (
                            <MovieCardUpcoming key={movie.id} movie={movie} />
                        ))
                    }
                </>
            </MovieSliderGeneral>
        </section>
    )
}