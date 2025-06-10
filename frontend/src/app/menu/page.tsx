"use client";
import MenuItem from "@/components/layout/MenuItem";
import ProductDetailModal from "@/components/layout/ProductDetailModal";
import { useShop } from "@/context/ShopContext";
import { Product } from "@/types/MenuTypes";
import { useState } from "react";

export default function MenuPage() {
  const { foods } = useShop();
  const [searchTerm, setSearchTerm] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [selectedItem, setSelectedItem] = useState<Product | null>(null);

  // Updated filter: match name OR category
  const filteredList = foods.filter((item) => {
    const search = searchTerm.toLowerCase();
    return (
      item.name.toLowerCase().includes(search) ||
      (item.category && item.category.toLowerCase().includes(search))
    );
  });

  // Group products by category
  const groupedFoods = filteredList.reduce((acc, product) => {
    const cat = product.category || "Others";
    if (!acc[cat]) acc[cat] = [];
    acc[cat].push(product);
    return acc;
  }, {} as Record<string, typeof foods>);

  console.log(groupedFoods);

  return (
    <main>
      <section className="menu-bg"></section>
      <div className="container">
        <div className="menu-main-header">
          <h4>Delicious Food Menu</h4>
        </div>
        {/* <div className="menu-search-bar">
      <input
        type="text"
        placeholder="Search food by name or category.."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-6 w-full p-2 rounded border border-gray-300"
      />
      </div> */}

        {Object.entries(groupedFoods).length === 0 && (
          <p className="text-gray-500 mt-4">No food items available.</p>
        )}
        {Object.entries(groupedFoods).map(([category, products]) => (
          <section className="menu-list-section" key={category}>
            <div className="menu-category-title">
              <h2>{category}</h2>
            </div>
            <div className="row align-items-center">
              <div className="col-12 col-md-12 col-lg-9 order-even">
                <div>
                  <div className="row">
                    {products.map((item, index) => {
                      return (
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

                      );
                    })}
                  </div>
                </div>
              </div>
              <div className="col-12 col-md-12 col-lg-3">
                <div className="manu_item_middle_img">
                  {category === "Main Course" ? (
                    <img src="/images/cat-img2.png" alt="menu__img" />
                  ) : category === "Drinks" ? (
                    <img src="/images/cat-img3.png" alt="menu__img" />
                  ) : category === "Combo" ? (
                    <img src="/images/cat-img4.png" alt="menu__img" />
                  ) : category === "Appetizer" ? (
                    <img src="/images/cat-img5.png" alt="menu__img" />
                  ) : (
                    <img src="/images/main-course.png" alt="menu__img" />
                  )}
                </div>
              </div>
            </div>
          </section>
        ))}
         {selectedItem && (
          <ProductDetailModal
            show={modalShow}
            onHide={() => setModalShow(false)}
            item={selectedItem}
          />
        )}
      </div>
    </main>
  );
}
