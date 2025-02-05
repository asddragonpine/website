import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]} style={{
        display: "fixed",
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "50px",
        width: "100%", // Aggiungi questa riga per garantire che occupi tutta la larghezza
        margin: 0, // Rimuovi eventuali margini che potrebbero influire
}}>
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="event">
          <Link to="/event">Events</Link>
        </Menu.Item>
      </Menu>
    );
  };

export default Navbar;
