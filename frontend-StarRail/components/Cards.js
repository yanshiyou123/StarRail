import React from "react";
import { Card as BootstrapCard } from 'react-bootstrap';
import styles from '../styles/Cards.module.css';

const Card = ({ title, text, image }) => {
  return (
    <BootstrapCard className={styles.card}>
      <BootstrapCard.Img variant="top" src={image} className={styles.cardImgTop} />
      <BootstrapCard.Body>
        <BootstrapCard.Title className={styles.cardTitle}>{title}</BootstrapCard.Title>
        <BootstrapCard.Text className={styles.cardText}>{text}</BootstrapCard.Text>
      </BootstrapCard.Body>
    </BootstrapCard>
  );
};

export default Card;



