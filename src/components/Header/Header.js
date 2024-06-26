import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useCart } from "react-use-cart";
import Badge from "@mui/material/Badge";

import Modal from "../UI/Modal/Modal";
import Auth from "../Auth/Auth";
import {
  ABOUT_ROUTE,
  CART_ROUTE,
  COMPARE__ROUTE,
  CONTACTS_ROUTE,
  DELIVERY_ROUTE,
  HOME_ROUTE,
  NEWS_ROUTE,
  SEARCH__ROUTE,
} from "../../utils/consts";
import CatalogModal from "../UI/Modal/CatalogModal";
import Category from "../Main/Category/Category";
import { setModalCatalog } from "../../store/modalCatalog";
import { addSearchProducts } from "../../store/searchData";
import "./Header.css";

import cart_logo from "../../assets/images/cart_logo.svg";
import compare_logo from "../../assets/images/compare_logo.svg";
import lupa from "../../assets/images/new_design/lupa.svg";

import header_logo_svg from "../../assets/images/header/header_logo_svg.svg";

import { $host } from "../../http";

const list = [
  {
    name: "Главная",
    path: HOME_ROUTE,
  },
  {
    name: "О нас",
    path: ABOUT_ROUTE,
  },
  {
    name: "Новости",
    path: NEWS_ROUTE,
  },
  {
    name: "Доставка и оплата",
    path: DELIVERY_ROUTE,
  },
  {
    name: "Контакты",
    path: CONTACTS_ROUTE,
  },
];

function Header() {
  const [modalAuth, setModalAuth] = useState(false);
  const [activeMobileMenu, setActiveMobileMenu] = useState(false);
  const [search, setSearch] = useState("");
  const { totalUniqueItems } = useCart();

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const modalCatalog = useSelector((s) => s.modalCatalog.modalCatalog);
  const compareProducts = useSelector((s) => s.compareSlice.compare_products);

  document.body.style.overflow = activeMobileMenu ? "hidden " : "auto ";

  const searchHandler = async (e) => {
    if (search && e.key === "Enter") {
      await $host.get(`api/products/?search=${search}`).then(({ data }) => {
        dispatch(addSearchProducts(data.results));
        setSearch("");
        navigate(SEARCH__ROUTE);
      });
    }
  };

  const searchHandler_2 = async () => {
    await $host.get(`api/products/?search=${search}`).then(({ data }) => {
      dispatch(addSearchProducts(data.results));
      setSearch("");
      navigate(SEARCH__ROUTE);
    });
  };

  return (
    <header className="header">
      <div className="header__container">
        <div className="header__content computer">
          <div className="header__content--item">
            <div className="header__logo">
              {/* <Link to="/">
                <span>AkfaMedfarm</span>{" "}
              </Link> */}

              <Link to="/">
                <div className="header__logo--item">
                  {/* <p>
                    <span>Akfa</span>
                    med farm
                  </p> */}
                  <img
                    style={{ width: "120px" }}
                    src={header_logo_svg}
                    alt=""
                  />
                </div>
              </Link>
            </div>

            <div
              className="header__catalog"
              onClick={() => {
                dispatch(setModalCatalog(!false));
              }}
            >
              <span>Каталог</span>

              <div
                className={
                  modalCatalog
                    ? "header__catalog--icon _active"
                    : "header__catalog--icon"
                }
              >
                <span></span>
              </div>
            </div>
          </div>
          <div className="header__content--item menu">
            <ul className="header__menu_ul">
              {list.map((obj, index) => {
                return (
                  <li key={index + 1}>
                    <NavLink to={obj.path}>
                      {/* <li key={index}>{obj.name}</li> */}
                      {obj.name}
                    </NavLink>
                  </li>
                );
              })}
            </ul>
          </div>
          <div className="header__content--item assets">
            <div className="header__assets">
              <div className="header__assets-top">
                <div className="header__cart">
                  {/* <Link to={CART_ROUTE}>
                    <Badge badgeContent={totalUniqueItems} color="error">
                      <img src={cart_logo} alt="No img" />
                    </Badge>
                    <p>Корзина</p>
                  </Link> */}

                  <button onClick={() => navigate(CART_ROUTE)}>
                    <Badge badgeContent={totalUniqueItems} color="error">
                      <img src={cart_logo} alt="No img" />
                    </Badge>
                    <p>Корзина</p>
                  </button>
                </div>

                <div className="header__compare">
                  {/* <Link to={COMPARE__ROUTE}>
                    <Badge badgeContent={compareProducts.length} color="error">
                      <img src={compare_logo} alt="No img" />
                    </Badge>
                    <p>Сравнения</p>
                  </Link> */}

                  <button onClick={() => navigate(COMPARE__ROUTE)}>
                    <Badge badgeContent={compareProducts.length} color="error">
                      <img src={compare_logo} alt="No img" />
                    </Badge>
                    <p>Сравнения</p>
                  </button>
                </div>

                {/* <div
                  // onClick={() => setModalAuth(true)}
                  className="header__login"
                >
                  <img src={login_logo} alt="No img" />
                  <p>Войти</p>
                </div> */}
              </div>
              <div className="header__assets-bottom">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => searchHandler(e)}
                />
                <img
                  onClick={() => searchHandler_2()}
                  src={lupa}
                  alt="No img"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="header__content mobile">
          <div className="header__mobile--top">
            <div className="header__logo">
              {/* <Link to="/">
                <span>AkfaMedfarm</span>{" "}
              </Link> */}

              <Link to="/">
                <div className="header__logo--item">
                  {/* <p>
                    <span>Akfa</span>
                    med farm
                  </p> */}
                  <img
                    style={{ width: "120px" }}
                    src={header_logo_svg}
                    alt=""
                  />
                </div>
              </Link>
            </div>
            <div className="header__mobile--middle">
              <div className="header__assets-bottom">
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  onKeyDown={(e) => searchHandler(e)}
                />
                <img
                  onClick={() => searchHandler_2()}
                  src={lupa}
                  alt="No img"
                />
              </div>
              <div
                className="header__catalog"
                onClick={() => {
                  dispatch(setModalCatalog(!false));
                }}
              >
                <span>Каталог</span>

                <div
                  className={
                    modalCatalog
                      ? "header__catalog--icon _active"
                      : "header__catalog--icon"
                  }
                >
                  <span></span>
                </div>
              </div>
            </div>
            <nav
              className={
                activeMobileMenu
                  ? "header__mobile--menu _active"
                  : "header__mobile--menu"
              }
            >
              <ul>
                {list.map((obj, index) => {
                  return (
                    <li
                      onClick={() => setActiveMobileMenu(false)}
                      key={index + 3}
                    >
                      <NavLink to={obj.path}>{obj.name}</NavLink>
                    </li>
                  );
                })}
              </ul>

              <div className="header__asset--mobile ">
                <div className="header__cart item">
                  {/* <Link
                    to={CART_ROUTE}
                    onClick={() => setActiveMobileMenu(false)}
                  >
                    <span>Корзина</span>
                    <Badge badgeContent={totalUniqueItems} color="error">
                      <img src={cart_logo} alt="No img" />
                    </Badge>
                  </Link> */}

                  <button
                    onClick={() => {
                      navigate(CART_ROUTE);
                      setActiveMobileMenu(false);
                    }}
                  >
                    <span>Корзина</span>

                    <Badge badgeContent={totalUniqueItems} color="error">
                      <img src={cart_logo} alt="No img" />
                    </Badge>
                  </button>
                </div>

                <div className="header__compare item">
                  {/* <Link
                    to={COMPARE__ROUTE}
                    onClick={() => setActiveMobileMenu(false)}
                  >
                    <span>Сравнения</span>
                    <Badge badgeContent={compareProducts.length} color="error">
                      <img src={compare_logo} alt="No img" />
                    </Badge>
                  </Link> */}

                  <button
                    onClick={() => {
                      navigate(COMPARE__ROUTE);
                      setActiveMobileMenu(false);
                    }}
                  >
                    <span>Сравнения</span>

                    <Badge badgeContent={compareProducts.length} color="error">
                      <img src={compare_logo} alt="No img" />
                    </Badge>
                  </button>
                </div>

                {/* <div
                  // onClick={() => setModalAuth(true)}
                  className="header__login item"
                >
                  <span>Войти</span>
                  <img src={login_logo} alt="No img" />
                </div> */}
              </div>
            </nav>
            <div
              onClick={() => setActiveMobileMenu(!activeMobileMenu)}
              className={
                activeMobileMenu
                  ? "header__mobile--button _active"
                  : "header__mobile--button"
              }
            >
              <span></span>
            </div>
          </div>
          <div className="header__mobile--bottom"></div>
        </div>
      </div>
      <Modal active={modalAuth} setActive={setModalAuth}>
        <Auth />
      </Modal>
      <CatalogModal active={activeMobileMenu}>{<Category />}</CatalogModal>
    </header>
  );
}

export default Header;

// {/* <div className="header__left">
//             <ul>
//               {list.map((obj, index) => {
//                 return (
//                   <li key={index + 1}>
//                     <NavLink to={obj.path}>
//                       {/* <li key={index}>{obj.name}</li> */}
//                       {obj.name}
//                     </NavLink>
//                   </li>
//                 );
//               })}
//             </ul>
//             <div
//               className="header__catalog"
//               onClick={() => {
//                 dispatch(setModalCatalog(!false));
//               }}
//             >
//               <span>Каталог</span>

//               <div
//                 className={
//                   modalCatalog
//                     ? "header__catalog--icon _active"
//                     : "header__catalog--icon"
//                 }
//               >
//                 <span></span>
//               </div>
//             </div>
//           </div>
//           <div className="header__right">
//             <div className="header__logo">
//               {/* <Link to="/">
//                 <span>AkfaMedfarm</span>{" "}
//               </Link> */}

//               <Link to="/">
//                 <div className="header__logo--item">
//                   {/* <p>
//                     <span>Akfa</span>
//                     med farm
//                   </p> */}
//                   <img
//                     style={{ width: "150px" }}
//                     src={header_logo_svg}
//                     alt=""
//                   />
//                 </div>
//               </Link>
//             </div>
//             <div className="header__assets">
//               <div className="header__assets-top">
//                 <div className="header__cart">
//                   {/* <Link to={CART_ROUTE}>
//                     <Badge badgeContent={totalUniqueItems} color="error">
//                       <img src={cart_logo} alt="No img" />
//                     </Badge>
//                     <p>Корзина</p>
//                   </Link> */}

//                   <button onClick={() => navigate(CART_ROUTE)}>
//                     <Badge badgeContent={totalUniqueItems} color="error">
//                       <img src={cart_logo} alt="No img" />
//                     </Badge>
//                     <p>Корзина</p>
//                   </button>
//                 </div>

//                 <div className="header__compare">
//                   {/* <Link to={COMPARE__ROUTE}>
//                     <Badge badgeContent={compareProducts.length} color="error">
//                       <img src={compare_logo} alt="No img" />
//                     </Badge>
//                     <p>Сравнения</p>
//                   </Link> */}

//                   <button onClick={() => navigate(COMPARE__ROUTE)}>
//                     <Badge badgeContent={compareProducts.length} color="error">
//                       <img src={compare_logo} alt="No img" />
//                     </Badge>
//                     <p>Сравнения</p>
//                   </button>
//                 </div>

//                 {/* <div
//                   // onClick={() => setModalAuth(true)}
//                   className="header__login"
//                 >
//                   <img src={login_logo} alt="No img" />
//                   <p>Войти</p>
//                 </div> */}
//               </div>
//               <div className="header__assets-bottom">
//                 <input
//                   type="text"
//                   value={search}
//                   onChange={(e) => setSearch(e.target.value)}
//                   onKeyDown={(e) => searchHandler(e)}
//                 />
//                 <img
//                   onClick={() => searchHandler_2()}
//                   src={lupa}
//                   alt="No img"
//                 />
//               </div>
//             </div>
//           </div> */}
