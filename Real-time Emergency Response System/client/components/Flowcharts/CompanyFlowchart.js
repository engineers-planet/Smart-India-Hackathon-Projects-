import { useState } from 'react';
import ReactFlow from 'react-flow-renderer';
import Link from 'next/link';
const initialNodes = [
  {
    id: '1',
    type: 'input',
    data: {
      label: (
        <Link href="/login">
          <div class="cursor-pointer">
            Register and Login as a Company and provide necessary documents
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
        <Link href="/createJob">
          <div class="cursor-pointer">
            Create a new Job and provide the necessary details
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
        <Link href="/createdJobs">
          <div class="cursor-pointer">
            Review Applications for the posted Jobs
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
