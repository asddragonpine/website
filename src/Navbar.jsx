// src/Navbar.jsx
import React, { useState, useEffect } from "react";
import { Menu, Drawer, Button } from "antd";
import { MenuOutlined } from '@ant-design/icons';
import { Link, useLocation } from "react-router-dom";
import "./navbar.css";

const Navbar = () => {
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState(location.pathname);
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Colore arancione per il tema
  const orangeColor = '#ff6347';

  useEffect(() => {
    console.log("HashRouter pathname:", location.pathname);
    setSelectedKey(location.pathname);
  }, [location.pathname]);

  // Gestione responsive
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Definisci gli elementi del menu come array di oggetti - senza stili inline
  const menuItems = [
    {
      key: '/',
      label: <Link to="/">Home</Link>,
    },
    {
      key: '/aboutus',
      label: <Link to="/aboutus">About Us</Link>,
    },
    {
      key: '/event',
      label: <Link to="/event">Event</Link>,
    },
    {
      key: '/gallery',
      label: <Link to="/gallery">Gallery</Link>,
    },
    // {
    //   key: '/fantadragonboat',
    //   label: <Link to="/fantadragonboat">FantaDragonBoat</Link>,
    // },
  ];

  const showDrawer = () => {
    setDrawerVisible(true);
  };

  const onDrawerClose = () => {
    setDrawerVisible(false);
  };

  // Handler per la chiusura del menu quando si fa clic su un elemento
  const handleMenuClick = ({ key }) => {
    if (isMobile) {
      setDrawerVisible(false);
    }
  };

  // Menu per la versione mobile (drawer)
  const MobileMenu = () => (
    <>
      <Button 
        type="text" 
        icon={<MenuOutlined />} 
        onClick={showDrawer}
        style={{ 
          color: 'white', 
          fontSize: '20px', 
          position: 'fixed',
          top: 0,
          right: 10,
          height: '50px',
          zIndex: 101
        }}
      />
      
      <Drawer
        title="Menu"
        placement="right"
        closable={true}
        onClose={onDrawerClose}
        open={drawerVisible}
        styles={{ body: { padding: 0 } }}
        width={250}
        className="menu-drawer"
      >
        <Menu
          mode="vertical"
          selectedKeys={[selectedKey]}
          onClick={handleMenuClick}
          style={{ borderRight: 0 }}
          items={menuItems}
          theme="dark"
          className="mobile-menu"
        />
      </Drawer>
    </>
  );

  // Menu standard per desktop
  const DesktopMenu = () => (
    <Menu
      theme="dark"
      mode="horizontal"
      selectedKeys={[selectedKey]}
      items={menuItems}
      onClick={handleMenuClick}
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
      }}
      className="desktop-menu"
    />
  );

  return (
    <>
      {isMobile ? <MobileMenu /> : <DesktopMenu />}
      
      {/* Se in modalità mobile, aggiungi uno spazio fittizio per compensare la navbar fissa */}
      {isMobile && (
        <div style={{ 
          height: '50px', 
          width: '100%',
          background: "linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0))",
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 99
        }} />
      )}
    </>
  );
};

export default Navbar;