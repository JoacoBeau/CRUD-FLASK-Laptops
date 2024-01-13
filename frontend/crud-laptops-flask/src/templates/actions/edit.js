import React, { useState, useEffect  } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import Swal from 'sweetalert2'

export default function Edit(){

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

    const handleChange = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setLaptop(values => ({...values, [name]: value}));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();
        await fetch(`http://127.0.0.1:5000/api/laptops/update/:${id}`, {
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(laptop),
          });  
          navigate('/');
          Swal.fire("Actualizado!", "", "success");
    }

    return(
        <>
            <section className='container p-3'>
                <div className='container text-center'>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                            <h2>
                                <Link to="/" className="left" title="Volver">
                                    <i className="bi bi-arrow-left-circle p-2" /></Link>
                                Actualizar Laptop
                                <hr />
                            </h2>
                        </div>
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="mb-3" autoComplete="off" encType="multipart/form-data">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="marca">Marca</label>
                            <input onChange={handleChange}
                            value={laptop.marca} type="text" name="marca" className="form-control" required />
                        </div>
                        <div className="col">
                            <label htmlFor="modelo">Modelo</label>
                            <input onChange={handleChange}
                            value={laptop.modelo} type="text" name="modelo" className="form-control" required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="ram">RAM</label>
                            <select onChange={handleChange}
                            value={laptop.ram} name="ram" className="form-control" required="">
                                <option value={0}>--- Seleccione la RAM ---</option>
                                <option value={8}>8GB</option>
                                <option value={16}>16GB</option>
                                <option value={32}>32GB</option>
                                <option value={64}>64GB</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="placa">Placa</label>
                            <input onChange={handleChange}
                            value={laptop.placa} type="text" name="placa" className="form-control" required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="precio">Precio</label>
                            <input onChange={handleChange}
                                value={laptop.precio} type="number" min={80000} max={1000000} name="precio" className="form-control" required/>
                        </div>
                    </div>
                    <hr />
                    <div className='row'>
                        <input className="mt-3 btn btn-info " type="submit" defaultValue="Guardar Registro"/>
                    </div>                
                </form>
            </section>
        </>
    )

}