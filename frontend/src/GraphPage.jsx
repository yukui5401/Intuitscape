import React, { useCallback, useEffect, useState } from 'react';
import { useLocation } from "react-router-dom";
import ReactFlow, {
  MiniMap,
  Controls,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';



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
            return { id: idCounter.toString(), position: { x: 150 * idCounter, y: 100 }, data: { label: title } };
        }),
        ...explaination.map((explanation) => {
            idCounter++;
            return { id: idCounter.toString(), position: { x: 150 * idCounter, y: 200 }, data: { label: explanation } };
        })
    ];

    const initialEdges = [{ id: 'e1-2', source: '1', target: '2' }];


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);


    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{ width: '90vw', height: '90vh' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            fitView
        >
            <Controls />
            <MiniMap />
        </ReactFlow>
        </div>
    );
}

export default GraphPage;