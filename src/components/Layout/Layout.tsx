import { Outlet } from 'react-router-dom'

import './layout.scss'

const Layout = () => {
    return (
        <div className="container">
            <h1>GitHub Search</h1>
            <Outlet />
        </div >
    )
}

export default Layout