import React from "react";
import { Layout, Typography } from "antd";

import { OptionsTable } from "./OptionsTable";

const { Content } = Layout;
const { Title } = Typography;

function App() {
  return (
    <Layout>
      <Content>
        <Title style={{ paddingLeft: 16 }}>
          Options strategy risk & reward analysis
        </Title>
        <OptionsTable />
      </Content>
    </Layout>
  );
}

export default App;
