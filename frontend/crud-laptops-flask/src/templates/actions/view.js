import React, { useState, useEffect  } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";

export default function View(){
    const navigate = useNavigate();
    const {id} = useParams();

    const [laptop, setLaptop] = useState([])

    useEffect(() => {
        getLaptop();
    }, []);
  
    const getLaptop = async () => {
        console.log(id)
        fetch(`http://localhost:5000/api/laptops/:${id}`).then(  //Llamamos a la api, al endpoint get_laptop
            res => res.json()
        ).then(
            data => {
                setLaptop(data)    
            }
        )
    }

    return(
        <>
            <div className="container p-3">
                <div className='container text-center'>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                            <h2>
                                <Link to="/" className="left" title="Volver">
                                    <i className="bi bi-arrow-left-circle p-2" /></Link>
                                Detalles de la Laptop
                                <hr />
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-body">
                        <h5 className="card-title"><strong>{laptop.marca}</strong></h5>
                    </div>

                    <ul className="list-group list-group-flush">
                        <li className="list-group-item">Modelo: <strong>{laptop.modelo}</strong></li>
                        <li className="list-group-item">RAM: <strong>{laptop.ram}GB</strong></li>
                        <li className="list-group-item">Placa: <strong>{laptop.placa}</strong></li>
                        <li className="list-group-item">Precio: <strong>${laptop.precio}</strong></li>
                    </ul>
                </div>
            </div>
        </>
    )
}