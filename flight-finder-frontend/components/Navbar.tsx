import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Link from "next/link";
// import { useStateValue } from "../StateProvider";

function Navbar() {
  // const [{ cart }, dispatch] = useStateValue();

  return (
    <div className="header">
      <Link href="/" className="header__logo">
        <p>
          Flight<span className="header__logoPink">Finder</span>
        </p>
      </Link>

      <div className="header__search">
        <input className="header__searchInput" type="text" />
        <SearchIcon className="header__searchIcon" />
      </div>

      <div className="header__nav">
        <Link href="/random">
          <div className="header__option">
            <span className="header__optionLineOne">Random</span>
            <span className="header__optionLineTwo">Destinations</span>
          </div>
        </Link>

        {/* <div className="header__option">
          <span className="header__optionLineOne">Returns</span>
          <span className="header__optionLineTwo">Curated</span>
        </div> */}

        {/* <div className="header__option">
          <span className="header__optionLineOne">Your</span>
          <span className="header__optionLineTwo">Prime</span>
        </div> */}
        {/* <Link to="/checkout">
          <div className="header__optionBasket">
            <ShoppingBasketIcon />
            <span className="header__optionLineTwo header__basketCount">
              {cart?.length}
            </span>
          </div>
        </Link> */}
      </div>
    </div>
  );
}

export default Navbar;
