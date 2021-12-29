import Link from "next/link";
import Image from "next/image";
import styles from "../styles/CheckoutForm.module.css";
import {
  Nav,
  Navbar,
  NavDropdown,
  Container,
  Form,
  FormControl,
  FormGroup,
  InputGroup,
  Button,
  Col,
  Row,
  ControlLabel,
  Card,
} from "react-bootstrap";
import { useState, useEffect } from "react";
import axios from "axios";
import router from "next/router";
import { useCart } from "../context/CartContext";
import { useLanguage } from "../context/LanguageContext";

const domain = process.env.NEXT_PUBLIC_API_DOMAIN_NAME;

const CheckoutForm = () => {
  const { cart, coupon } = useCart();
  const { language } = useLanguage();

  const [first_name, setFirstName] = useState("");
  const [last_name, setLastName] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [card_num, setCardNum] = useState("");
  const [exp_month, setExpMonth] = useState("");
  const [exp_year, setExpYear] = useState("");
  const [cvc, setCvc] = useState("");

  const body = JSON.stringify({
    order: {
      user_first_name: first_name,
      user_last_name: last_name,
      address1,
      address2,
      email,
      phone,
    },
    card_num,
    exp_month,
    exp_year,
    cvc,
  });

  const makePaymentHandler = async () => {
    await makePayment(body, cart.token);
  };

  return cart == null ? (
    <div />
  ) : (
    <Container className={styles.checkoutContainer}>
      <Card className={styles.card}>
        <Card.Header className={styles.card_header}>
          {language == "en" ? "Payment Information" : "Información del Pago"}
        </Card.Header>
        <Card.Body>
          <Container className={styles.orderDetailContainer}>
            <Form className={styles.form}>
              <Row>
                <Col className={styles.col} xs={6}>
                  <InputGroup className={styles.formGroupLeftCol}>
                    {/* <Form.Label className={styles.formLabel}>First Name</Form.Label> */}
                    <FormControl
                      className={styles.formControl}
                      autoFocus
                      placeholder={language == "en" ? "First Name" : "Nombre"}
                      type="text"
                      value={first_name}
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </InputGroup>
                </Col>

                <Col xs={6}>
                  <InputGroup className={styles.formGroupRightCol}>
                    {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
                    <FormControl
                      className={styles.formControl}
                      autoFocus
                      placeholder={language == "en" ? "Last Name" : "Apellido"}
                      type="text"
                      value={last_name}
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <InputGroup className={styles.formGroup}>
                {/* <Form.Label className={styles.formLabel}>Address</Form.Label> */}
                <FormControl
                  className={styles.formControl}
                  autoFocus
                  placeholder={
                    language == "en" ? "Address line 1" : "Dirección linea 1"
                  }
                  type="text"
                  value={address1}
                  onChange={(e) => setAddress1(e.target.value)}
                />
              </InputGroup>

              <InputGroup className={styles.formGroup}>
                {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
                <FormControl
                  className={styles.formControl}
                  autoFocus
                  placeholder={
                    language == "en"
                      ? "Address line 2 (optional)"
                      : "Dirección linea 2 (opcional)"
                  }
                  type="text"
                  value={address2}
                  onChange={(e) => setAddress2(e.target.value)}
                />
              </InputGroup>

              <InputGroup className={styles.formGroup}>
                {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
                <FormControl
                  className={styles.formControl}
                  autoFocus
                  placeholder="Email (optional)"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </InputGroup>

              <InputGroup className={styles.formGroup}>
                {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
                <FormControl
                  className={styles.formControl}
                  autoFocus
                  placeholder={
                    language == "en" ? "Phone Number" : "Número de Telf"
                  }
                  type="text"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </InputGroup>

              <InputGroup className={styles.cardFormGroup}>
                {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
                <FormControl
                  className={styles.formControl}
                  autoFocus
                  placeholder={
                    language == "en" ? "Card Number" : "Número de la Tarjeta"
                  }
                  type="text"
                  value={card_num}
                  onChange={(e) => setCardNum(e.target.value)}
                />
              </InputGroup>

              <Row>
                <Col className={styles.col} xs={6}>
                  <InputGroup className={styles.formGroupLeftCol}>
                    {/* <Form.Label className={styles.formLabel}>First Name</Form.Label> */}
                    <FormControl
                      className={styles.formControl}
                      autoFocus
                      placeholder={
                        language == "en" ? "Exp Month" : "Mes de Exp"
                      }
                      type="text"
                      value={exp_month}
                      onChange={(e) => setExpMonth(e.target.value)}
                    />
                  </InputGroup>
                </Col>

                <Col xs={6}>
                  <InputGroup className={styles.formGroupRightCol}>
                    {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
                    <FormControl
                      className={styles.formControl}
                      autoFocus
                      placeholder={language == "en" ? "Exp Year" : "Año de Exp"}
                      type="text"
                      value={exp_year}
                      onChange={(e) => setExpYear(e.target.value)}
                    />
                  </InputGroup>
                </Col>
              </Row>

              <InputGroup className={styles.formGroup}>
                {/* <Form.Label className={styles.formLabel}>Address (Optional)</Form.Label> */}
                <FormControl
                  className={styles.formControl}
                  autoFocus
                  placeholder="CVC"
                  type="text"
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                />
              </InputGroup>

              <div className={styles.orderNowButtonDiv}>
                <Button
                  onClick={(e) => makePaymentHandler()}
                  className={styles.orderNowButton}
                >
                  {language == "en" ? "MAKE PAYMENT" : "HACER PAGO"}
                </Button>
              </div>
            </Form>
          </Container>
        </Card.Body>
      </Card>
    </Container>
  );
};

const makePayment = async (body, cart_token) => {
  const config = {
    headers: {
      "Content-Type": "application/json",
    },
  };

  const order_url = domain + `store/order/${cart_token}/`;
  axios
    .post(order_url, body, config)
    .then(async (res) => {
      const result = await res.data["Result"];
      if (result === "Success") {
        router.push("/order-made");
      } else {
        console.log("Uppss Something fishy -_-");
      }
    })
    .catch((error) => {
      return "Error";
    });
};

export default CheckoutForm;

