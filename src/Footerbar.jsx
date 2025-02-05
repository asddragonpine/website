import React from "react";
import { Layout } from "antd";
import { EnvironmentOutlined } from '@ant-design/icons'; // Importa l'icona


const { Footer } = Layout;

const Footerbar = () => {
    return (
      <Footer style={{ textAlign: "center" }}>
      © 2025 ASD Dragon Pine | <EnvironmentOutlined style={{ marginRight: "8px" }} />
      Balsega di Piné
    </Footer>
    );
  };

export default Footerbar;
