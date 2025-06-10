import React from "react";

const About = () => {
  return (
    <section className="about-section ptb-80">
      <div className="container">
        <div className="row">
          <div className="col-lg-6">
            <div className="gas ar">
              <img src="/images/about.png" alt="About" className="img-fluid" />
            </div>
          </div>
          <div className="col-lg-6">
            <div className="about-right-content">
              <span>
                {" "}
                <img src="images/chef1.png" /> About Us
              </span>
              <h2> About of TOM</h2>
              <p>
                The South Indian is your destination for South Indian Chettinad
                cuisine in the Nordics. After many hearts won in Stockholm,
                Malmo and Helsingborg we have made our presence known with our
                flagship restaurant in Göteborg in the centre of the city!! The
                first Scandinavian restaurant specializing in Chettinad cuisine
                from the South of India. We are the only destination for South
                Indian food in Gothenburg Central. Come and enjoy the warm
                ambience with our tasty dishes, unique drinks and our
                hospitality.
              </p>
              <p>
                We provide a number variety of dishes for vegan, meat and fish
                lovers. We have the largest food delivery radius in all of
                Gothenburg. We are present on all popular delivery platforms so
                find us now online or simply give us a call.
              </p>
              {/* <div className="mt-4">
                <button className="btn primary-btn">Know More</button>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
