import React, { useState } from "react";

import {
  Button,
  Card,
  Col,
  Row,
  Container,
  Form,
  Spinner,
} from "react-bootstrap";
import { useFormik } from "formik";
import * as Yup from "yup";
import { login, requestToken } from "../api/api-service";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const initialValues = {
    username: "",
    password: "",
  };
  const validationSchema = Yup.object({
    username: Yup.string().required("Please enter your user name"),
    password: Yup.string()
      .required("Please enter your password (min 6 char)")
      .min(6),
  });
  const onSubmit = (values) => {
    setLoading(true);
    requestToken().then((respToken) => {
      values["request_token"] = `${respToken.data.request_token}`;
      // api service de olusturdugumuz token ı alan metodu cagirdik
      // o aldigimiz token ı values objemizin icine bir field(request_token)
      // olusturarak kaydettik
      console.log(values);
      login(values)
        .then((resp) => {
          localStorage.setItem("token", resp.data.request_token);
          // localStorage.setItem ile backend e values degerlerimizle
          // birlikte (resp.data.request_token) token ı gönderiyoruz
          setLoading(false);
          console.log("basarili");
          navigate("/movies");
        })
        .catch((err) => {
          console.log(err.response.data.status_message);
          //eger login olamazsa status mesajını error olarak dondurecek
          setLoading(false);
        });
    });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });

  return (
    <Container className="mt-5">
      <Row>
        <Col>
          <Card>
            <Card.Body>
              <Form noValidate onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>User Name</Form.Label>
                  <Form.Control
                    type="text"
                    autoFocus="autofocus"
                    {...formik.getFieldProps("username")}
                    isInvalid={!!formik.errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    {...formik.getFieldProps("password")}
                    isInvalid={!!formik.errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <Button variant="primary" type="submit" disabled={loading}>
                    {/* loading true oldugunda buton disabled olsun */}
                    {loading && <Spinner animation="border" size="sm" />} Login
                    {/* loding true oldugunda Spinner ı göster */}
                  </Button>
                </div>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default LoginPage;