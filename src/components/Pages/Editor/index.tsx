import React from "react";
import { connect } from "react-redux";
import "./index.css";

function mapStateToProps(store) {
  return {};
}

function mapDispatchToProps() {
  return {};
}

function Editor(props) {
  return (
    <div>
      TEST
      {/* <MimicCanvas /> */}
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps())(Editor);
