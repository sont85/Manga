import React from "react";

export class NavigationBar extends React.Component {
    render() {
        return <nav className="navbar navbar-default">
            <div className="container-fluid">
                <div className="navbar-header">
                    <a className="navbar-brand" href="#">
                        <img alt="Brand" src="assets/goku.jpg"/>
                    </a>
                </div>
            </div>
        </nav>
      }
}
