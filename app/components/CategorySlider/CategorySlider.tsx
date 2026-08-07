import styles from "./category.module.scss"
import { MovieSliderGeneral } from "../MovieSlider/MovieSliderGeneral"
import Link from "next/link"
import { 
    ActionIcon, AdventureIcon, AnimationIcon, ComedyIcon, CrimeIcon, 
    DocumentaryIcon, DramaIcon, FamilyIcon, FantasyIcon, HistoryIcon, 
    HorrorIcon, MusicIcon, MysteryIcon, RomanceIcon, SCIFiIcon, 
    TVMovieIcon, ThrillerIcon, WarIcon, WesternIcon, 
    AdventureIcon as AdventureSeriesIcon, AnimationIcon as AnimationSeriesIcon, 
    ComedyIcon as ComedySeriesIcon, CrimeIcon as CrimeSeriesIcon, 
    DocumentaryIcon as DocumentarySeriesIcon, DramaIcon as DramaSeriesIcon, 
    FamilyIcon as FamilySeriesIcon, KidIcon, MysteryIcon as MysterySeriesIcon, 
    NewsIcon, RealityIcon, SCIFiIcon as SCIFiSeriesIcon, SoapIcon, 
    TalkIcon, WarIcon as WarSeriesIcon, WesternIcon as WesternSeriesIcon 
} from "@/app/utils/svg"

interface Props {
    type: 'serie' | 'movie'
}

const categoriesMovies = [
    { id: 28, name: "Acción", link: "action", icon: <ActionIcon className="logo_category" /> },
    { id: 12, name: "Aventura", link: "adventure", icon: <AdventureIcon className="logo_category" /> },
    { id: 16, name: "Animación", link: "animation", icon: <AnimationIcon className="logo_category" /> },
    { id: 35, name: "Comedia", link: "comedy", icon: <ComedyIcon className="logo_category" /> },
    { id: 80, name: "Crimen", link: "crime", icon: <CrimeIcon className="logo_category" /> },
    { id: 99, name: "Documental", link: "documentary", icon: <DocumentaryIcon className="logo_category" /> },
    { id: 18, name: "Drama", link: "drama", icon: <DramaIcon className="logo_category" /> },
    { id: 10751, name: "Familia", link: "family", icon: <FamilyIcon className="logo_category" /> },
    { id: 14, name: "Fantasía", link: "fantasy", icon: <FantasyIcon className="logo_category" /> },
    { id: 36, name: "Historia", link: "history", icon: <HistoryIcon className="logo_category" /> },
    { id: 27, name: "Terror", link: "horror", icon: <HorrorIcon className="logo_category" /> },
    { id: 10402, name: "Música", link: "music", icon: <MusicIcon className="logo_category" /> },
    { id: 9648, name: "Misterio", link: "mystery", icon: <MysteryIcon className="logo_category" /> },
    { id: 10749, name: "Romance", link: "romance", icon: <RomanceIcon className="logo_category" /> },
    { id: 878, name: "Ciencia ficción", link: "science_fiction", icon: <SCIFiIcon className="logo_category" /> },
    { id: 10770, name: "Película de TV", link: "tv_movie", icon: <TVMovieIcon className="logo_category" /> },
    { id: 53, name: "Suspenso", link: "thriller", icon: <ThrillerIcon className="logo_category" /> },
    { id: 10752, name: "Bélica", link: "war", icon: <WarIcon className="logo_category" /> },
    { id: 37, name: "Western", link: "western", icon: <WesternIcon className="logo_category" /> }
]

const categoriesSeries = [
    { id: 10759, name: "Acción & Aventura", link: "action", icon: <AdventureSeriesIcon className="logo_category" /> },
    { id: 16, name: "Animación", link: "action", icon: <AnimationSeriesIcon className="logo_category" /> },
    { id: 35, name: "Comedia", link: "action", icon: <ComedySeriesIcon className="logo_category" /> },
    { id: 80, name: "Crimen", link: "action", icon: <CrimeSeriesIcon className="logo_category" /> },
    { id: 99, name: "Documental", link: "action", icon: <DocumentarySeriesIcon className="logo_category" /> },
    { id: 18, name: "Drama", link: "action", icon: <DramaSeriesIcon className="logo_category" /> },
    { id: 10751, name: "Familia", link: "action", icon: <FamilySeriesIcon className="logo_category" /> },
    { id: 10762, name: "Kids", link: "action", icon: <KidIcon className="logo_category" /> },
    { id: 9648, name: "Misterio", link: "action", icon: <MysterySeriesIcon className="logo_category" /> },
    { id: 10763, name: "Noticias", link: "news", icon: <NewsIcon className="logo_category" /> },
    { id: 10764, name: "Reality", link: "reality", icon: <RealityIcon className="logo_category" /> },
    { id: 10765, name: "Ciencia ficción", link: "science_fiction", icon: <SCIFiSeriesIcon className="logo_category" /> },
    { id: 10766, name: "Telenovelas", link: "soap", icon: <SoapIcon className="logo_category" /> },
    { id: 10767, name: "Talk", link: "action", icon: <TalkIcon className="logo_category" /> },
    { id: 10768, name: "Bélica", link: "war", icon: <WarSeriesIcon className="logo_category" /> },
    { id: 37, name: "Western", link: "weatern", icon: <WesternSeriesIcon className="logo_category" /> }
]

export const CategorySlider = ({ type }: Props) => {
    const categories = type === "movie" ? categoriesMovies : categoriesSeries
    const basePath = type === "movie" ? "movies" : "series"

    return (
        <MovieSliderGeneral title="Categorías"  >
            {categories.map(category => (
                <div className={styles.category} key={category.id}>
                    <Link className={styles.category_link} href={`${basePath}/results/list?with_genres=${category.id}`}>
                        {category.icon}
                        <span className={styles.category_name}>{category.name}</span>
                    </Link>
                </div>
            ))}
        </MovieSliderGeneral>
    )
}