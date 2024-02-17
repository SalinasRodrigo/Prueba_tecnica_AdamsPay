/* eslint-disable react/prop-types */
import { useUser } from "../hooks/useUser";
import "./LoginForm.css";

export const LoginForm = () => {
  const { setUser } = useUser();

  const handleClose = (event) => {
    event.preventDefault();
    const dialog = document.getElementById(`login`);
    dialog.close();
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);
    const user = Object.fromEntries(data);
    getUser(user);
    const dialog = document.getElementById(`login`);
    dialog.close();
  };

  const getUser = (user) => {
    fetch("/api/user/", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((response) => {
        const user = response;
        console.log(user);
        setUser(user);
      });
    console.log(user);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="login-form">
        <div>
          <label htmlFor="username">Nombre de usuario</label>
          <input className="my-input" type="text" name="username" required />
        </div>
        <div>
          <label htmlFor="password">Contraseña</label>
          <input
            className="my-input"
            type="password"
            name="password"
            required
          />
        </div>
        <div className="dialog-btns">
          <button type="submit" className="submit-btn">
            Aceptar
          </button>
          <button onClick={handleClose} className="cancel-btn">
            Cancelar
          </button>
        </div>
      </form>
    </>
  );
};
