function EditUser() {
  return (
    <div>
      <p className="text-center">Modificar Usuario</p>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Buscar usuario por nombre" />
      </div>

      <form>
        <div className="form-group">
          <label htmlFor="username">Usuario</label>
          <input type="text" className="form-control" id="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Contraseña</label>
          <input type="password" className="form-control" id="password" />
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
            Guardar Cambios
          </button>
        </div>
      </form>
    </div>
  )
}

export default EditUser
