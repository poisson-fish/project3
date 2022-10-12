import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import GameSlide from './GameSlide'

export default () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    rtl: false,
    slides: { perView: "auto" }
  })

  return (
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide></GameSlide>
      </div>
      
      
    </div>
  )
}
