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
            Register as User with required details and documents. Verify by
            email
          </div>
        </Link>
      ),
    },
    position: { x: 290, y: 25 },
  },

  {
    id: '2',
    // type: 'output',
    data: {
      label: (
        <Link href="/login">
          <div class="cursor-pointer">Login as User</div>
        </Link>
      ),
    },
    position: { x: 290, y: 150 },
  },
  {
    id: '3',
    // type: 'output',
    data: {
      label: (
        <Link href="/maps">
          <div class="cursor-pointer">Look for Available Jobs near you</div>
        </Link>
      ),
    },
    position: { x: 450, y: 250 },
  },
  {
    id: '4',
    // type: 'output',
    data: {
      label: (
        <Link href="/jobs">
          <div class="cursor-pointer">Apply for Jobs</div>
        </Link>
      ),
    },
    position: { x: 450, y: 340 },
  },
  {
    id: '5',
    // type: 'output',
    data: {
      label: (
        <Link href="/enrolledJobs">
          <div class="cursor-pointer">Check Status for Jobs Application</div>
        </Link>
      ),
    },
    position: { x: 450, y: 400 },
  },
  {
    id: '6',
    // type: 'output',
    data: {
      label: (
        <Link href="/schemes">
          <div class="cursor-pointer">
            Browse through govt schemes and get recommended schemes
          </div>
        </Link>
      ),
    },
    position: { x: 100, y: 250 },
  },
  {
    id: '7',
    // type: 'output',
    data: {
      label: (
        <Link href="/schemes">
          <div class="cursor-pointer">Apply for schemes</div>
        </Link>
      ),
    },
    position: { x: 100, y: 375 },
  },
  {
    id: '8',
    // type: 'output',
    data: {
      label: (
        <Link href="/enrolledSchemes">
          <div class="cursor-pointer">
            Check status of scheme applications and benefits. Get regular SMS
            notifications
          </div>
        </Link>
      ),
    },
    position: { x: 100, y: 435 },
  },
];

const initialEdges = [
  { id: 'e1-2', source: '1', target: '2' },
  { id: 'e2-3', source: '2', target: '3' },
  { id: 'e3-4', source: '3', target: '4' },
  { id: 'e4-5', source: '4', target: '5' },
  { id: 'e2-6', source: '2', target: '6' },
  { id: 'e6-7', source: '6', target: '7' },
  { id: 'e7-8', source: '7', target: '8' },
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
      style={{ height: 650 }}
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
