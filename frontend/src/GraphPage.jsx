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
        { id: '1', position: { x: 200, y: 0 }, data: { label: topic } },
        ...titles.map((title) => {
            idCounter++;
            return { id: idCounter.toString(), position: { x: -300 + 150 * idCounter, y: 300 }, data: { label: title } };
        }),
        ...explaination.map((explanation) => {
            idCounter++;
            return { id: idCounter.toString(), position: { x: -900 + 150 * idCounter, y: 500 }, data: { label: explanation } };
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
    


    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const proOptions = { hideAttribution: true };

    const onConnect = useCallback((params) => setEdges((eds) => addEdge(params, eds)), [setEdges]);

    return (
        <div style={{ width: '90vw', height: '90vh' }}>
        <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            proOptions={proOptions}
            fitView
        >
            <Controls />
            <MiniMap />
        </ReactFlow>
        </div>
    );
}

export default GraphPage;