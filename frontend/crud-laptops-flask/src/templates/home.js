import Lista from "./actions/lista"
import {Link} from 'react-router-dom'

export default function Home(){
    return (
        <>
            <div className='loader'>
                <div className='container text-center'>
                    <div className='row mb-3'>
                        <div className='col-md-12'>
                            <h1 className='mt-4 bold-800'>Crud Flask y PostgreSQL</h1>
                        </div>
                    </div>
                </div>

                <div className='row p-4'>
                    <Link to='/add' title='Registrar nueva Laptop'
                        className='btn btn-primary btn-sm' 
                        style={{float:"none"}}>
                            Nuevo Registro
                    </Link>
                </div>

                <div className="container">
                    <Lista/>
                </div>
            </div>
        </>
    )
}