import React, { useState, useEffect } from "react";
import Head from "next/head";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Layout from "../../components/Layout";
import Card from "../../components/Cards";
import axios from "axios";

export default function Main() {
  const [cards, setCards] = useState([]);
  

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/characters"
        );
        setCards(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);
  

  return (
    <Layout>
      <Head>
        <title>Main</title>
      </Head>
      <h1>Hi, username. This is the Main page</h1>
      <div className="container">
        <Row>
          {cards.map((card, index) => (
            <Col md={4} key={index}>
              <Card title={card.title} text={card.text} image={card.image} />
            </Col>
          ))}
        </Row>
      </div>
    </Layout>
  );
}
