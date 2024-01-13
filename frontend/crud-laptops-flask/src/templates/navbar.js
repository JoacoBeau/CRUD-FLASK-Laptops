import {Link} from 'react-router-dom'

export default function Navbar(){
    return(
        <>
            <nav className="navbar navbar-expand-lg bg-body-tertiary">
                <div className="container-fluid">
                    <Link className="navbar-brand" to="/">
                    Flask & React - PostgreSQL
                    </Link>
                </div>
            </nav>
        </>
    )
}