import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["home"]} style={{
        justifyContent: "center",
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        height: "50px",
        width: "100%",
        margin: 0,
        background: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
        backdropFilter: "blur(10px)",
        borderBottom: "none",
        color: "#fff",

      }}>
        <Menu.Item key="home">
          <Link to="/">Home</Link>
        </Menu.Item>
        <Menu.Item key="event">
          <Link to="/event">Events</Link>
        </Menu.Item>
        <Menu.Item key="aboutus">
          <Link to="/aboutus">Chi siamo</Link>
        </Menu.Item>
      </Menu>
    );
  };

export default Navbar;
