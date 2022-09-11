import { Component } from "react";
import ColorContexgt from "../Context/color";
const colors = ["red", "orange", "yellow", "green", "blue", "indigo", "violet"];

class SelectColor extends Component {
  static contextType = ColorContexgt;

  handleSetColor = (color) => {
    this.context.actions.setColor(color);
  };
  handleSetSubcolor = (subcolor) => {
    this.context.actions.setSubcolor(subcolor);
  };

  render() {
    return (
      <div>
        <h2>색상을 선택하시오</h2>
        <div style={{ display: "flex" }}>
          {colors.map((color) => (
            <div
              key={color}
              style={{
                background: color,
                width: "24px",
                height: "24px",
                cursor: "pointer",
              }}
              onClick={() => this.handleSetColor(color)}
              onContextMenu={(e) => {
                e.preventDefault();
                this.handleSetSubcolor(color);
              }}
            />
          ))}
        </div>
        <hr />
      </div>
    );
  }
}

export default SelectColor;
