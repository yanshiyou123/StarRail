import React from "react";
import Head from "next/head";
import Layout from "../../components/Layout";
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
export default function login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <h2>Login</h2>
        <form>
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <Button type="button" >
            Login
          </Button>
        </form>
      </div>
    </Layout>
  );
}
