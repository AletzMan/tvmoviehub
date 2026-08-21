import Image from "next/image"
import styles from "./providers.module.scss"
import { BASE_URL_MEDIA } from "@/app/utils/const"
import { IWatchProvidersRegion } from "@/app/interfaces/provider"

interface Props {
    providers: IWatchProvidersRegion | null
}

export const WatchProviders = ({ providers }: Props) => {
    if (!providers) return null

    const streaming = providers.flatrate ?? []
    const rent = providers.rent ?? []
    const buy = providers.buy ?? []

    const hasStreaming = streaming.length > 0
    const hasRentOrBuy = rent.length > 0 || buy.length > 0

    if (!hasStreaming && !hasRentOrBuy) {
        return null
    }

    return (
        <section className={styles.watch}>
            <header className={styles.watch_header}>
                <h3 className={styles.watch_title}>
                    Dónde ver
                </h3>
            </header>

            {hasStreaming && (
                <div className={styles.watch_section}>
                    <span className={styles.watch_label}>
                        Streaming
                    </span>

                    <div className={styles.watch_providers}>
                        {streaming.map(provider => (
                            <a
                                key={provider.provider_id}
                                href={providers.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className={styles.watch_provider}
                                title={provider.provider_name}
                            >
                                <Image
                                    src={`${BASE_URL_MEDIA}${provider.logo_path}`}
                                    width={56}
                                    height={56}
                                    alt={provider.provider_name}
                                    className={styles.watch_logo}
                                />

                                <span>
                                    {provider.provider_name}
                                </span>
                            </a>
                        ))}
                    </div>
                </div>
            )}

        </section>
    )
}