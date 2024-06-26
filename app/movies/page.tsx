import { MainSlider } from "../components/MainSlider/MainSlider"
import { MovieCard } from "../components/MovieCard/MovieCard"
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


    return (
        <section className={styles.section}>
            <MainSlider movies={currentTheatres.results} />
            <MovieSliderGeneral title="Top">
                <>
                    {
                        popularMovies.results.map(movie => (
                            <MovieCard key={movie.id} movie={movie} />
                        ))
                    }
                </>
            </MovieSliderGeneral>
        </section>
    )
}