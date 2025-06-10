import Link from "next/link";

const Header = () => {
  return (
    <header className="">
      <div className="container">
        <div className="d-flex header-block">
          <div className="logo">
            <Link href="/">
                {/* <img src="/logo.png" alt="MyRestaurant" /> */}
                TOM
            </Link>
          </div>
          <nav className="menu-nav">
            <ul className="d-flex">
              <li>
                <Link href="/">Home</Link>
              </li>
              <li>
                <Link href="/menu">Menu</Link>
              </li>
              {/* <li>
                <Link href="/contact">Contact</Link>
              </li> */}
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
