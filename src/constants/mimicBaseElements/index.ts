import { BaseElementOutput } from "../../models/Editor";
import {
  ELEMENT_TYPE_BUTTON,
  ELEMENT_TYPE_LINE,
  ELEMENT_TYPE_POLYGON,
  ELEMENT_TYPE_POLYLINE,
} from "../literals";

/**
 * BASE ELEMENT STATES
 */

export const elementsDefaultStates = {
  [ELEMENT_TYPE_BUTTON]: getBaseParamOfButton(),
  [ELEMENT_TYPE_LINE]: getBaseParamOfLine(),
  [ELEMENT_TYPE_POLYLINE]: getBaseParamOfPolyLine(),
  [ELEMENT_TYPE_POLYGON]: getBaseParamOfPolygon(),
};

/**
 * It return basic states for a Button element.
 * @returns BaseElementOutput
 */
export function getBaseParamOfButton(): BaseElementOutput {
  return {
    attributes: {
      appearance: {
        fill: "rgba(59,130,246, 1)",
        stroke: "rgba(59,130,246, 1)",
        textColor: "rgba(255,255,255, 1)",
        strokeWidth: 1,
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
        fontSize: 14,
        fontStyle: "normal",
        fontWeight: "normal",
        horizonAlign: "center",
      },

      action: {
        operation: "none",
        handler: undefined,
      },
      events: {
        click: "", //alert("Test handler"); console.log(event);
        pointermove: "",
        pointerup: "",
        pointerdown: "",
      },
      //FIXME remove after
      scripts: `
        function click(event) {
          alert("HI " + 132);
        }
      `,
    },
    //service: { pointsAmount: 1 },
  };
}

/**
 * It return basic states for a Line element.
 * @returns BaseElementOutput
 */
export function getBaseParamOfLine(): BaseElementOutput {
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
      },
      animation: [],
    },
    //service: { pointsAmount: 2 },
  };
}

/**
 * It return basic states for a Poly line element.
 * @returns BaseElementOutput
 */
export function getBaseParamOfPolyLine(): BaseElementOutput {
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
      },
      animation: [],
    },
    //service: { pointsAmount: 999 },
  };
}

/**
 * It return basic states for a Polygon element.
 * @returns BaseElementOutput
 */
export function getBaseParamOfPolygon(): BaseElementOutput {
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
      },
      animation: [],
    },
    //service: { pointsAmount: 999 },
  };
}

// `
//       class Rectangle {
//         constructor(height, width) {
//           this.height = height;
//           this.width = width;
//         }
//       }

//         function click(event) {
//           alert("HI " + 1 + 2);
//         }

//         function pointerdown(event) {
//           //alert(2 + 2);
//         }

//         function pointermove(event) {
//           //alert(3 + 2);
//         }

//         function pointerup(event) {
//           //alert(4 + 2);
//         }
//       `,
