import React, { useState } from "react";
import { useRouter } from "next/navigation"
import Head from "next/head";
import Link from "next/link";
import Layout from "../../components/Layout";
import Button from "react-bootstrap/Button";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState("");
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
      const register = await fetch('http://localhost:5000/api/users/register', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password}),
      });
      const jsonResponse = await register.json();
      if (register.ok) {
          setMessage("Registration successful!");
          router.push("/starRail/login")
      } else {
          setMessage(jsonResponse.message || "Registration failed!");
      }
    } catch (error) {
      console.error('Error:', error);
      setMessage("An error occurred during registration.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Layout>
      <Head>
        <title>Register</title>
      </Head>
      <div>
        <h1>Register</h1>
        <form onSubmit={handleSubmit}>
          {/* Username input */}
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          <br />
          {/* Password input */}
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          
          <Button type="submit">
            {isLoading ? 'Registering...' : 'Register'}
          </Button>
        </form>

        {message && <p>{message}</p>}

        <p>Already have an account? <Link href="/starRail/login">Login here</Link></p>
        <p>New Employee? <Link href="/starRail/register_admin">Register here</Link></p>
      </div>
    </Layout>
  )
}
