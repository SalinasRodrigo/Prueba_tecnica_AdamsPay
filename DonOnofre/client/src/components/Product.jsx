/* eslint-disable react/prop-types */
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Product.css";
import { UpdateForm } from "./UpdateForm";

export const Product = ({ product }) => {
  const { cart, addToCart, removeFromCart, setProductos } = useCart();
  const { user } = useUser();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const handleShow = (name) => {
    const dialog = document.getElementById(name);
    dialog.showModal();
  };

  const handleClose = (event) => {
    event.preventDefault();
    const dialog = document.getElementById(`delete-${product.id}`);
    dialog.close();
  };

  const handleDelete = (event) => {
    event.preventDefault();
    fetch(`/api/products/${product.id}/delete`, {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
      },
    });
    setProductos((prevState) =>
      prevState.filter((item) => item.id != product.id)
    );
    const dialog = document.getElementById(`delete-${product.id}`);
    dialog.close();
  };

  return (
    <div>
      <div key={product.id} className="product-card">
        <h5>{product.title}</h5>
        <div className="content">
          <img src={product.thumbnail} alt={product.title} />
          <div className="text">
            <small>{product.description}</small>
            <b>Gs. {product.price}</b>
          </div>
        </div>
        <div className="product-btns">
          {!user || !user.is_staff ? (
            <div>
              {checkProductInCart(product) ? (
                <button onClick={() => removeFromCart(product)}>
                  <RemoveFromCartIcon />
                </button>
              ) : (
                <button onClick={() => addToCart(product)}>
                  <AddToCartIcon />
                </button>
              )}
            </div>
          ) : (
            <></>
          )}
          {user && user.is_staff ? (
            <>
              <button onClick={() => handleShow(`delete-${product.id}`)}>
                Delete
              </button>
              <button onClick={() => handleShow(`update-${product.id}`)}>
                Update
              </button>
            </>
          ) : (
            <></>
          )}
          <dialog className="form-dialog" id={`update-${product.id}`}>
            <h2>Actualizar Producto</h2>
            <UpdateForm product={product} />
          </dialog>
          <dialog className="delete-dialog" id={`delete-${product.id}`}>
            <div>
              <h2>¿Seguro que desea eliminar este porducto?</h2>
              <div className="delete-dialog-btns">
                <button onClick={handleClose}>Cancelar</button>
                <button onClick={handleDelete}>Eliminar</button>
              </div>
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
};
