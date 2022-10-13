import React from "react"
import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import GameSlide from './GameSlide'

export default () => {
  const [sliderRef] = useKeenSlider({
    loop: true,
    mode: "free",
    rtl: false,
    slides: { perView: "auto", spacing: 5 }
  })

  return (
    
    <div ref={sliderRef} className="keen-slider">
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide isNew='true' imageURL='https://images.igdb.com/igdb/image/upload/t_cover_big/co2lbv.png' name='Grand Theft Auto V' price='60'></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide isNew='true' imageURL='https://images.igdb.com/igdb/image/upload/t_cover_big/co1x7d.png' name='Portal' price='60'></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide isNew='true' imageURL='https://images.igdb.com/igdb/image/upload/t_cover_big/co1tnw.png' name='Skyrim' price='60'></GameSlide>
      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide isNew='true' imageURL='https://images.igdb.com/igdb/image/upload/t_cover_big/co1ycw.png' name='Fallout 3' price='60'></GameSlide>

      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
              <GameSlide isNew='true' imageURL='https://images.igdb.com/igdb/image/upload/t_cover_big/co1j6x.png' name='RimWorld' price='60'></GameSlide>

      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
        <GameSlide isNew='true' imageURL='https://images.igdb.com/igdb/image/upload/t_cover_big/co1tfy.png' name='Factorio' price='60'></GameSlide>

      </div>
      <div className="keen-slider__slide number-slide1"
            style={{ minWidth: 350 }}>
               <GameSlide isNew='true' imageURL='https://images.igdb.com/igdb/image/upload/t_cover_big/co1r75.png' name='Stellaris' price='60'></GameSlide>

      </div>
      
      
    </div>
  )
}
