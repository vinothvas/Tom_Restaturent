"use client";

import React, { useState } from "react";
import MenuItem from "@/components/layout/MenuItem";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types/MenuTypes";
import ProductDetailModal from "@/components/layout/ProductDetailModal";

const SpecialMenu = () => {
  const { foods } = useShop();
   const [modalShow, setModalShow] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  const popularFoods = foods
    .filter((food) => food.popular === true)
    .slice(0, 12);


  return (
    <section className="pb-80">
      <div className="container">
        <div className="app__specialMenu-title">
          <h1 className="headtext__cormorant">Special Menu</h1>
        </div>
        <div className="row">
          <div className="col-12 col-lg-8">
            {/* <h3 className="headtext__cormorant text-lg mb-3">{category}</h3> */}
            <div>
              <div className="row">
                {popularFoods.map((item, index) => (
                  <MenuItem
                    key={item._id || index}
                    title={item.name}
                    price={`${item.price}KR`}
                    description={item.description}
                    tags={item.category || "Food"}
                    image={item.image}
                    onClick={() => {
                      setSelectedItem(item);
                      setModalShow(true);
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="view_more_btn">
              <button className="btn primary-btn">View More</button>
            </div>
          </div>
          <div className="col-12 col-lg-4">
            <div className="manu_item_middle_img">
              <img src="/images/special-img.png" alt="menu__img" />
            </div>
          </div>
          {/* <div className="col-4">
            <div>
              {rightPopular.map((item, index) => (
                <MenuItem
                  key={item._id || index}
                  title={item.name}
                  price={`$${item.price}`}
                  tags={item.category || "Food"}
                  image={item.image}
                />
              ))}
            </div>
          </div> */}
        </div>
        {selectedItem && (
          <ProductDetailModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            item={selectedItem}
          />
        )}
      </div>
    </section>
  );
};

export default SpecialMenu;
