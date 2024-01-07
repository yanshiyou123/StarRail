import React from "react";
import Head from "next/head";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../../components/Layout";
import Card from "../../components/Cards";

export default function Main() {
  return (
    <Layout>
      <Head>
        <title>Main</title>
      </Head>
      <h1>Hi, username, this is the Main page</h1>
      <div className="container">
        <Row>
          <Col md={4}>
            <Card title="阮梅" text="666" image="/images/RuanMei.jpg" />
          </Col>
          <Col md={4}>
            <Card title="银枝" text="666" image="/images/Argenti.jpg" />
          </Col>
          <Col md={4}>
            <Card title="托帕&账账" text="666" image="/images/Topaz.jpg" />
          </Col>
        </Row>
      </div>
    </Layout>
  );
}

