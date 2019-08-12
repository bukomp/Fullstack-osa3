import React from "react";

const Numbers = (props) => {


  const tempArr = [];




    if (props.newFilter !== '' && props.newFilter !== undefined && props.newFilter !== null) {
      props.personData.forEach(person => {
        if (person.name.includes(props.newFilter)) tempArr.push(
          <div key={person.name}>
            <div>
              {`${person.name} ${person.number}`}
            </div>
            <button id={person.id} name={"delete"} onClick={props.onDelete}>
              delete
            </button>
          </div>

        );
      })
    } else {
      if(props.personData)props.personData.forEach(person => {
        tempArr.push(
          <div key={person.name}>
            <div>
              {`${person.name} ${person.number}`}
            </div>
            <button id={person.id} name={"delete"} onClick={props.onDelete}>
              delete
            </button>
          </div>
        );
      })
    }

  return(
      tempArr
  );
};

export default Numbers;