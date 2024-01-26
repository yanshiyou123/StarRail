import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from '../../context/AuthContext';
import Head from "next/head";
import Layout from "../../components/Layout";
import Button from "react-bootstrap/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  
  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setMessage("");

    if (!username || !password) {
      setMessage("Please enter both username and password");
      setIsLoading(false);
      return;
    }

    try {
      const Login = await fetch("http://localhost:5000/api/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password}),
      });
      if (Login.ok) {
        const jsonResponse = await Login.json();
        await login({ username });
        setMessage("Login successful!");
        router.push(jsonResponse.isAdmin ? "/equipment/randomRelic" : "/userStarRail/main");
      } else {
        setMessage(jsonResponse.message || "Login failed!");
      }
    } catch (error) {
      console.error("Error:", error);
      setMessage("Username or Password not correct.");
    } finally {
      setIsLoading(false);
    }
  }

  
  return (
    <Layout>
      <Head>
        <title>Login</title>
      </Head>
      <div>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
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
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </form>
        {message && <p>{message}</p>}
      </div>
    </Layout>
  );
}
