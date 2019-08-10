import React from "react";

const NewPerson = (props) => {
  return (
    <form
      onSubmit={props.handleSubmit}
    >
      <div>
        name:
        <input
          name={props.nameName}
          value={props.nameValue}
          onChange={props.nameOnChange}
        />
      </div>
      <div>number:
        <input
          name={props.numName}
          value={props.numValue}
          onChange={props.numOnChange}
        /></div>
      <div>
        <button type="submit" >add</button>
      </div>
    </form>
  );
}

export default NewPerson;