const TurboType = {
  SEQUENCE_FLOW: 1,
  START_EVENT: 2,
  END_EVENT: 3,
  USER_TASK: 4,
  SERVICE_TASK: 5,
  EXCLUSIVE_GATEWAY: 6,
};

function convertFlowElementToEdge(element: Recordable) {
  const { incoming, outgoing, properties, key } = element;
  const { text, startPoint, endPoint, pointsList, logicFlowType } = properties;
  const edge: Recordable = {
    id: key,
    type: logicFlowType,
    sourceNodeId: incoming[0],
    targetNodeId: outgoing[0],
    text,
    startPoint,
    endPoint,
    pointsList,
    properties: {},
  };
  const excludeProperties = ['startPoint', 'endPoint', 'pointsList', 'text', 'logicFlowType'];
  Object.keys(element.properties).forEach(property => {
    if (excludeProperties.indexOf(property) === -1) {
      edge.properties[property] = element.properties[property];
    }
  });
  return edge;
}

function convertFlowElementToNode(element: Recordable) {
  const { properties, key } = element;
  const { x, y, text, logicFlowType } = properties;
  const node: Recordable = {
    id: key,
    type: logicFlowType,
    x,
    y,
    text,
    properties: {},
  };
  const excludeProperties = ['x', 'y', 'text', 'logicFlowType'];
  Object.keys(element.properties).forEach(property => {
    if (excludeProperties.indexOf(property) === -1) {
      node.properties[property] = element.properties[property];
    }
  });
  return node;
}

export function toLogicFlowData(data: Recordable) {
  const lfData: {
    // TODO type
    nodes: any[];
    edges: any[];
  } = {
    nodes: [],
    edges: [],
  };
  const list = data.flowElementList;
  list &&
    list.length > 0 &&
    list.forEach((element: Recordable) => {
      if (element.type === TurboType.SEQUENCE_FLOW) {
        const edge = convertFlowElementToEdge(element);
        lfData.edges.push(edge);
      } else {
        const node = convertFlowElementToNode(element);
        lfData.nodes.push(node);
      }
    });
  return lfData;
}
