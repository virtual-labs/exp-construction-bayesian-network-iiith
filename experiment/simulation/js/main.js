import * as nodejs from "./node.js";
import { wireColours } from "./layout.js";

"use strict";


document.getScroll = function () {
    if (window.pageYOffset != undefined) {
      return [pageXOffset, pageYOffset];
    } else {
      let sx,
        sy,
        d = document,
        r = d.documentElement,
        b = d.body;
      sx = r.scrollLeft || b.scrollLeft || 0;
      sy = r.scrollTop || b.scrollTop || 0;
      return [sx, sy];
    }
};
const workingArea = document.getElementById("working-area");

export const jsPlumbInstance = jsPlumbBrowserUI.newInstance({
    container: workingArea,
    maxConnections: -1,
    endpoint: {
      type: "Dot",
      options: { radius: 6 },
    },
    dragOptions: {
      containment: "parentEnclosed",
      containmentPadding: 5,
    },
    connector: "Flowchart",
    paintStyle: { strokeWidth: 4, stroke: "#888888" },
    connectionsDetachable: false,
});

export const connectNode = function () {
    jsPlumbInstance.bind("beforeDrop", function (data) {
      const fromEndpoint = data.connection.endpoints[0];
      const toEndpoint = data.dropEndpoint;
  
      const start_uuid = fromEndpoint.uuid.split(":")[0];
      const end_uuid = toEndpoint.uuid.split(":")[0];
  
      if (fromEndpoint.elementId === toEndpoint.elementId) {
        return false;
      }
    
        jsPlumbInstance.connect({
          uuids: [fromEndpoint.uuid, toEndpoint.uuid],
          paintStyle: { stroke: wireColours, strokeWidth: 4 },
          overlays: ["Arrow"],
        });
        let input = nodejs.nodes[fromEndpoint.elementId];
        input.isConnected = true;
        nodejs.nodes[toEndpoint.elementId].addParent(input);
        }
      
    );
};

export const unbindEvent = () => {
    jsPlumbInstance.unbind("beforeDrop");
};

export function registerNode(id, node) {
    const element = document.getElementById(id);
    node.addInputPoints(
        jsPlumbInstance.addEndpoint(element, {
          anchor: [0, 0.5, -1, 0, -7, 0],
          source: true,
          target: true,
          connectionsDetachable: false,
          uuid: "input:0:" + id,
        })
      );
      node.addInputPoints(
        jsPlumbInstance.addEndpoint(element, {
          anchor: [0.5, 0.5, 0, 0, 0, -52],
          source: true,
          target: true,
          connectionsDetachable: false,
          uuid: "input:1:" + id,
        })
      );
      node.addInputPoints(
        jsPlumbInstance.addEndpoint(element, {
          anchor: [1, 0.5, 1, 0, 7, 0],
          source: true,
          target: true,
          connectionsDetachable: false,
          uuid: "input:2:" + id,
        })
      );
      node.addInputPoints(
        jsPlumbInstance.addEndpoint(element, {
          anchor: [0.5, 0.5, 0, 0, 0, 52],
          source: true,
          target: true,
          connectionsDetachable: false,
          uuid: "input:3:" + id,
        })
      );
}
  
export function refreshWorkingArea() {
    jsPlumbInstance.reset();
    window.numNodes = 0;
  
    nodejs.clearNodes();    
}
  
  // Initialise Task 1 experiment when the page loads
  window.currentTab = "Domain1";
  connectNode();
  refreshWorkingArea();