import React from "react";
import { useForm } from "react-hook-form";
import { Button, Form } from "semantic-ui-react";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useNavigate } from "react-router-dom";
import Header from "../header";

const Login = () => {
  const navigate = useNavigate();

  const onSubmit = () => {
    navigate(`/home`);
  };

  const schema = yup
    .object({
      Username: yup.string().required("שדה חובה"),
      Password: yup
        .string()
        .matches(/^[0-9]{4}$/, "סיסמא חייבת להכיל 4 ספרות")
        .required("שדה חובה"),
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      Username: "manager",
      Password: "1234",
    },
  });

  return (
    <>
      <div className="entry "></div>
      <div className="form" >
        <Form onSubmit={handleSubmit(onSubmit)}>
          <input
            className="inp"
            type="text"
            {...register("Username")}
            placeholder="הכנס שם"
          />
          {errors.Username && <p>{errors.Username.message}</p>}
          <br />
          <input
            className="inp"
            type="password"
            {...register("Password")}
            placeholder="הכנס סיסמא"
          />
          {errors.Password && <p>{errors.Password.message}</p>}

          <br />
          <br />
          <Button size="large" type="submit" className="but enter ">
            כניסה
          </Button>
        </Form>
      </div>
    </>
  );
};

export default Login;
