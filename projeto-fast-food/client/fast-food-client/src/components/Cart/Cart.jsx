import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import house1 from "../../assets/img/icon/house1.svg";
import cart2 from "../../assets/img/icon/cart2.svg";
import avatar1 from "../../assets/img/icon/avatar1.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { CircularProgress } from "@mui/material";
import "./Cart.css";

export function Cart() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart")) || []);
  const [cartProducts, setCartProducts] = useState(JSON.parse(localStorage.getItem("cartProducts")) || []);
  const restaurantDetail = JSON.parse(localStorage.getItem("restaurantDetail")) || {};
  const [subtotal, setSubtotal] = useState(0);
  const [deliveryOption, setDeliveryOption] = useState("");
  const [loading, setLoading] = useState(false);
  
  const calculateSubtotal = () => {
    let total = 0;
    cart.forEach((item) => {
      total += item.quantity * item.valor;
    });
    setSubtotal(total);
  };

  const removeItem = (idProduto, quantidade) => {
    if (quantidade > 1) {
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
      calculateSubtotal();
    } else {
      const filteredCart = cart.filter((item) => idProduto !== item.id);
      const filteredCartProducts = cartProducts.filter((item) => idProduto !== item.id);

      setCart(filteredCart);
      setCartProducts(filteredCartProducts);

      localStorage.setItem("cart", JSON.stringify(filteredCart));
      localStorage.setItem("cartProducts", JSON.stringify(filteredCartProducts));
      calculateSubtotal();
    }
  };

  const mapCart =
    restaurantDetail &&
    cart &&
    cart.map((prod) => {
      return (
        <div className="MainCards SecondaryCard" key={prod.id}>
          <img src="/undraw_breakfast_psiw.svg" alt={prod.nome} />
          <figcaption>
            <p>Nome: {prod.nome} - {prod.categoria.nome}</p>
            <p>
              Valor:
              {prod.valor.toLocaleString("pt-br", {
                style: "currency",
                currency: "BRL",
              })}
            </p>
            <p className="view">Quantidade:{prod.quantity}</p>
            <button className="btn-remove" onClick={() => removeItem(prod.id, prod.quantity)}>
              remover
            </button>
          </figcaption>
        </div>
      );
    });

  const checkCart = cart.length !== 0 ? <>{mapCart}</> : <p className="emptyCart">Carrinho vazio</p>;

  const handleConfirm = async () => {
    try {
      if (cart.length === 0) {
        toast.error("Seu carrinho está vazio!");
        return;
      }
      
      if (!deliveryOption) {
        toast.error("Selecione uma opção de entrega!");
        return;
      }
      setLoading(true);
      const enderecoId = document.querySelector(".Endereco-Id").id;
      const usuarioId = JSON.parse(localStorage.getItem("user")).id;
      const company = localStorage.getItem("companyId");
      const data = {
        cart,
        subtotal,
        deliveryOption,
        enderecoId,
        usuarioId,
        company
      };
      const response = await axios.post("http://localhost:3000/pedido/save", data);
        toast.success("Pedido Salvo com Sucesso!");
        setLoading(false);
        localStorage.removeItem("cart");
        navigate("/profile");
    } catch (error) {
      console.error("Erro ao confirmar pedido:", error);
      toast.error("Erro ao confirmar pedido!");
    }
  };

  const handleDeliveryOptionChange = (event) => {
    setDeliveryOption(event.target.id);
  };

  useEffect(() => {
    calculateSubtotal();
  }, []);

  return (
    <div className="Container">
      <div className="NavbarContainer">
        <h3 className="Title">Meu carrinho</h3>
      </div>

      <div className="Contents">
        <div className="AddressProduct">
          <div>
            <p>Endereço de entrega</p>
            <p className="Endereco-Id" id={user.endereco.id}>{user.endereco.rua} - {user.endereco.numero} - {user.endereco.bairro} - {user.endereco.cidade} - {user.endereco.estado}</p>
          </div>
        </div>

        <legend>
          <h3 className="TitleCard"></h3>
        </legend>

        <div>{checkCart}</div>

        <div className="Subtotal">
          <p>Subtotal</p>
          <p>R${subtotal.toFixed(2)}</p>
        </div>

        <form className="Form">
          <legend>
            <h3 className="TitleCard">Entrega</h3>
          </legend>

          <div className="radioButton">
            <input
              type="radio"
              name="forma_entrega"
              id="local"
              checked={deliveryOption === "local"}
              onChange={handleDeliveryOptionChange}
            />
            <label htmlFor="local">Retirar no Local</label>
          </div>

          <div className="radioButton">
            <input
              type="radio"
              name="forma_entrega"
              id="delivery"
              checked={deliveryOption === "delivery"}
              onChange={handleDeliveryOptionChange}
            />
            <label htmlFor="delivery">Entrega Delivery</label>
          </div>
        </form>
        {loading ? (
        <CircularProgress className="CircularProgress" size={64} color={"inherit"} />
      ) : (
        <button className="Button-Confirmar" onClick={handleConfirm}>
          Confirmar
        </button>
      )}
      </div>

      <div className="Menu">
        <button
          onClick={() => {
            navigate("/" + localStorage.getItem("companyId"));
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
            navigate("/profile/");
          }}
        >
          <img src={avatar1} width="27" height="27" alt="Profile Icon" />
        </button>
      </div>
    </div>
  );
}
