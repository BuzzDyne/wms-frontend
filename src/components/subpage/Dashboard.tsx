import React from "react";
import { Button, Typography, Row, Col } from "antd";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const { Title, Paragraph } = Typography;

const Dashboard: React.FC = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setAuth({});
    localStorage.removeItem("auth");
    navigate("/login", { replace: true });
  };

  const handleGoToPicklist = () => {
    navigate("/new-picklist");
  };

  return (
    <>
      <Title level={1} style={{ textAlign: "center", marginTop: "20%" }}>
        Welcome to CartexBlanche Web
      </Title>
      <Paragraph
        style={{ textAlign: "center", fontSize: "16px", marginTop: "16px" }}
      >
        Please select one of the menu from the sidebar.
      </Paragraph>
      <Row justify="center" style={{ marginTop: "64px" }}>
        <Col>
          <Button type="primary" danger onClick={handleLogout}>
            Logout
          </Button>
        </Col>
      </Row>

      {/* <br />
      <br />
      <br />
      <Button type="primary">type="primary"</Button>
      <br />
      <Button>Button</Button>
      <br />
      <Button type="primary" danger>
        type="primary" danger
      </Button>
      <br />
      <Button danger> danger</Button>
      <br />
      <Button className="solid-red">className="solid-red"</Button>
      <br />
      <Button className="solid-green">className="solid-green"</Button>
      <br />
      <Button className="solid-yellow">className="solid-yellow"</Button>
      <br />
      <Button className="solid-blue">className="solid-blue"</Button>
      <br />

      <Button type="default" className="outlined-red">
        Outlined Red
      </Button>
      <br />

      <Button type="default" className="outlined-green">
        Outlined Green
      </Button>
      <br />

      <Button type="default" className="outlined-yellow">
        Outlined Yellow
      </Button>
      <br />

      <Button type="default" className="outlined-blue">
        Outlined Blue
      </Button>
      <br /> */}
    </>
  );
};

export default Dashboard;
