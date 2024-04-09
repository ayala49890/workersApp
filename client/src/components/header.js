import * as React from "react";
import { Link } from "react-router-dom";

export default function Header() {
  return (
    <>
      <div className="header"></div>
      <div className="menu">
        <Link className="headLink" to="/workers">
          עובדים
        </Link>
        <Link className="headLink" to="/addWorker">
          הוספת עובד
        </Link>
        <Link className="headLink" to="/roles">
          תפקידים
        </Link>
        <Link className="headLink" to="/addRole">
          הוספת תפקיד
        </Link>
        <Link className="headLink" to="/home">
          דף הבית
        </Link>
      </div>
    </>
  );
}
