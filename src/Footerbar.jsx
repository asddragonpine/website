import React from "react";
import { Layout } from "antd";
import { EnvironmentOutlined } from '@ant-design/icons'; // Importa l'icona


const { Footer } = Layout;

const Footerbar = () => {
  return (
    <Footer style={{ textAlign: "center" }}>
      <div>2025 ASD Dragon Pine</div>
      <div>
        <EnvironmentOutlined style={{ marginRight: "8px" }} />
        Balsega di Piné
      </div>
    </Footer>
  );
};

export default Footerbar;
