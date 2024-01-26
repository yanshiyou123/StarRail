import React from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import logo from "../public/images/starRail.jpg";
import styles from "../styles/Navbar.module.css";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isLoggedIn, logout } = useAuth();
  const router = useRouter();

  const navigateTo = (path) => {
    router.push(path);
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.logo} onClick={() => navigateTo("/")}>
        <Image src={logo} alt="Logo" className={styles.logoImage} />
        <p>崩坏：星穹铁道</p>
      </div>
      <ul className={styles.navLinks}>
        {isLoggedIn ? (
          <>
            <li onClick={() => navigateTo("/userStarRail/profile")}>Profile</li>
            <li onClick={logout}>Logout</li>
          </>
        ) : (
          <>
            <li onClick={() => navigateTo("/starRail/login")}>Login</li>
            <li onClick={() => navigateTo("/starRail/register")}>Sign Up</li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
