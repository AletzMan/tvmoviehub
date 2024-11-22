/* eslint-disable react-hooks/exhaustive-deps */
"use client"
import { IBackdrop, IImages } from "@/app/interfaces/image"
import styles from "./section.module.scss"
import { Button } from "@/app/components/Button/Button"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import Slider from "react-slick"
import { useEffect, useState } from "react"
import { CloseIcon, FacebookIcon, InstagramIcon, LoadingIcon, XIcon } from "@/app/utils/svg"
import Link from "next/link"
import { IExternalIDs } from "@/app/interfaces/movie"
import { GetExternalIDs } from "@/app/services/fetchData"

interface IImageDialog { status: boolean, type: 'backdrops' | 'logos' | 'posters', size: { width: number, height: number } }
const ImagesEmpty: IImageDialog = { status: false, type: 'backdrops', size: { width: 240, height: 150 } }

interface Props {
    id: number
    images: IImages
}

export function SectionImages({ images, id }: Props) {
    const [openDialog, setOpenDialog] = useState<IImageDialog>(ImagesEmpty)
    const [currentImages, setCurrentImages] = useState<IBackdrop>(images.backdrops[0])
    const [loadImage, setLoadImage] = useState(true)
    const [externalIDs, setExternalIDs] = useState<IExternalIDs>()

    useEffect(() => {
        const GetExternalInfo = async () => {
            const response = await GetExternalIDs(id)
            if (response)
                setExternalIDs(response)
        }
        GetExternalInfo()
    }, [])

    const HandleSetImage = (image: IBackdrop) => {
        if (currentImages.file_path !== image.file_path) {
            setCurrentImages(image)
            setLoadImage(true)
        }
    }

    const HandleOnLoadImage = () => {
        setLoadImage(false)
    }

    const HandleOpen = (type: 'backdrops' | 'logos' | 'posters', status: boolean, size: { width: number, height: number }) => {
        const newOptions: IImageDialog = { type, status, size }
        setCurrentImages(images[type][0])
        setOpenDialog(newOptions)
    }

    return (
        <article className={styles.section}>
            <div className={styles.images}>
                {images.backdrops.length > 0 && <Button className={styles.button_large} onClick={() => HandleOpen("backdrops", true, { width: 240, height: 135 })} text="Wallpapers" mode="button" />}
                {images.posters.length > 0 && <Button className={styles.button_large} onClick={() => HandleOpen("posters", true, { width: 130, height: 190 })} text="Posters" mode="button" />}
                {images.logos.length > 0 && <Button className={styles.button_large} onClick={() => HandleOpen("logos", true, { width: 240, height: 150 })} text="Logos" mode="button" />}
            </div>
            <div className={styles.social}>
                {externalIDs?.instagram_id &&
                    <Link href={`https://www.instagram.com/${externalIDs.instagram_id}`} className={styles.social_link} target="_blank">
                        <InstagramIcon className={styles.social_icon} />
                        <span className={styles.social_name}>Instagram</span>
                    </Link>
                }
                {externalIDs?.twitter_id &&
                    <Link href={`https://www.x.com/${externalIDs.twitter_id}`} className={styles.social_link} target="_blank">
                        <XIcon className={styles.social_icon} />
                        <span className={styles.social_name}>X</span>
                    </Link>
                }
                {externalIDs?.facebook_id &&
                    <Link href={`https://www.facebook.com/${externalIDs.facebook_id}`} className={styles.social_link} target="_blank">
                        <FacebookIcon className={styles.social_icon} />
                        <span className={styles.social_name}>Facebook</span>
                    </Link>
                }
            </div>
            {openDialog.status &&
                <dialog className={`${styles.dialog} scrollBarStyle`} open>
                    <Button className={styles.dialog_close} mode="button" text="" icon={<CloseIcon />} onClick={() => HandleOpen("backdrops", false, { width: 220, height: 150 })} />
                    <div className={styles.dialog_options}>
                        <picture className={styles.dialog_picture}>
                            {loadImage && <LoadingIcon className={styles.dialog_loading} />}
                            <Image className={styles.dialog_image} onLoad={HandleOnLoadImage} key={currentImages.file_path} src={BASE_URL_IMG_CUSTOM.concat(URL_SIZE_IMAGE_LARGE[openDialog.type].concat(currentImages.file_path))} alt="image" width={800} height={currentImages.height} />
                        </picture>
                        <span className={styles.dialog_sizes}>{`${currentImages.width}x${currentImages.height}`}</span>
                        <div>
                            <Button mode="link" href={BASE_URL_IMG.concat(currentImages.file_path)} text={`Descargar`} />
                        </div>
                    </div>
                    <Slider {...settings} variableWidth rows={1} swipeToSlide swipe >
                        {images[openDialog.type].map(backdrop => (
                            <button className={styles.button} key={backdrop.file_path} onClick={() => HandleSetImage(backdrop)} >
                                <Image className={styles.button_image} src={BASE_URL_IMG_CUSTOM.concat(URL_SIZE_IMAGE[openDialog.type].concat(backdrop.file_path as string))} alt="image" width={openDialog.size.width} height={openDialog.size.height} />
                            </button>
                        ))}
                    </Slider>
                </dialog>
            }
        </article>
    )
}

const URL_SIZE_IMAGE = {
    backdrops: "w300",
    posters: "w154",
    logos: "w342"
}

const URL_SIZE_IMAGE_LARGE = {
    backdrops: "w780",
    posters: "w500",
    logos: "w500"
}

const settings = {
    infinite: false,
    speed: 700,
    slidesToScroll: 1,
    autoplay: false,
    autoplaySpeed: 500,
    arrows: true,
    dots: false,
    rows: 1
}
