import { AccountIcon, FavoriteEmptyIcon, HomeIcon, LogoutIcon, MovieIcon, MovieListIcon, SerieIcon, SettingsIcon } from "./svg"

export const MainMenu = [
    {
        id: 0,
        name: "Inicio",
        link: "/",
        icon: <HomeIcon className="mainMenuLogo" />
    },
    {
        id: 1,
        name: "Peliculas",
        link: "/",
        icon: <MovieIcon className="mainMenuLogo" />
    },
    {
        id: 2,
        name: "Series",
        link: "/",
        icon: <SerieIcon className="mainMenuLogo" />
    },
    {
        id: 3,
        name: "Favoritos",
        link: "/",
        icon: <FavoriteEmptyIcon className="mainMenuLogo" />
    },
    {
        id: 4,
        name: "Listas",
        link: "/",
        icon: <MovieListIcon className="mainMenuLogo" />
    },
    {
        id: 5,
        name: "Cuenta",
        link: "/",
        icon: <AccountIcon className="mainMenuLogo" />
    },
    {
        id: 6,
        name: "Configuración",
        link: "/",
        icon: <SettingsIcon className="mainMenuLogo" />
    },
    {
        id: 7,
        name: "Cerrar sesión",
        link: "/",
        icon: <LogoutIcon className="mainMenuLogo" />
    }
]