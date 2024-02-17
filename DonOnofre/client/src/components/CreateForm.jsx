/* eslint-disable react/prop-types */
import { useCart } from "../hooks/useCart";
import "./UpdateForm.css";

export const CreateForm = () => {
  const { setProductos } = useCart();

  const handleClose = (event) => {
    event.preventDefault();
    const dialog = document.getElementById(`create`);
    dialog.close();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const newProduct = Object.fromEntries(data);
    const csrftoken = document.querySelector('[name=csrfmiddlewaretoken]').value;

    //llamada a la api
    fetch(`/api/products/create`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
        'X-CSRFToken': csrftoken,
      },
      body: JSON.stringify(newProduct),
    });

    //Actualizamos el estado
    setProductos((prevState) => [
      ...prevState,
      {
        ...newProduct,
        id: prevState[prevState.length - 1].id + 1,
      },
    ]);

    const dialog = document.getElementById(`create`);
    dialog.close();
    event.target.reset()
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="my-form">
        <div>
          <label htmlFor="title">Titulo</label>
          <input className="my-input" type="text" name="title" required />
        </div>
        <div>
          <label htmlFor="price">Precio</label>
          <input className="my-input" type="number" name="price" required />
        </div>
        <div>
          <label htmlFor="discountPercentage">Decuento</label>
          <input className="my-input" type="number" step="any" name="discountPercentage" />
        </div>
        <div>
          <label htmlFor="stock">Stock</label>
          <input className="my-input" type="number" name="stock" required />
        </div>
        <div>
          <label htmlFor="brand">Marca</label>
          <input className="my-input" type="text" name="brand" required />
        </div>
        <div>
          <label htmlFor="category">Categoria</label>
          <input className="my-input" type="text" name="category" required />
        </div>
        <div className="thumbnail-input">
          <label htmlFor="thumbnail">Portada</label>
          <input className="my-input" type="url" name="thumbnail" required />
        </div>
        <div className="description-input">
          <label htmlFor="description">Descripción: </label>
          <textarea name="description" cols="30" rows="10" />
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
