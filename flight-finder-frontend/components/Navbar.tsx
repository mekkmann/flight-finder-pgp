import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import Link from "next/link";

function Navbar() {
  return (
    <div className="header">
      <Link href="/" className="header__logo">
        <p>
          Flight<span className="header__logoPink">Finder</span>
        </p>
      </Link>
    </div>
  );
}

export default Navbar;
