/* eslint-disable react/prop-types */
import { useCart } from "../hooks/useCart";
import "./UpdateForm.css";

export const UpdateForm = ({ product }) => {
  const { productos, setProductos } = useCart();

  const handleClose = (event) => {
    event.preventDefault();
    const dialog = document.getElementById(`update-${product.id}`);
    dialog.close();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const newProduct = Object.fromEntries(data);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;
    
    //llamada a la api
    fetch(`/api/products/${product.id}/update/`, {
      method: "PUT",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(newProduct),
    });

    //Actualizamos el estado
    const stateIndex = productos.findIndex((item) => item.id === product.id);
    const newState = [
      ...productos.slice(0, stateIndex),
      {
        ...newProduct,
        id: product.id,
      },
      ...productos.slice(stateIndex + 1),
    ];
    setProductos(newState);

    const dialog = document.getElementById(`update-${product.id}`);
    dialog.close();
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-form">
        <div>
          <label htmlFor="title">Titulo</label>
          <input className="my-input" type="text" name="title" id={`title-${product.id}`} required />
        </div>
        <div>
          <label htmlFor="price">Precio</label>
          <input className="my-input" type="number" name="price" id={`price-${product.id}`}  required />
        </div>
        <div>
          <label htmlFor="discountPercentage">Decuento</label>
          <input className="my-input" type="number" step="any" name="discountPercentage" id={`discountPercentage-${product.id}`} />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input className="my-input" type="number" name="stock" id={`stock-${product.id}`}  required />
        </div>
        <div>
          <label htmlFor="brand">Marca</label>
          <input className="my-input" type="text" name="brand" id={`brand-${product.id}`}  required />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <input className="my-input" type="text" name="category" id={`category-${product.id}`}  required />
        </div>
        <div className="thumbnail-input">
          <label htmlFor="thumbnail">Portada</label>
          <input className="my-input" type="url" name="thumbnail" id={`thumbnail-${product.id}`}  required />
        </div>
        <div className="description-input">
          <label htmlFor="description">Descripción: </label>
          <textarea name="description" cols="30" rows="10" id={`description-${product.id}`}  />
        </div>
        <div className="dialog-btns">
          <button type="submit" className="submit-btn">
            Guardar
          </button>
          <button onClick={handleClose} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
