/* eslint-disable react/prop-types */
import { useCart } from "../hooks/useCart";
import { useUser } from "../hooks/useUser";
import { AddToCartIcon, RemoveFromCartIcon } from "./Icons";
import "./Product.css";
import { UpdateForm } from "./UpdateForm";
import { formatPrice } from "../utility";

export const Product = ({ product }) => {
  const { cart, addToCart, removeFromCart, setProductos } = useCart();
  const { user } = useUser();

  const checkProductInCart = (product) => {
    return cart.some((item) => item.id === product.id);
  };

  const handleShowUpdate = (name) => {
    const dialog = document.getElementById(name);
    fillForm();
    dialog.showModal();
  };

  const fillForm = () => {
    for (let key in product) {
      let inpt = document.getElementById(`${key}-${product.id}`);
      if (inpt) {
        inpt.value = product[key];
      }
      console.log(key, product[key]);
      console.log(inpt);
    }
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
      <span className="discount">-{product.discountPercentage}%</span>
      <div key={product.id} className="product-card">
        <div className="thumbnail">
          <img src={product.thumbnail} alt={product.title} />
          <div className="product-btns">
            {!user || !user.is_staff ? (
              <div>
                {checkProductInCart(product) ? (
                  <button
                    onClick={() => removeFromCart(product)}
                    style={{ color: "#242424", backgroundColor: "#ffffff" }}
                  >
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
          </div>
        </div>
        <h5>{product.title}</h5>
        <small className="text">{product.description}</small>
        <div className="price">
          <b>
            {formatPrice(
              Math.round(
                product.price -
                  (product.price * product.discountPercentage) / 100
              )
            )}
          </b>
          <small>
            <del>{formatPrice(product.price)}</del>
          </small>
        </div>
        {user && user.is_staff ? (
          <div className="admin-btns">
            <button onClick={() => handleShow(`delete-${product.id}`)}>
              Delete
            </button>
            <button onClick={() => handleShowUpdate(`update-${product.id}`)}>
              Update
            </button>
          </div>
        ) : (
          <></>
        )}
      </div>
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
  );
};
