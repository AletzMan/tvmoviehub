"use client"

import { IPeopleImages, IProfile } from "@/app/interfaces/people"
import styles from "./sliderphotos.module.scss"
import Image from "next/image"
import { BASE_URL_IMG } from "@/app/utils/const"
import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"
import { useEffect, useState } from "react"
import { GetPeopleImages } from "@/app/services/fetchData"

interface Props {
    id_people: string
    name_people: string
}

/*
const images: IPeopleImages = {
    "id": 974169,
    "profiles": [
        {
            "aspect_ratio": 0.667,
            "height": 3000,
            "iso_639_1": null,
            "file_path": "/q1NRzyZQlYkxLY07GO9NVPkQnu8.jpg",
            "vote_average": 5.384,
            "vote_count": 51,
            "width": 2000
        },
        {
            "aspect_ratio": 0.667,
            "height": 3000,
            "iso_639_1": null,
            "file_path": "/mNLx63JbIAHyfb3YNeVvGP9jfcv.jpg",
            "vote_average": 5.318,
            "vote_count": 3,
            "width": 2000
        },
        {
            "aspect_ratio": 0.667,
            "height": 1200,
            "iso_639_1": null,
            "file_path": "/7oUAtVgZU0uLdUSvDHKkINt1y7Y.jpg",
            "vote_average": 5.3,
            "vote_count": 22,
            "width": 800
        },
        {
            "aspect_ratio": 0.667,
            "height": 1800,
            "iso_639_1": null,
            "file_path": "/3HHXUaLatEeeR3TSgnpgEKmpR8M.jpg",
            "vote_average": 5.292,
            "vote_count": 18,
            "width": 1200
        },
        {
            "aspect_ratio": 0.667,
            "height": 1500,
            "iso_639_1": null,
            "file_path": "/yzzc3K7Wu3XvaAClZUxD9b8mYhe.jpg",
            "vote_average": 5.238,
            "vote_count": 19,
            "width": 1000
        },
        {
            "aspect_ratio": 0.667,
            "height": 2850,
            "iso_639_1": null,
            "file_path": "/aw0q3h9GDoUF69oLXg1m7Dk5Adz.jpg",
            "vote_average": 5.226,
            "vote_count": 15,
            "width": 1900
        },
        {
            "aspect_ratio": 0.667,
            "height": 2998,
            "iso_639_1": null,
            "file_path": "/aiHl0TPpFtzqNEx1XiMmTUqytZR.jpg",
            "vote_average": 5.19,
            "vote_count": 5,
            "width": 2000
        },
        {
            "aspect_ratio": 0.667,
            "height": 711,
            "iso_639_1": null,
            "file_path": "/sWkjh9JOK7sJl2tcDq3AB6MEEWI.jpg",
            "vote_average": 5.18,
            "vote_count": 3,
            "width": 474
        },
        {
            "aspect_ratio": 0.667,
            "height": 1500,
            "iso_639_1": null,
            "file_path": "/z3gl3Y16xJbsSSV5RaxGvkmbZxO.jpg",
            "vote_average": 5.164,
            "vote_count": 14,
            "width": 1000
        },
        {
            "aspect_ratio": 0.667,
            "height": 900,
            "iso_639_1": null,
            "file_path": "/9OZWkBYVIshLPGFcplxkxVqlomi.jpg",
            "vote_average": 5.144,
            "vote_count": 23,
            "width": 600
        },
        {
            "aspect_ratio": 0.667,
            "height": 1368,
            "iso_639_1": null,
            "file_path": "/dzxowBGR95uu10R6HYjGcjKfa6n.jpg",
            "vote_average": 5.128,
            "vote_count": 6,
            "width": 912
        },
        {
            "aspect_ratio": 0.666,
            "height": 2980,
            "iso_639_1": null,
            "file_path": "/of00gYVTTYXX1TjzoaZgTucBLqi.jpg",
            "vote_average": 5.118,
            "vote_count": 4,
            "width": 1986
        },
        {
            "aspect_ratio": 0.667,
            "height": 658,
            "iso_639_1": null,
            "file_path": "/y9XnHnf8b3jpOJFcfjkSRdiOJaB.jpg",
            "vote_average": 5.086,
            "vote_count": 22,
            "width": 439
        },
        {
            "aspect_ratio": 0.667,
            "height": 3000,
            "iso_639_1": null,
            "file_path": "/eh1oO4SWUUdD5DG75q2t3lHfrD.jpg",
            "vote_average": 5.068,
            "vote_count": 18,
            "width": 2000
        },
        {
            "aspect_ratio": 0.667,
            "height": 1270,
            "iso_639_1": null,
            "file_path": "/y24GIGVUydumoXidZVSgzWSclWZ.jpg",
            "vote_average": 5.028,
            "vote_count": 21,
            "width": 847
        },
        {
            "aspect_ratio": 0.667,
            "height": 2296,
            "iso_639_1": null,
            "file_path": "/6OF4FOw7TiwZHDM2wRrAuw0FI4.jpg",
            "vote_average": 4.968,
            "vote_count": 20,
            "width": 1531
        },
        {
            "aspect_ratio": 0.667,
            "height": 2100,
            "iso_639_1": null,
            "file_path": "/nK4GwlX3iEQsp4ZBkKSqbpzmYcB.jpg",
            "vote_average": 4.958,
            "vote_count": 27,
            "width": 1400
        },
        {
            "aspect_ratio": 0.666,
            "height": 1051,
            "iso_639_1": null,
            "file_path": "/aQZ68fE7gkofkC99zHrqsZSqski.jpg",
            "vote_average": 4.956,
            "vote_count": 18,
            "width": 700
        },
        {
            "aspect_ratio": 0.667,
            "height": 1200,
            "iso_639_1": null,
            "file_path": "/2d6vI57OWvkNL46nuZyXPZxNu7s.jpg",
            "vote_average": 4.928,
            "vote_count": 14,
            "width": 800
        },
        {
            "aspect_ratio": 0.667,
            "height": 855,
            "iso_639_1": null,
            "file_path": "/5SyoAw1stfLqduKosjn7fIqfWW6.jpg",
            "vote_average": 4.862,
            "vote_count": 13,
            "width": 570
        },
        {
            "aspect_ratio": 0.666,
            "height": 1897,
            "iso_639_1": null,
            "file_path": "/l6oLyi7ionFKiUSqeGz9iUYDEyo.jpg",
            "vote_average": 4.812,
            "vote_count": 14,
            "width": 1264
        },
        {
            "aspect_ratio": 0.666,
            "height": 1600,
            "iso_639_1": null,
            "file_path": "/5z5cllrNv8LV09iiozBf344jG23.jpg",
            "vote_average": 4.762,
            "vote_count": 15,
            "width": 1066
        },
        {
            "aspect_ratio": 0.667,
            "height": 1371,
            "iso_639_1": null,
            "file_path": "/abOb8SNSekqVdCEse4oavwntPo7.jpg",
            "vote_average": 4.756,
            "vote_count": 8,
            "width": 914
        },
        {
            "aspect_ratio": 0.667,
            "height": 1718,
            "iso_639_1": null,
            "file_path": "/5hN9mdZ7iKbw7RWQccryD69su15.jpg",
            "vote_average": 4.702,
            "vote_count": 9,
            "width": 1146
        },
        {
            "aspect_ratio": 0.667,
            "height": 1687,
            "iso_639_1": null,
            "file_path": "/knwgGxtxfPKVOPWiqSU9E0cXSyS.jpg",
            "vote_average": 4.702,
            "vote_count": 9,
            "width": 1125
        },
        {
            "aspect_ratio": 0.667,
            "height": 711,
            "iso_639_1": null,
            "file_path": "/tsN0K25kF8kzxN6SNNvmMAhwne6.jpg",
            "vote_average": 4.552,
            "vote_count": 12,
            "width": 474
        },
        {
            "aspect_ratio": 0.667,
            "height": 810,
            "iso_639_1": null,
            "file_path": "/tYTuhxvhStnIXBP4hdyCIflQpUp.jpg",
            "vote_average": 0,
            "vote_count": 0,
            "width": 540
        }
    ]
}
*/

export const SliderPhotos = ({ id_people, name_people }: Props) => {
    const [openDialog, setOpenDialog] = useState(false)
    const [selectPhoto, setSelectPhoto] = useState<IProfile>()
    const [images, setImages] = useState<IPeopleImages>()
    const settings = {
        infinite: true,
        speed: 1000,
        slidesToScroll: 3,
        slidesToShow: 3,
        autoplay: true,
        autoplaySpeed: 500,
        arrows: false,
        dots: false,
        rows: 1,
        className: "center",
        centerPadding: "60px",
        centerMode: true
    }

    useEffect(() => {
        const GetImages = async () => {
            const response: IPeopleImages = await GetPeopleImages(id_people)
            setImages(response)
        }
        GetImages()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const HandleViewLargePhoto = (profile?: IProfile) => {
        if (profile) {
            setSelectPhoto(profile)

        }
        setOpenDialog(prev => !prev)
    }

    const imageLoader = () => {
        return `https://raw.githubusercontent.com/AletzMan/ImagesStorage/main/streamin-movie-clone/Image_not_available.jpg`
    }

    return (
        <>
            {images &&
                <div className={styles.photos}>
                    <Slider {...settings} variableWidth>
                        {images.profiles.map(profile => (
                            <div key={profile.file_path} className={styles.photoContainer}>
                                <button className={styles.photo_button} onClick={() => HandleViewLargePhoto(profile)}>
                                    <Image
                                        className={styles.photo}
                                        src={`${BASE_URL_IMG}${profile.file_path}`}
                                        alt={`Foto de ${name_people}`}
                                        width={120}
                                        height={175}
                                    />
                                </button>
                            </div>
                        ))}
                    </Slider>
                </div>
            }
            {openDialog &&
                <dialog open className={styles.dialog} onClick={() => HandleViewLargePhoto()}>
                    {selectPhoto?.file_path ?
                        <Image
                            className={styles.photo_large}
                            src={`${BASE_URL_IMG}${selectPhoto.file_path}`}
                            alt={`Foto de ${name_people}`}
                            width={selectPhoto.width}
                            height={selectPhoto.height}
                            layout="responsive"
                        />
                        :
                        <span>LOADING</span>
                    }
                </dialog>
            }
        </>
    )
}
