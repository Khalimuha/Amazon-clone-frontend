import React from "react";
import classes from "./Header.module.css";
import { IoLocationOutline } from "react-icons/io5";
import { FaSearch } from "react-icons/fa";
import { BsCart3 } from "react-icons/bs";
import LowerHeader from "./LowerHeader";

const Header = () => {
  return (
    <>
      <section>
        <div className={classes.header_container}>
          <div className={classes.logo_container}>
            {/* logo */}
            <a href="/">
              <img
                src="https://pngimg.com/uploads/amazon/amazon_PNG11.png"
                alt="Amazon logo"
              />
            </a>

            {/* delivery */}
            <div className={classes.delivery}>
              <span>
                <IoLocationOutline />
              </span>
              <div>
                <p>Deliver to </p>
                <span>Ethiopia</span>
              </div>
            </div>
          </div>
          {/* serch bar */}
          <div className={classes.search}>
            <select name="" id="">
              <option value="">All</option>
            </select>
            <input type="text" name="" id="" placeholder="Search products" />
            <FaSearch />
          </div>
          {/* order section  */}
          <div className={classes.order_container}>
            <a href="#" className={classes.language}>
              {" "}
              {/* right side link */}
              <img
                src="https://pngimg.com/uploads/flags/small/flags_PNG14592.png"
                alt="USA Flag"
              />
              <select name="" id="">
                <option value="">EN</option>
              </select>
            </a>

            <a href="#">
              {" "}
              <p> Sign in</p>
              <span>
                <option value="">Account & Lists</option>
              </span>
            </a>

            {/* orders */}
            <a href="">
              <p>Returns</p>
              <span>& Orders</span>
            </a>
            <a href="#" className={classes.cart}>
              <BsCart3 size={35} />
              <span>0</span>
            </a>
          </div>
        </div>
      </section>
      <LowerHeader />
    </>
  );
};

export default Header;
