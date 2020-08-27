import React from 'react';
import Carousel from 'react-bootstrap/Carousel';

const Slider = () => {

        return(
            <Carousel>

                <Carousel.Item>

                    <img
                        className="d-block w-100"
                  //      src="" 
                   //     alt="First Slide"
                    />

                </Carousel.Item>

                <Carousel.Item>

                    <img
                        className="d-block w-100"
                    //    src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-b32320e1-8a1b-4cfa-acf1-f7b7cc60af48.jpg"
                    //    alt="First Slide"
                    />

                </Carousel.Item>

                <Carousel.Item>

                    <img
                        className="d-block w-100"
                    //    src="https://http2.mlstatic.com/optimize/o:f_webp/resources/deals/exhibitors_resources/mla-home-desktop-slider-picture-fd8095b4-12ef-4eff-8421-de4f101cca39.jpg"
                     //   alt="First Slide"
                    />

                </Carousel.Item>
                
            </Carousel>
        )

}

export default Slider;