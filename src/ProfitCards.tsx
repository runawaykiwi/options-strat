import { Card, Col, Row, Statistic } from "antd";
import { calcProfitLossEvens } from "./calc";
import { OptionLeg } from "./utils";

export const ProfitCards = ({ options }: { options: OptionLeg[] }) => {
    const { maxProfit, maxLoss, breakEvens } = calcProfitLossEvens(options);
  
    return (
      <Row justify="center" gutter={16} style={{ margin: 0 }}>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              title="Max Profit"
              value={maxProfit}
              precision={2}
              valueStyle={{ color: "#3f8600" }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic
              title="Max Loss"
              value={maxLoss}
              precision={2}
              valueStyle={{ color: "#cf1322" }}
            />
          </Card>
        </Col>
        <Col span={4}>
          <Card bordered={false}>
            <Statistic title="Break Even" value={breakEvens.join(", ")} />
          </Card>
        </Col>
      </Row>
    );
  };