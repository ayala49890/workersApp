import React from "react";
import { Link } from "react-router-dom";
import Header from "./header";

export default function Home() {
  return (
    <>
      <Header />

      <div className="home" style={{ textAlign: "center", paddingTop: "50px" }}>
        <h2
          style={{
            fontSize: "2.5rem",
            fontWeight: "bold",
            marginBottom: "30px",
            background: "linear-gradient(to right, #4a69bd, #3b5998, #192f6a)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          מערכת חכמה לניהול עובדים
        </h2>
        <p
          style={{
            fontSize: "1.2rem",
            maxWidth: "800px",
            margin: "0 auto",
            marginBottom: "30px",
          }}
        >
          ברוך הבא למערכת הניהול החכמה שלנו. כאן תוכל לנהל את רשימת העובדים שלך,
          לערוך אותם, להוסיף עובדים חדשים ולנהל את תפקידיהם.
        </p>
      </div>
    </>
  );
}
