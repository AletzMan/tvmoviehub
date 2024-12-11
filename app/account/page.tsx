


import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { AccountIcon, ArrowRightIcon, BookmarkIcon, FavoriteFullIcon, ListIcon, StarIcon } from "../utils/svg"
import { GetDetailsAccount, GetFavoriteMovies, GetFavoriteSeries, GetLists, GetRated, GetWatchList } from "../services/fetchData"
import { cookies } from "next/headers"
import Image from "next/image"
import { URL_IMAGE_NOTPHOTO } from "../utils/const"
import styles from "./styles.module.scss"
import Link from "next/link"



export default async function Page(params: { searchParams: { type: string, page: string } }) {
    const cookie = cookies().get("session_tvmoviehub")?.value
    const account = await GetDetailsAccount(cookie || "")
    const favoritesMovies = await GetFavoriteMovies(cookie || "", "1")
    const favoritesSeries = await GetFavoriteSeries(cookie || "", "1")
    const watchListMovies = await GetWatchList(cookie || "", "movies")
    const watchListSeries = await GetWatchList(cookie || "", "tv")
    const ratedMovies = await GetRated(cookie || "", params.searchParams, "movies")
    const ratedSeries = await GetRated(cookie || "", params.searchParams, "tv")
    const listMovies = await GetLists(cookie || "", { page: 1 })


    return (
        <section className={`${styles.section} scrollBarStyle`}>
            <HeaderSection title="Mi cuenta" icon={<AccountIcon />} />
            <div className={styles.account}>
                <picture className={styles.account_picture}>
                    <Image className={styles.account_photo} alt={`Foto de perfil de ${account?.username}`} overrideSrc={URL_IMAGE_NOTPHOTO} src={account?.avatar?.tmdb.avatar_path || URL_IMAGE_NOTPHOTO} width={115} height={165} />
                </picture>
                <div className={styles.account_info} >
                    <label className={styles.account_label}>ID:</label>
                    <span className={styles.account_id}>{account?.id}</span>
                    <label className={styles.account_label}>Nombre:</label>
                    <span className={styles.account_name}>{account?.name}</span>
                    <label className={styles.account_label}>Nombre de usuario:</label>
                    <span className={styles.account_username}>{account?.username}</span>
                </div>
            </div>
            <div className={styles.data}>
                <div className={styles.data_section}>
                    <div className={styles.data_item}>
                        <Link className={styles.data_link} href={"/favorites?type=movies&page=1"}>
                            <span className={styles.data_title}> <FavoriteFullIcon />Favoritos</span>
                            <ArrowRightIcon className={styles.data_icon} />

                        </Link>
                        <span className={styles.data_label} >Peliculas</span>
                        <span className={styles.data_count}>{favoritesMovies?.total_results}</span>
                    </div>
                    <div className={styles.data_item}>
                        <label className={styles.data_label}>Series de TV</label>
                        <span className={styles.data_count}>{favoritesSeries?.total_results}</span>
                    </div>
                </div>
                <div className={styles.data_section}>
                    <div className={styles.data_item}>
                        <Link className={styles.data_link} href={" /watchlist?type=movies&page=1"}>
                            <span className={styles.data_title}>
                                <BookmarkIcon />  Lista de seguimiento
                            </span>
                            <ArrowRightIcon className={styles.data_icon} />
                        </Link>
                        <label className={styles.data_label}>Peliculas</label>
                        <span className={styles.data_count}>{watchListMovies?.total_results}</span>
                    </div>
                    <div className={styles.data_item}>
                        <label className={styles.data_label}>Series de TV</label>
                        <span className={styles.data_count}>{watchListSeries?.total_results}</span>
                    </div>
                </div>
                <div className={styles.data_section}>
                    <div className={styles.data_item}>
                        <Link className={styles.data_link} href={" /rated?type=movies&page=1"}>
                            <span className={styles.data_title}>
                                <StarIcon />  Valoradas
                            </span>
                            <ArrowRightIcon className={styles.data_icon} />
                        </Link>
                        <label className={styles.data_label}>Peliculas</label>
                        <span className={styles.data_count}>{ratedMovies?.total_results}</span>
                    </div>
                    <div className={styles.data_item}>
                        <label className={styles.data_label}>Series de TV</label>
                        <span className={styles.data_count}>{ratedSeries?.total_results}</span>
                    </div>
                </div>
                <div className={styles.data_section}>
                    <div className={styles.data_item}>
                        <Link className={styles.data_link} href={" /lists?page=1"}>
                            <span className={styles.data_title}>
                                <ListIcon /> Mis Listas
                            </span>
                            <ArrowRightIcon className={styles.data_icon} />
                        </Link>
                        <label className={styles.data_label}>Total de listas</label>
                        <span className={styles.data_count}>{listMovies?.total_results}</span>
                    </div>
                </div>
            </div>
        </section>
    )
}