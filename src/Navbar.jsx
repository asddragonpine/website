import React from "react";
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom"; // Usa NavLink
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const selectedKey = location.pathname;

  return (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]}
      style={{
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
        backdropFilter: "blur(5px)",
        borderBottom: "none",
        color: "#fff",
      }}
    >
      <Menu.Item key="/">
        <Link to="/">Home</Link>
      </Menu.Item>
      <Menu.Item key="/aboutus">
        <Link to="/aboutus">About Us</Link>
      </Menu.Item>
      <Menu.Item key="/event">
        <Link to="/event">Event</Link>
      </Menu.Item>
      <Menu.Item key="/gallery">
        <Link to="/gallery">Gallery</Link>
      </Menu.Item>
    </Menu>
  );
};

export default Navbar;
