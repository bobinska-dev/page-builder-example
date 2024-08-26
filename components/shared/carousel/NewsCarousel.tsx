'use client'
import { NewsPayload } from '@/types'
import { ComponentType } from 'react'
import Carousel from 'react-multi-carousel'
import 'react-multi-carousel/lib/styles.css'
import NewsCard from '../NewsCard'

const responsiveSettings = {
  desktop: {
    breakpoint: { max: 3000, min: 1920 },
    items: 4,
    slidesToSlide: 2, // optional, default to 1.
    partialVisibilityGutter: 80, // this is needed to tell the amount of px that should be visible.
  },
  laptop: {
    breakpoint: { max: 1920, min: 1024 },
    items: 3,
    slidesToSlide: 2, // optional, default to 1.
    partialVisibilityGutter: 70, // this is needed to tell the amount of px that should be visible.
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 40, // this is needed to tell the amount of px that should be visible.
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1, // optional, default to 1.
    partialVisibilityGutter: 20, // this is needed to tell the amount of px that should be visible.
  },
}

const NewsCarousel: ComponentType<{ list: NewsPayload[] }> = (props) => {
  const { list } = props
  console.log(list)
  return (
    <>
      <Carousel
        showDots={true}
        swipeable={true}
        draggable={true}
        responsive={responsiveSettings}
        partialVisible={true}
        ssr={false} // means to render carousel on server-side.
        infinite={false}
        centerMode={false}
        keyBoardControl={true}
        renderButtonGroupOutside={true}
        dotListClass="carousel-dots"
        containerClass="py-9 px-0 mb-8 max-h-[80vh] md:max-h-[70vh] w-[80vw] lg:w-full"
        sliderClass="self-stretch justify-between"
        itemClass="h-full w-full px-2 md:px-4"
        removeArrowOnDeviceType={['mobile']}
      >
        {list &&
          list?.map((newsItem, index) => (
            <NewsCard key={newsItem._id} {...newsItem} />
          ))}
      </Carousel>
    </>
  )
}
export default NewsCarousel
