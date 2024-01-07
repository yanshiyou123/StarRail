import React from "react";
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Button from 'react-bootstrap/Button';
import {useState} from 'react';
export default function register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <h1>Register</h1>
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
          <Button type="button">
            Register
          </Button>
        </form>

        <p>Already have an account? <Link href="/starRail/login">Login here</Link></p>
      </div>
    </Layout>
  );
}
