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
    const { topic } = { topic: location.state.topic } || {topic: "",};
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


    const initialNodes = titles.map((title, index) => {
        console.log(index)
        console.log(title);
        return { id: index.toString(), position: { x: 300 * index, y: 100 }, data: { label: title } };
    });

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