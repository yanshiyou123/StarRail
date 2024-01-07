import React from "react";

import styles from "../styles/Layout.module.css";
import Navbar from "./Navbar";


export default function layout({ children }) {
  return (
    <div className={styles.container}>
      <Navbar></Navbar>
      {children}
    </div>
  );
}
