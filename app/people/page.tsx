import { HeaderSection } from "../components/HeaderSection/HeaderSection"
import { Pagination } from "../components/Pagination/Pagination"
import { IPeopleResponse } from "../interfaces/responses"
import { GetPeoplePopular } from "../services/fetchData"
import { PopularIcon } from "../utils/svg"
import { PersonCard } from "./components/PersonCard/PersonCard"
import styles from "./people.module.scss"

export default async function Page({ searchParams }: { searchParams: Promise<{ page: number }> }) {
    const params = await searchParams
    const page = params.page || 1
    const popularPeople: IPeopleResponse = await GetPeoplePopular(page)

    return (
        <section className={`${styles.section} `}>
            <HeaderSection title="Top personas (Popularidad)" icon={<PopularIcon />} />
            <div className={`${styles.peopleBentoGrid}  `}>
                {
                    popularPeople.results.map((person, index) => {
                        const globalIndex = index + 1 + (page - 1) * 20;
                        // El #1 de la primera página (o el primero de cualquier página) toma el rol principal
                        const isFeatured = globalIndex === 1 || (page === 1 && index === 0);

                        return (
                            <PersonCard
                                key={person.id}
                                person={person}
                                rank={globalIndex}
                                isFeatured={isFeatured}
                                aspectRatio="1/2"
                            />
                        )
                    })
                }
            </div>
            <Pagination currentPage={popularPeople.page} totalPages={popularPeople.total_pages > 500 ? 500 : popularPeople.total_pages} />
        </section>
    )
}