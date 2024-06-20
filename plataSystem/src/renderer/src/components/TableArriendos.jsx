import DataTable from 'react-data-table-component';
import { useEffect, useState } from 'react';
import axiosInstance from '../utils/BackendConfig';
import ruta from '../utils/RutaBackend';
const columns = (handlePrint, handleCancel) => [
  {
    name: 'Alquilado Por',
    selector: (row) => `${row.ClienteNombre} ${row.ClienteApellido}`,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Propietario',
    selector: (row) => `${row.PropietarioNombre} ${row.PropietarioApellido}`,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Direccion',
    selector: (row) => row.InmuebleDireccion,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Desde',
    selector: (row) => row.FechaInicio,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Hasta',
    selector: (row) => row.FechaFin,
    sortable: true,
    filterable: true // Habilita el filtro para esta columna
  },
  {
    name: 'Acciones',
    cell: (row) => (
      <div>
        <button className='btn btn-primary' onClick={() => handlePrint(row)}>Imprimir</button>
        <button className='btn btn-danger' onClick={() => handleCancel(row)}>Cancelar</button>
      </div>
    ),
    ignoreRowClick: true,
    allowOverflow: true,
    button: true
  }
];

function TableArriendos() {
  const [filterText, setFilterText] = useState('');
  const [data, setData] = useState([]);
  const [error, setError] = useState('');
  useEffect(() => {
    axiosInstance
      .get('/contracts')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching contracts:', error);
      });
  }, []);

  const handlePrint = (row) => {
    const reportData = {
      fecha: new Date().toISOString().split('T')[0], // fecha actual en formato YYYY-MM-DD
      nombre: `${row.PropietarioNombre} ${row.PropietarioApellido}`,
      inmueble: row.InmuebleDireccion,
      municipio: row.Municipio,
      motivo: "RENOVACION DEL CONTRATO DE ARRENDAMIENTO",
      fechaInicio: row.FechaInicio,
      fechaFin: row.FechaFin,
      duracionMeses: row.DuracionMeses,
      monto: row.Monto
    };
  
    axiosInstance.post('/generate-contratReport', reportData)
      .then(response => {
        console.log('Reporte generado exitosamente:', response.data);
        
        const downloadUrl = `${ruta}/${response.data.file_path}`;

        // Crear un elemento <a> para iniciar la descarga
        const downloadLink = document.createElement('a');
        downloadLink.href = downloadUrl;
        downloadLink.setAttribute('download', '');
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
      })
      .catch(error => {
        if (error.response) {
          console.error('Error generando reporte:', error.response.data);
          setError('Error al generar el reporte: ' + error.response.data.detail);
        } else if (error.request) {
          console.error('No se recibió respuesta del servidor:', error.request);
          setError('Error al comunicarse con el servidor');
        } else {
          console.error('Error inesperado:', error.message);
          setError('Error inesperado: ' + error.message);
        }
      });
  };

  const handleCancel = async (row) => {
    try {
      const response = await axiosInstance.post('/cancel-contract', { id: row.id });
      console.log('Contract canceled successfully:', response.data);
      // Aquí puedes añadir lógica adicional si es necesario
    } catch (error) {
      console.error('Error canceling contract:', error);
    }
  };

  const filteredItems = data.filter(
    (item) =>
      item.ClienteNombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.ClienteApellido.toLowerCase().includes(filterText.toLowerCase()) ||
      item.PropietarioNombre.toLowerCase().includes(filterText.toLowerCase()) ||
      item.PropietarioApellido.toLowerCase().includes(filterText.toLowerCase()) ||
      item.InmuebleDireccion.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaInicio.toLowerCase().includes(filterText.toLowerCase()) ||
      item.FechaFin.toLowerCase().includes(filterText.toLowerCase())
  );

  return (
    <>
     {error && <div className="alert alert-danger">{error}</div>}
 
      <input
        type="text"
        placeholder="Buscar..."
        value={filterText}
        onChange={(e) => setFilterText(e.target.value)}
      />

      <DataTable columns={columns(handlePrint, handleCancel)} data={filteredItems} pagination />
    </>
  );
}

export default TableArriendos;
