import { CreateForm } from "./CreateForm";


export const Header = () => {

  const handleShow = (name) => {
    const dialog = document.getElementById(name);
    dialog.showModal();
  };

  return(
    <header>
      <h1>Don Onofre</h1>
      <button onClick={() => handleShow(`create`)}>
        Nuevo Producto
      </button>
      <dialog  className="form-dialog" id={`create`}>
        <h2>Nuevo Producto</h2>
          <CreateForm/>
      </dialog>
    </header>
  )
}