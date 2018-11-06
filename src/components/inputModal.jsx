import React from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  FormGroup,
  Input,
  Label,
  Alert
} from "reactstrap";

class InputModal extends React.Component {
  //Setting the state
  state = { alertOpen: false, editID: "" };
  constructor(props) {
    super(props);
    //Populating the inputs that are going to be shown in the modal
    this.state.inputValues = this.props.inputs.map(input => {
      const keyValue = "";
      const keyType = input.type;
      let newObj = {
        inputName: input.name,
        inputValue: keyValue,
        inputType: keyType
      };
      return newObj;
    });
  }
  //Setting alert to false
  componentDidMount = () => {
    this.setState({ alertOpen: false });
  };

  //On updating the input
  updateStateValue = e => {
    const targetValue = e.target.value;
    const targetName = e.target.name;
    const targetType = e.target.type;
    let { inputValues } = this.state;
    inputValues = inputValues.map(obj => {
      if (obj.inputName === targetName) {
        obj.inputValue = targetValue;
        obj.inputType = targetType;
      }
      return obj;
    });
    this.setState({ inputValues });
  };

  //On click edit button
  handleEdit = () => {
    this.props.onEdit(this.state);
  };

  //On click add product button
  handleClick = () => {
    let { inputValues } = this.state;
    let completed = 1;
    //Checks if there is an empty field
    inputValues = inputValues.map(input => {
      if (input.inputValue === "") {
        completed = 0;
      }
      return input;
    });
    //If yes we show an error
    if (completed === 0) {
      if (!this.state.alertOpen) {
        this.openAlert();
      }
    } else {
      this.props.onSubmit(this.state);
      this.props.toggle();
      inputValues = inputValues.map(input => {
        input.inputValue = "";
        return input;
      });
      this.setState({ inputValues });
    }
  };

  openAlert = () => {
    this.setState({
      alertOpen: !this.state.alertOpen
    });
  };

  render() {
    if (!this.props.modalOpen) {
      return null;
    }

    return (
      <div>
        <Modal isOpen={this.props.modalOpen} className="bg-primary">
          <ModalHeader toggle={this.props.toggle}>
            {this.props.title}
          </ModalHeader>
          <ModalBody>
            <Alert
              toggle={this.openAlert}
              color="danger"
              isOpen={this.state.alertOpen}
            >
              You must complete all fields
            </Alert>
            {this.props.inputs.map(input => (
              <FormGroup key={input.name}>
                <Label for={input.name}>{input.title}</Label>
                {input.type !== "select" ? (
                  this.props.editOpen === true ? (
                    <Input
                      onChange={e => this.updateStateValue(e)}
                      type={input.type}
                      name={input.name}
                      id={input.name}
                      placeholder={
                        input.placeholder && input.placeholder.length > 0
                          ? input.placeholder
                          : "Enter your value here"
                      }
                      defaultValue={
                        this.props.editItem[
                          Object.keys(this.props.editItem).filter(
                            c => c === input.name
                          )
                        ]
                      }
                    />
                  ) : (
                    <Input
                      onChange={e => this.updateStateValue(e)}
                      type={input.type}
                      name={input.name}
                      id={input.name}
                      placeholder={
                        input.placeholder && input.placeholder.length > 0
                          ? input.placeholder
                          : "Enter your value here"
                      }
                    />
                  )
                ) : this.props.editOpen ? (
                  <Input
                    onChange={e => this.updateStateValue(e)}
                    type={input.type}
                    name={input.name}
                    id={input.name}
                    defaultValue={
                      input.options.filter(
                        option =>
                          option.name ===
                          this.props.editItem[
                            Object.keys(this.props.editItem).filter(
                              c => c === input.name
                            )
                          ]
                      )[0].value
                    }
                  >
                    {input.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Input>
                ) : (
                  <Input
                    onChange={e => this.updateStateValue(e)}
                    type={input.type}
                    name={input.name}
                    id={input.name}
                    defaultValue={input.options[0].value}
                  >
                    {input.options.map(option => (
                      <option key={option.value} value={option.value}>
                        {option.name}
                      </option>
                    ))}
                  </Input>
                )}
              </FormGroup>
            ))}
          </ModalBody>
          <ModalFooter>
            {this.props.editOpen === true ? (
              <Button
                className="customEditButton"
                color="success"
                onClick={this.handleEdit}
              >
                Edit product
              </Button>
            ) : (
              <Button
                className="customAddButton"
                color="success"
                onClick={this.handleClick}
              >
                Add product
              </Button>
            )}

            <Button
              className="customDeleteButton"
              color="danger"
              onClick={this.props.toggle}
            >
              Close
            </Button>
          </ModalFooter>
        </Modal>
      </div>
    );
  }
}

export default InputModal;
