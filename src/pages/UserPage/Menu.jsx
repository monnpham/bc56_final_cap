import React from 'react'
import { NavLink } from 'react-router-dom'

export default function Menu_side() {
    return (
        <div className="menu">
            <div className="account">
                <div className="avatar">
                    <img src="../../../public/imgs/img/download.jfif" alt />
                </div>
                <div className="account-info">
                    <p>CyberLearn.vn</p>
                    <p>Report bugs</p>
                </div>
            </div>
            <div className="control">
                <div >
                    <i className="fa fa-credit-card" />
                    <NavLink to="/user/Board" activeClasName="active">
                        Cyber Boar
                    </NavLink >
                </div>
                <div >
                    <NavLink to="/user/Create" activeClasName="active">
                        <i className="fa fa-cog" />
                        <span>Create Project</span>
                    </NavLink>
                </div>
                <div >
                    <NavLink to="/user/Management" activeClasName="active">
                        <i className="fa fa-cog" />
                        <span>Project Management</span>
                    </NavLink>
                </div>
            </div>
            <div className="feature">
                <div>
                    <i className="fa fa-truck" />
                    <span>Releases</span>
                </div>
                <div>
                    <i className="fa fa-equals" />
                    <span>Issues and filters</span>
                </div>
                <div>
                    <i className="fa fa-paste" />
                    <span>Pages</span>
                </div>
                <div>
                    <i className="fa fa-location-arrow" />
                    <span>Reports</span>
                </div>
                <div>
                    <i className="fa fa-box" />
                    <span>Components</span>
                </div>
            </div>
        </div>
    )
}
