import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'


export default function Add(){

    const navigate = useNavigate();

    const [marca, setMarca] = useState('');
    const [modelo, setModelo] = useState('');
    const [ram, setRam] = useState(0);
    const [placa, setPlaca] = useState('');
    const [precio, setPrecio] = useState(0);


    const handleSubmit = async (e) => {
        e.preventDefault(); 
        const res = await fetch('http://127.0.0.1:5000/api/laptops/add', {
            method: 'POST',
            headers:{
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                marca,
                modelo,
                ram,
                placa,
                precio
              }),
          });
          const data = await res.json();
          console.log(data)
    
        setMarca('');
        setModelo('');
        setRam(0);
        setPlaca('');
        setPrecio(0);
        
        navigate('/');
        Swal.fire("Registrado!", "", "success");

      };

    return(
        <>
            <section className='container p-3'>
                <div className='container text-center'>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                            <h2>
                                <Link to="/" className="left" title="Volver">
                                    <i className="bi bi-arrow-left-circle p-2" /></Link>
                                Registrar Nueva Laptop
                                <hr />
                            </h2>
                        </div>
                    </div>
                </div>
                
                <form onSubmit={handleSubmit} className="mb-3" autoComplete="off" encType="multipart/form-data">
                    <div className="row">
                        <div className="col">
                            <label htmlFor="marca">Marca</label>
                            <input onChange={(e) => setMarca(e.target.value)}
                            value={marca} type="text" name="marca" className="form-control" required />
                        </div>
                        <div className="col">
                            <label htmlFor="modelo">Modelo</label>
                            <input onChange={(e) => setModelo(e.target.value)}
                            value={modelo} type="text" name="modelo" className="form-control" required/>
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="ram">RAM</label>
                            <select onChange={(e) => setRam(e.target.value)}
                            value={ram} name="ram" className="form-control" required="">
                                <option value={0}>--- Seleccione la RAM ---</option>
                                <option value={8}>8GB</option>
                                <option value={16}>16GB</option>
                                <option value={32}>32GB</option>
                                <option value={64}>64GB</option>
                            </select>
                        </div>
                        <div className="col">
                            <label htmlFor="placa">Placa</label>
                            <input onChange={(e) => setPlaca(e.target.value)}
                            value={placa} type="text" name="placa" className="form-control" required />
                        </div>
                    </div>

                    <div className="row">
                        <div className="col">
                            <label htmlFor="precio">Precio</label>
                            <input onChange={(e) => setPrecio(e.target.value)}
                                value={precio} type="number" min={80000} max={1000000} name="precio" className="form-control" required/>
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