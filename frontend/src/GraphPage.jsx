import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import ReactFlow, {
  addEdge,
  ConnectionLineType,
  Panel,
  useNodesState,
  useEdgesState,
} from 'reactflow';
import dagre from 'dagre';

import 'reactflow/dist/style.css';

const dagreGraph = new dagre.graphlib.Graph();
dagreGraph.setDefaultEdgeLabel(() => ({}));

const nodeWidth = 172;
const nodeHeight = 36;

const getLayoutedElements = (nodes, edges, direction = 'TB') => {
  const isHorizontal = direction === 'LR';
  dagreGraph.setGraph({ rankdir: direction });

  nodes.forEach((node) => {
    dagreGraph.setNode(node.id, { width: nodeWidth, height: nodeHeight });
  });

  edges.forEach((edge) => {
    dagreGraph.setEdge(edge.source, edge.target);
  });

  dagre.layout(dagreGraph);

  nodes.forEach((node) => {
    const nodeWithPosition = dagreGraph.node(node.id);
    node.targetPosition = isHorizontal ? 'left' : 'top';
    node.sourcePosition = isHorizontal ? 'right' : 'bottom';

    // We are shifting the dagre node position (anchor=center center) to the top left
    // so it matches the React Flow node anchor point (top left).
    node.position = {
      x: nodeWithPosition.x - nodeWidth / 2,
      y: nodeWithPosition.y - nodeHeight / 2,
    };

    return node;
  });

  return { nodes, edges };
};


const GraphPage = () => {
  const location = useLocation();
    const topic = location.state?.topic || "Placeholder Topic";
    const { educationLevel } = { educationLevel: location.state.educationLevel } || { educationLevel: "" };
    const { focus } = { focus: location.state.focus } || { focus: "" };
    const { levelOfDetail } = { levelOfDetail: location.state.levelOfDetail } || { levelOfDetail: "" };

    const [titles, setTitles] = useState([1, 2, 3, 4]);
    const [explaination, setExplanation] = useState(["test1", "test2", "test3", "test4"]);
    // useEffect(() => {
    //     axios
    //        .post("http://localhost:5173/create_presentation}", {
    //             topic: topic,
    //             educationLevel: educationLevel,
    //             focus: focus,
    //             levelOfDetail: levelOfDetail,
    //         })
    //        .then((response) => {
    //             console.log(response);
    //             setTitle(response.content.title);
    //             setExplanation(response.content.explanation);
    //         })
    //        .catch((error) => {
    //             console.error("Error: ", error);
    //         });
    // }, []);
    let idCounter = 1;
    const initialNodes = [
      { id: '1', position: { x: 0, y: 0 }, data: { label: topic } },
      ...titles.map((title) => {
          idCounter++;
          return { id: idCounter.toString(), position: { x: 0, y: 0 }, data: { label: title } };
      }),
      ...explaination.map((explanation) => {
          idCounter++;
          return { id: idCounter.toString(), position: { x: 0, y: 0 }, data: { label: explanation } };
      })
  ];

  const initialEdges = [
      ...titles.map((title, index) => ({
          id: `e1-e${index + 1}`,
          source: '1',
          target: (index + 2).toString(),
      })),
      ...explaination.map((explanation, index) => ({
          id: `e${index + 1}-e${index + titles.length + 1}`,
          source: (index + 1).toString(),
          target: (index + titles.length + 1).toString(),
      })),
      {
          id: `e${titles.length + 1}-e${titles.length + explaination.length + 1}`,
          source: (titles.length + 1).toString(),
          target: (titles.length + explaination.length + 1).toString(),
      },
  ];

  const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
    initialNodes,
    initialEdges
  );
  const [nodes, setNodes, onNodesChange] = useNodesState(layoutedNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(layoutedEdges);

  const onConnect = useCallback(
    (params) =>
      setEdges((eds) =>
        addEdge({ ...params, type: ConnectionLineType.SmoothStep, animated: true }, eds)
      ),
    []
  );
  const onLayout = useCallback(
    (direction) => {
      const { nodes: layoutedNodes, edges: layoutedEdges } = getLayoutedElements(
        nodes,
        edges,
        direction
      );

      setNodes([...layoutedNodes]);
      setEdges([...layoutedEdges]);
    },
    [nodes, edges]
  );

  return (
    <div style={{ width: '95.5vw', height: '90vh'}}>
      {<ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        connectionLineType={ConnectionLineType.SmoothStep}
        fitView
      >
        <Panel position="top-right">
          <button onClick={() => onLayout('TB')}>vertical layout</button>
          <button onClick={() => onLayout('LR')}>horizontal layout</button>
        </Panel>
      </ReactFlow>}
    </div>
  );
};

export default GraphPage;

