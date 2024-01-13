import { useEffect, useState } from "react"
import {Link} from 'react-router-dom'
import Swal from 'sweetalert2'

export default function Lista(){

    const [listLaptops, setListLaptops] = useState([])

    useEffect(() => {
        getLaptops();
    }, [])

    const getLaptops = async () => {
        try{
            fetch('http://localhost:5000/api/laptops').then(  //Llamamos a la api, al endpoint get_laptops
                res => res.json()
            ).then(
                data => {
                    setListLaptops(data)                      //Guardamos los datos en la lista listaLaptops
                }
            )
            console.log(listLaptops)
        }
        catch{
        }
    }

    const deleteLaptop = async (id) => {
        Swal.fire({
            title: "Está seguro de eliminar el registro?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Eliminar",
            denyButtonText: `No, Volver`
          }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                fetch(`http://127.0.0.1:5000/api/laptops/delete/:${id}`, {
                    method: "DELETE",
                  });
                
                Swal.fire("Eliminado!", "", "success");
                window.location.reload()
            } else if (result.isDenied) {
              Swal.fire("Ningun registro fue eliminado", "", "info");
            }
          });
      };
    
    return(
        <>
            <div className="table-responsive">
                <table className="table table-bordered table-hover table-warning table-striped">
                    <thead>
                        <tr>
                            <th scope="col">Marca</th>
                            <th scope="col">Modelo</th>
                            <th scope="col">Ram</th>
                            <th scope="col">Placa</th>
                            <th scope="col">Precio</th>
                            <th scope="col">Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            listLaptops.map((item, key) => (
                                <tr id={item.id} key={key}>
                                    <td>{ item.marca }</td>
                                    <td>{ item.modelo }</td>
                                    <td>{ item.ram } GB</td>
                                    <td>{ item.placa }</td>
                                    <td>${ item.precio }</td>
                                    <td width="300">
                                        <span style={{display: 'flex'}}>
                                            <Link to={`/view/${item.id}`} className="btn btn-success btn-sm"
                                                tooltip="Actualizar Registro">
                                                Detalles
                                            </Link>
                                            <Link to={`/edit/${item.id}`} className="btn btn-info btn-sm"
                                                tooltip="Actualizar Registro">
                                                Actualizar
                                            </Link>
                                            <Link to="#" onClick={() => {deleteLaptop(item.id)}} className="btn btn-danger btn-sm"
                                                tooltip="Eliminar Registro">
                                                <i className="bi bi-trash3"></i>
                                                Eliminar
                                            </Link>
                                        </span>
                                    </td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </>
    )
}