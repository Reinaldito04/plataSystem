function AddUsers() {
  return (
    <>
      <p className="text-center">Registro de usuarios</p>
      <form>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input
            type="text"
            className="form-control"
            id="username"
            placeholder="Ingrese su usuario"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Ingrese su contraseña"
          />
        </div>
        <div className="form-group">
          <label htmlFor="type">Tipo</label>
          <select className="form-control" id="type">
            <option value="admin">Administrador</option>
            <option value="user">Usuario</option>
          </select>
        </div>
        <div className="container mx-auto text-center">
          <button type="submit" className="btn mx-auto mt-2 btn-primary">
            Registrar
          </button>
        </div>
      </form>
    </>
  )
}

export default AddUsers
