import React from "react";

interface MenuItemProps {
  title?: string;
  price?: any;
  tags?: any;
  image?: any;
  description?: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({
  title,
  price,
  tags,
  image,
  description,
  onClick,
}) => {
  return (
    <>
      <div className="col-12 col-md-6" role="button" onClick={onClick}>
        <div className="app__menuitem_block">
          <div className="app__menuitem_image_block">
            <div className="">
              <img src={image || "/images/no-img.png"} className="menu-image" />
            </div>
            <div className="app__menuitem-name">
              <p className="p__cormorant" style={{ color: "#DCCA87" }}>
                {title}
              </p>
              {/* <div className="app__menuitem-sub"> */}
              <p className="p__opensans" style={{ color: "#AAAAAA" }}>
                {tags}
              </p>
            </div>
          </div>
          <div className="menuitem_price_block">
            <p className="p__cormorant">{price}</p>
          </div>
        </div>
      </div>
    </>
  );
};

export default MenuItem;
