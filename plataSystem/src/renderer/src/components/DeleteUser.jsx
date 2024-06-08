function DeleteUser() {
  return (
    <div>
      <p className="text-center">Eliminar Usuario</p>
      <div className="form-group">
        <input type="text" className="form-control" placeholder="Buscar usuario por nombre" />
      </div>

      <div className="mt-2 text-center">
        <p>¿Deseas eliminar a username?</p>
        <button className="btn btn-danger">Eliminar</button>
      </div>
    </div>
  )
}

export default DeleteUser
