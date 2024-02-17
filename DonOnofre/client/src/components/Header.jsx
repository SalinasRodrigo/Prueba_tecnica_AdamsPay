import { useUser } from "../hooks/useUser";
import { CreateForm } from "./CreateForm";
import "./Header.css";
import { LoginForm } from "./LoginForm";
import { SigninForm } from "./Signin";

export const Header = () => {
  const { user, setUser } = useUser();

  const handleShow = (name) => {
    const dialog = document.getElementById(name);
    dialog.showModal();
  };

  const handleClose = (id) => {
    const dialog = document.getElementById(id);
    dialog.close();
  };

  const logout = (id) => {
    const dialog = document.getElementById(id);
    setUser(null);
    dialog.close();
  };

  return (
    <header>
      <h1>Don Onofre 🛒</h1>
      <input type="text" placeholder="Buscar producto" />
      <div className="header-btns">
        {user ? (
          <button onClick={() => handleShow(`logout`)}>Cerrar sesion</button>
        ) : (
          <button onClick={() => handleShow(`login`)}>Iniciar sesion</button>
        )}

        {user ? <></> : <button onClick={() => handleShow(`signin`)}>Reistrarte</button>}

        {user && user.is_staff ? (
          <button onClick={() => handleShow(`create`)}>Nuevo Producto</button>
        ) : (
          <></>
        )}
      </div>
      <dialog className="form-dialog" id={`create`}>
        <h2>Nuevo Producto</h2>
        <CreateForm />
      </dialog>
      <dialog className="login-dialog" id={`login`}>
        <h2>Iniciar sesion</h2>
        <LoginForm />
      </dialog>
      <dialog className="signin-dialog" id={`signin`}>
        <h2>Registrate</h2>
        <SigninForm/>
      </dialog>
      <dialog className="logout-dialog" id={`logout`}>
        <div>
          <h2>¿Seguro que desea cerrar sesion?</h2>
          <div className="logout-btns">
            <button onClick={() => handleClose(`logout`)}>Cancelar</button>
            <button onClick={() => logout(`logout`)}>Aceptar</button>
          </div>
        </div>
      </dialog>
    </header>
  );
};
