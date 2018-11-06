import React, { Component } from "react";
import NavBar from "./components/navbar";
import { Container, Row, Col, Button, Table } from "reactstrap";
import InputModal from "./components/inputModal";
import "./styles/app.css";
// import Counters from "./components/counters";
// import SideBar from "./components/sidebar";

class App extends Component {
  state = {
    products: [
      //Setting default dummy data
      { id: 1, name: "iPhone 5", category: "Electronics", price: 250 },
      { id: 2, name: "Fork", category: "Garden", price: 100 }
    ],
    inputs: [
      //Setting the inputs for the modal
      {
        name: "name",
        title: "Product name",
        type: "text",
        placeholder: "Name of product here"
      },
      {
        name: "category",
        title: "Category",
        type: "select",
        placeholder: "Category",
        options: [
          { value: "0", name: " " },
          { value: "1", name: "Electronics" },
          { value: "2", name: "Garden" }
        ]
      },
      { name: "price", title: "Set price", type: "number" }
    ],
    //Setting modal title and status
    modalOpen: false,
    modalTitle: "Add a new product",
    //Setting Edit item status
    editItem: {},
    editOpen: false,
    editID: ""
  };

  //On editing the product
  editProduct = sentValues => {
    let { products } = this.state;
    let categoryName;
    products = products.map(product => {
      sentValues.inputValues.map(input => {
        if (product.id === this.state.editID && input.inputValue !== "") {
          //Checks if input is a select input, if yes search for input name
          if (input.inputType === "select-one") {
            let categories;
            //Get all the categories
            categories = this.state.inputs.filter(
              category => category.type === "select"
            );
            //Search for input that has the same value and get it's name
            categories = categories[0];
            categoryName = categories.options.filter(
              category => category.value === input.inputValue
            );

            categoryName = categoryName[0].name;
            product[input.inputName] = categoryName;
          } else {
            //Else give direct value
            product[input.inputName] = input.inputValue;
          }
        }
        return product;
      });
      return product;
    });
    this.setState({ products });
    this.setState({ editOpen: false });
    this.toggleModal();
  };

  //On adding a new product
  addProduct = sentValues => {
    let newProduct = {};
    let categoryName;
    newProduct = sentValues.inputValues.map(input => {
      //Checks if input is a select input, if yes search for input name
      if (input.inputType === "select-one") {
        let categories;
        //Get all the categories
        categories = this.state.inputs.filter(
          category => category.type === "select"
        );
        //Search for input that has the same value and get it's name
        categories = categories[0];
        categoryName = categories.options.filter(
          category => category.value === input.inputValue
        );

        categoryName = categoryName[0].name;
        newProduct[input.inputName] = categoryName;
      } else {
        //Else give direct value
        newProduct[input.inputName] = input.inputValue;
      }
      return newProduct;
    });

    newProduct = newProduct[0]; //Get rid of multiple returned objects by mapping
    newProduct["id"] = this.state.products.length + 1; //Update the ID
    this.setState(previousState => ({
      //Update the state
      products: [...previousState.products, newProduct]
    }));
  };

  //Handle delete event (filters items)
  handleDelete = event => {
    const id = parseInt(event.target.value);
    const products = this.state.products.filter(product => product.id !== id);
    this.setState({ products });
  };

  //Handle on click event
  handleEdit = event => {
    const id = parseInt(event.target.value);
    let product = this.state.products.filter(product => product.id === id);
    product = product[0];
    this.setState({ editItem: product, editOpen: true });
    this.setState({ editID: id });
    this.toggleModal();
  };

  //Toggles the modal
  toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen
    });
  };

  render() {
    return (
      <React.Fragment>
        <NavBar />

        <Container>
          <Row>
            <Col className="main-col">
              <h1 className="text-center page-title">Manage page</h1>
              <Row>
                <Col>
                  <Button
                    className="customAddButton"
                    onClick={this.toggleModal}
                    color="success"
                  >
                    Add
                  </Button>
                  <InputModal
                    modalOpen={this.state.modalOpen}
                    toggle={this.toggleModal}
                    inputs={this.state.inputs}
                    title={this.state.modalTitle}
                    onSubmit={event => this.addProduct(event)}
                    editItem={this.state.editItem}
                    editOpen={this.state.editOpen}
                    editID={this.state.editID}
                    onEdit={event => this.editProduct(event)}
                  />
                  <hr />
                  <Row>
                    <Col>
                      <Table>
                        <thead>
                          <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Actions</th>
                          </tr>
                        </thead>
                        <tbody>
                          {this.state.products.map(product => (
                            <tr key={product.id}>
                              <td>{product.id}</td>
                              <td>{product.name}</td>
                              <td>{product.category}</td>
                              <td>{product.price}</td>
                              <td>
                                <Button
                                  className="customEditButton"
                                  color="info"
                                  value={product.id}
                                  onClick={evt => this.handleEdit(evt)}
                                >
                                  Edit
                                </Button>{" "}
                                <Button
                                  onClick={evt => this.handleDelete(evt)}
                                  className="customDeleteButton"
                                  color="danger"
                                  value={product.id}
                                >
                                  Delete
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </React.Fragment>
    );
  }
}

export default App;
