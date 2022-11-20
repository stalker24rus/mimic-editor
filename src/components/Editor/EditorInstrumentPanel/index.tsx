import { connect } from "react-redux";

import { setCreateMode } from "../../store/modules/mimic";
import {
  ButtonComponent,
  LineComponent,
  PolygonElement,
  PolyLineElement,
} from "../BaseMimicComponents";

type InstrumentPanelProps = {
  setCreateMode: Function;
};

function InstrumentPanel(props: any) {
  const { setCreateMode }: InstrumentPanelProps = props;

  const handleAddButton = () => {
    const { attributes, service } = getBaseParamOfButton();
    setCreateMode(ButtonComponent, attributes, service);
  };

  const handleAddLine = () => {
    const { attributes, service } = getBaseParamOfLine();
    setCreateMode(LineComponent, attributes, service);
  };

  const handleAddPolyline = () => {
    const { attributes, service } = getBaseParamOfPolyLine();
    setCreateMode(PolyLineElement, attributes, service);
  };

  const handleAddPolygone = () => {
    const { attributes, service } = getBaseParamOfPolygon();
    setCreateMode(PolygonElement, attributes, service);
  };

  return (
    <div className="bg-gradient-to-r from-gray-900 to-gray-50">
      <div className="inline-flex" id="Component" style={{ top: 0, left: 0 }}>
        <div className="text-1xl text-center font-small text-gray-900 dark:text-white bg-gray-800 align-middle m-2">
          REACT_SCADA
        </div>
        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddButton}
        >
          Кнопка
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddLine}
        >
          Линия
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddPolyline}
        >
          Поли линия
        </button>

        <button
          className="hover:bg-blue-400 group flex items-center rounded-md bg-blue-500 text-white text-sm font-medium pl-2 pr-3 py-2 shadow-sm"
          onClick={handleAddPolygone}
        >
          Полигон
        </button>
      </div>
    </div>
  );
}

InstrumentPanel.defaultProps = {
  onAddComponent: () => {},
};

function mapStateToProps() {
  return {};
}

function mapDispatchToProps() {
  return {
    setCreateMode: setCreateMode,
  };
}

export default connect(mapStateToProps, mapDispatchToProps())(InstrumentPanel);

/**
 * It return basic states for a Button element.
 * @returns BaseElementOutput
 */
function getBaseParamOfButton(): BaseElementOutput {
  return {
    attributes: {
      appearance: {
        fill: "#B8A5A1",
        opacity: 1,
        visability: true,
      },

      properties: {
        text: "Кнопка",
      },

      position: {
        points: [],
        angle: 0,
        width: 150,
        height: 50,
      },

      font: {
        fontFamily: "Arial",
        fontSize: 12,
        fontStyle: "normal",
        fontWeight: "normal",
        horizonAlign: "middle",
      },

      action: {
        operation: "none",
        handler: undefined,
      },
    },
    service: { pointsAmount: 1 },
  };
}

/**
 * It return basic states for a Line element.
 * @returns BaseElementOutput
 */
function getBaseParamOfLine(): BaseElementOutput {
  return {
    attributes: {
      appearance: {
        stroke: "rgb(255, 0, 0)",
        strokeWidth: 5,
        opacity: 1,
      },
      properties: {},
      position: {
        points: [],
        angle: 0,
        width: 150,
        height: 50,
      },
      animation: [],
    },
    service: { pointsAmount: 2 },
  };
}

/**
 * It return basic states for a Poly line element.
 * @returns BaseElementOutput
 */
function getBaseParamOfPolyLine(): BaseElementOutput {
  return {
    attributes: {
      appearance: {
        stroke: "rgb(255, 0, 0)",
        strokeWidth: 5,
        opacity: 1,
      },
      properties: {},
      position: {
        points: [],
        angle: 0,
        width: 150,
        height: 50,
      },
      animation: [],
    },
    service: { pointsAmount: 999 },
  };
}

/**
 * It return basic states for a Polygon element.
 * @returns BaseElementOutput
 */
function getBaseParamOfPolygon(): BaseElementOutput {
  return {
    attributes: {
      appearance: {
        stroke: "rgb(255, 0, 0)",
        strokeWidth: 5,
        fill: "#B8A5A1",
        opacity: 1,
      },
      properties: {},
      position: {
        points: [],
        angle: 0,
        width: 150,
        height: 50,
      },
      animation: [],
    },
    service: { pointsAmount: 999 },
  };
}
