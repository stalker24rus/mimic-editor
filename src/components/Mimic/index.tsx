import { connect } from "react-redux";
import { Component } from "../../models/Editor";

import useDrawElement from "../CustomHooks/useDrawElement";
import MimicCanvas from "./MimicCanvas";

function mapStateToProps(store) {
  return {
    elements: store.editorHistory.elements,
  };
}

function mapDispatchToProps() {
  return {};
}

const Mimic = (props) => {
  const elements = props.elements;

  const [DrawFabric] = useDrawElement();

  return (
    <MimicCanvas>
      {elements.length > 0 && (
        <span>
          {elements?.map((element: Component) => {
            return DrawFabric(element);
          })}
        </span>
      )}
    </MimicCanvas>
  );
};

export default connect(mapStateToProps, mapDispatchToProps())(Mimic);
