import React from "react";
import {
  Badge,
  Button,
  Container,
  Dropdown,
  FormControl,
  Nav,
  Navbar,
} from "react-bootstrap";
import "../App.css";
import { FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CartState } from "../context/Context";
import { AiFillDelete } from "react-icons/ai";
import "./style.css";
function Header() {
  const {
    state: { cart },
    dispatch,productDispatch
  } = CartState();
  return (
    <Navbar bg="dark" variant="dark" style={{ height: 75 }}>
      <Container>
        <Navbar.Brand>
          <Link to="/">Shoping cart</Link>
        </Navbar.Brand>
        <Navbar.Text className="search">
          <FormControl
            style={{ width: 500 }}
            placeholder="search product"
            className="m-auto"
            onChange={(e)=>productDispatch({type:"FILTER_BY_SEARCH", payload:e.target.value})}
          />
        </Navbar.Text>
        <Nav>
          <Dropdown >
            <Dropdown.Toggle variant="success">
              <FaShoppingCart color="white" fontSize="25px" />
              <Badge style={{ marginLeft: "5px" }}>{cart.length}</Badge>
            </Dropdown.Toggle>

            <Dropdown.Menu
              
              style={{ minWidth: 370, right: 0, left: "auto" }}
            >
              {cart.length > 0 ? (
                <>
                  {cart.map((prod) => (
                    <span className="cartitem" key={prod.id}>
                      <img
                        src={prod.image}
                        alt={prod.name}
                        className="cartItemImg"
                      />
                      <div className="cartItemDetail">
                        <span>{prod.name}</span>
                        <span>{prod.price}</span>
                      </div>
                      <AiFillDelete
                        fontSize="20px"
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                          dispatch({ type: "REMOVE_FROM_CART", payload: prod })
                        }
                      />
                    </span>
                   
                  ))}
                  <Link to="/cart">
                    <Button style={{width:"95%", margin:"0 10px"}}>Go to cart </Button>
                   </Link>
                </>
              ) : (
                <span style={{ padding: 10 }}>cart is empty</span>
              )}
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>
    </Navbar>
  );
}

export default Header;
