import React from "react";

//extracting passed value from parent inside object props
const ListGroup = ({
  items,
  onItemSelect,
  selectedItem,
  textProperty,
  valueProperty
}) => {
  return (
    <ul className="list-group">
      {items.map(item => (
        <li
          style={{ cursor: "pointer" }}
          onClick={() => onItemSelect(item)}
          key={item[valueProperty]}
          className={
            item === selectedItem ? "list-group-item active" : "list-group-item"
          }
        >
          {item[textProperty]}
        </li>
      ))}
    </ul>
  );
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};
export default ListGroup;
