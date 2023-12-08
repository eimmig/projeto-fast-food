import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import house1 from "../../assets/img/icon/house1.svg";
import cart2 from "../../assets/img/icon/cart2.svg";
import avatar1 from "../../assets/img/icon/avatar1.svg";
import "./Cart.css";


export function Cart() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cartProducts")) || []);
  const restaurantDetail = JSON.parse(localStorage.getItem("restaurantDetail")) || {};

  const removeItem = (idProduto, quantidade) => {
    if (quantidade > 0) {
      const updatedCart = cart.map((item) => {
        if (idProduto === item.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      const updatedCartProducts = cartProducts.map((item) => {
        if (idProduto === item.id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        }
        return item;
      });

      setCart(updatedCart);
      setCartProducts(updatedCartProducts);

      localStorage.setItem("cart", JSON.stringify(updatedCart));
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));
    } else {
      const filteredCart = cart.filter((item) => idProduto !== item.id);
      const filteredCartProducts = cartProducts.filter((item) => idProduto !== item.id);

      setCart(filteredCart);
      setCartProducts(filteredCartProducts);

      localStorage.setItem("cart", JSON.stringify(filteredCart));
      localStorage.setItem("cartProducts", JSON.stringify(filteredCartProducts));
    }
  };

  const mapCart =
    restaurantDetail &&
    cart &&
    cart.map((prod) => {
      return (
        <div className="SecondaryCard" key={prod.id}>
          <img src="/undraw_breakfast_psiw.svg" alt={prod.nome} />
          <figcaption>
            <p>{prod.nome}</p>
            <p>{prod.categoria.nome}</p>
            <p>
              {prod.valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="view">{prod.quantity}</p>
            <button className="btn-remove" onClick={() => removeItem(prod.id, prod.quantity)}>
              remover
            </button>
          </figcaption>
        </div>
      );
    });

  const checkCart = cart.length !== 0 ? <>{mapCart}</> : <p className="emptyCart">Carrinho vazio</p>;

  return (
    <div className="Container">
      <div className="NavbarContainer">
        <h3 className="Title">Meu carrinho</h3>
      </div>

      <div className="Contents">
        <div className="Address">
          <div>
            <p>Endereço de entrega</p>
            <p>{user.address}</p>
          </div>
        </div>

        {cart.length > 0 ? (
          <figure className="MainCards">
            <figcaption>
              <h4>{restaurantDetail.name}</h4>
              <ul>
                <li>{restaurantDetail.address}</li>
                <li>
                  {restaurantDetail.deliveryTime} - {Math.round(restaurantDetail.deliveryTime * 0.25) + restaurantDetail.deliveryTime} min
                </li>
              </ul>
            </figcaption>
          </figure>
        ) : null}

        <div>{checkCart}</div>

        {cart.length > 0 ? (
          <p className="Shipping">
            {cart.length !== 0 ? (
              <>
                Frete {"0".toLocaleString("pt-br", {
                  style: "currency",
                  currency: "BRL",
                })}
              </>
            ) : (
              <>Frete R$ 0,00</>
            )}
          </p>
        ) : null}

        <div className="Subtotal">
          <p>Subtotal</p>
          <p>R$00,00 </p>
        </div>

        <form className="Form">
          <legend>
            <h3 className="TitleCard">Forma de pagamento</h3>
          </legend>

          <div>
            <input type="radio" name="forma_pagamento" id="dinheiro" />
            <label htmlFor="dinheiro">Dinheiro</label>
          </div>

          <div>
            <input type="radio" name="forma_pagamento" id="credito" />
            <label htmlFor="credito">Cartão de crédito</label>
          </div>
        </form>

        <button className="Button">
          <button>Confirmar</button>
        </button>
      </div>

      <div className="Menu">
        <button
          onClick={() => {
            navigate("/" + localStorage.getItem("company"));
          }}
        >
          <img src={house1} width="27" height="27" alt="Home Icon" />
        </button>

        <button
          onClick={() => {
            navigate("/cart");
          }}
        >
          <img src={cart2} width="27" height="27" alt="Cart Icon" />
        </button>

        <button
          onClick={() => {
            navigate("/profile/" + localStorage.getItem("userId"));
          }}
        >
          <img src={avatar1} width="27" height="27" alt="Profile Icon" />
        </button>
      </div>
    </div>
  );
}