import React from "react";

const Banner = () => {
  const sliderImgs = [
    { id: 1, img: "/images/chicken.jpg", name: "Chicken 65" },
    { id: 2, img: "/images/dosa.jpg", name: "Masala Dosa" },
    { id: 3, img: "/images/vadai1.jpg", name: "Medhu Vadai" },
    { id: 4, img: "/images/tea1.jpg", name: "Masala Tea" },
    { id: 5, img: "/images/omelet.jpg", name: "Omelet" },
  ];
  return (
    <section className="banner-section">
      <div className="container">
        <div className="row">
          <div className="col-lg-5">
            <div className="banner-left-content">
              <span>it's not just food, it's an experience</span>
              <h4 className="">
                Order Tasty & Fresh Food <span>anytime!</span>
              </h4>
              <div className="left-banner-button">
                <button className="btn primary-btn">See Menu</button>
              </div>
            </div>
          </div>
          <div className="col-lg-7">
            <div className="banner-right-img">
              <div className="banner-slider">
                {sliderImgs.map((sliderImg, index) => (
                  <div
                    className="banner-item"
                    key={index}
                    style={{ "--position": index + 1 } as React.CSSProperties}
                  >
                    <img
                      src={sliderImg.img}
                      alt="Banner Image"
                      className="img-fluid"
                    />
                      <h4>{sliderImg.name}</h4>
                  </div>
                ))}
              </div>
              <div className="banner-big-img">
                <img
                  src="/images/test3.webp"
                  alt="Next.js Logo"
                  className="img-fluid"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Banner;
