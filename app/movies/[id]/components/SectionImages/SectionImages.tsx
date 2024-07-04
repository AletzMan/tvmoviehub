"use client"
import { IBackdrop, IImages } from "@/app/interfaces/image"
import styles from "./section.module.scss"
import { Button } from "@/app/components/Button/Button"
import Image from "next/image"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { BASE_URL_IMG, BASE_URL_IMG_CUSTOM } from "@/app/utils/const"
import Slider from "react-slick"
import { useState } from "react"
import { CloseIcon, LoadingIcon } from "@/app/utils/svg"

interface IImageDialog { status: boolean, type: 'backdrops' | 'logos' | 'posters', size: { width: number, height: number } }
const ImagesEmpty: IImageDialog = { status: false, type: 'backdrops', size: { width: 240, height: 150 } }

interface Props {
    images: IImages
}

export function SectionImages({ images }: Props) {
    const [openDialog, setOpenDialog] = useState<IImageDialog>(ImagesEmpty)
    const [currentImages, setCurrentImages] = useState<IBackdrop>(images.backdrops[0])
    const [loadImage, setLoadImage] = useState(true)

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
            {images.backdrops.length > 0 && <Button onClick={() => HandleOpen("backdrops", true, { width: 240, height: 135 })} text="Ver Wallpapers" mode="button" />}
            {images.posters.length > 0 && <Button onClick={() => HandleOpen("posters", true, { width: 130, height: 190 })} text="Ver Posters" mode="button" />}
            {images.logos.length > 0 && <Button onClick={() => HandleOpen("logos", true, { width: 240, height: 150 })} text="Ver Logos" mode="button" />}
            {openDialog.status &&
                <dialog className={`${styles.dialog} scrollBarStyle`} open>
                    <Button className={styles.dialog_close} mode="button" text="" icon={<CloseIcon />} onClick={() => HandleOpen("backdrops", false, { width: 220, height: 150 })} />
                    <div className={styles.dialog_options}>
                        <picture className={styles.dialog_picture}>
                            {loadImage && <LoadingIcon className={styles.dialog_loading} />}
                            <Image className={styles.dialog_image} onLoad={HandleOnLoadImage} key={currentImages.file_path} src={BASE_URL_IMG.concat(currentImages.file_path)} alt="image" width={currentImages.width} height={currentImages.height} />
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
