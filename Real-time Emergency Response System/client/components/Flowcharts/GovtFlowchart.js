import { useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import Link from 'next/link';
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <Link href="/governmentLogin">
          <div class="cursor-pointer">
            Login as an admin for a ministry
          </div>
        </Link>
      ),
    },
    position: { x: 20, y: 0 },
  },

  {
    id: '2',
    // type: 'output',
    data: {
      label: (
        <Link href="/createScheme">
          <div class="cursor-pointer">
            Create a new Scheme and provide the necessary details
          </div>
        </Link>
      ),
    },
    position: { x: 0, y: 150 },
  },
  {
    id: '3',
    // type: 'output',
    data: {
      label: (
        <Link href="/createdSchemes">
          <div class="cursor-pointer">
            Review and Approve Applications for the posted Schemes, also manage beneficiaries
          </div>
        </Link>
      ),
    },
    position: { x: 350, y: 200 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
];
const rfStyle = {
  backgroundColor: '#D0C0F7',
};

function Flowchart() {
  const [nodes, setNodes] = useState(initialNodes);
  const [edges, setEdges] = useState(initialEdges);

  return (
    <div
      class="flex h-full w-full justify-center align-items "
      style={{ height: 400 }}
    >
      <ReactFlow
        nodes={nodes}
        edges={edges}
        fitView
        // style={rfStyle}
      />
    </div>
  );
}

export default Flowchart;
