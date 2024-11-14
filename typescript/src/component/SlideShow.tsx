import Slider from "react-slick";
type Images = {
  images: string[];
};

const SlideShow = ({ images }: Images) => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1000,
    cssEase: "ease-in-out",
  };
  return (
    <div>
      <Slider {...settings}>
        {images.map((image, index) => (
          <div key={index}>
            <img
              src={image}
              alt={`slide-${index}`}
              style={{ height: "800px", width: "100%" }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default SlideShow;
