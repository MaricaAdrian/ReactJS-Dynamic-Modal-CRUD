## Description

Dynamic CRUD using a modal in ReactJS

## How to run? (Dependencies, Installation)

---

```sh
$ npm install
$ npm install --save reactstrap react react-dom
$ npm i bootstrap@4.1.1
$ npm start
```

---

## Actions

- [Adding a new entry](#add_new_entry)
- [Editing an entry](#edit_entry)
- [Delete an entry](#delete_entry)
- [Add a new input to the modal](#add_new_input)

## `Adding a new entry`

Click on the add button and complete the inputs

## `Editing an entry`

Click on the edit button and edit your inputs

## `Delete an entry`

Click on the delete button to delete an entry

## `Add a new input to the modal`

In order to add a new input to the modal you need to modify the `state` from `App.js`
Go to `App.js` and in the `state` at the array containing the inputs that it's named `inputs` you need to add a new item
Supported attributes are

- name (name of the inputs)
- title (title that will be shown above the input)
- type (type of the input [does not support select multiple])
- placeholder (placeholder text[optional])
- [options]: {[value], [text]} (options attribute must be placed if type attribut is select)

### `Examples`

```
state = {
inputs: [
      {
        name: "employeeName",
        title: "Employee Name",
        type: "text",
        placeholder: "Enter the name of emplyee here"
      },
      {
        name: "employeeStatus",
        title: "Employee Status",
        type: "select",
        placeholder: "Enter your employee status here",
        options: [
          { value: "0", name: " " },
          { value: "1", name: "At work" },
          { value: "2", name: "On vacation" }
          { value: "3", name: "Sick leave" }
        ]
      }
}
```
