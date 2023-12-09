import React, { useState } from "react";
import Modal from "@mui/material/Modal";
import { UseForm } from "../../../../services/useForm";
import './CardDetail.css';

export function CardDetail({ product }) {
  const [open, setOpen] = useState(false);
  const [form, handleInputChange] = UseForm({
    quantity: "",
  });

  const clearField = (e) => {
    e.preventDefault();
    handleInputChange(e);
  };


  const addCart = (id) => {
    const storedCartProducts = JSON.parse(localStorage.getItem("cartProducts")) || [];
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];

    const itemCart = storedCart.find((item) => id === item.id);

    if (itemCart) {
      const updatedCartProducts = storedCartProducts.map((item) => (id === item.id ? { ...item, quantity: parseInt(Number(form.quantity)) } : item));
      localStorage.setItem("cartProducts", JSON.stringify(updatedCartProducts));

      const updatedCart = storedCart.map((item) => (id === item.id ? { ...item, quantity: parseInt(Number(form.quantity)) } : item));
      localStorage.setItem("cart", JSON.stringify(updatedCart));
    } else {
      const itemAddToCart = { ...product, quantity: parseInt(Number(form.quantity)) };

      const newItemsCart = [...storedCart, itemAddToCart];
      localStorage.setItem("cart", JSON.stringify(newItemsCart));

      const newItems = [...storedCartProducts, { id: id, quantity: parseInt(Number(form.quantity)) }];
      localStorage.setItem("cartProducts", JSON.stringify(newItems));
    }

    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <figure className="SecundaryCard">
      <img src="/undraw_breakfast_psiw.svg" />
      <figcaption>
        <p>{product.nome}</p>
        <p>{product.categoria.nome}</p>
        <p>
          {product.valor.toLocaleString("pt-br", {
            style: "currency",
            currency: "BRL",
          })}
        </p>
        {form.quantity > 0 ? (
          <p className="view">{form.quantity}</p>
        ) : (
          <p className="null">{null}</p>
        )}
          <button onClick={handleOpen}>adicionar</button>
      </figcaption>

      <Modal
        open={open}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <form className="Box" onSubmit={clearField}>
          <h2 id="parent-modal-title">Selecione a quantidade desejada</h2>
          <select
            id="parent-modal-description"
            name="quantity"
            onChange={handleInputChange}
          >
            <option key={-1} value={-1}>
                Selecione...
              </option>
            {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
              <option key={value} value={value}>
                {value}
              </option>
            ))}
          </select>

          <button type="submit" onClick={() => addCart(product.id)}>
            Adicionar ao carrinho
          </button>
        </form>
      </Modal>
    </figure>
  );
}