import { Link } from "react-router-dom";
import React from "react";

export default function Entery() {
  return (
    <div className="all firstPage">
     <div className="entry"></div>

      <h1>  מנהל מערכת?</h1>
      <h2>   מחפש פתרון טכנולוגי יעיל לניהול העובדים?</h2>
      <h2> workers, האתר שלך לניהול עובדים. </h2>
      <h2>היום כל המנהלים עובדים ככה. </h2>
      <Link className="myLink" to={"/contact"}>
          לפרטים
        </Link >      <h2>כבר יש לך חשבון?</h2>
      <div>
        <Link className="myLink" to={"/login"}>
          להתחברות
        </Link>
      </div>
    </div>
  );
}
