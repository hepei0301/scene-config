import { Graph } from '@antv/x6';

const ports = {
  groups: {
    right: {
      position: 'right',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#D06269',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
    left: {
      position: 'left',
      attrs: {
        circle: {
          r: 4,
          magnet: true,
          stroke: '#D06269',
          strokeWidth: 1,
          fill: '#fff',
          style: {
            visibility: 'hidden',
          },
        },
      },
    },
  },
  items: [
    {
      group: 'right',
    },
    {
      group: 'bottom',
    },
  ],
};

Graph.registerNode('custom-rect', {
  inherit: 'rect',
  width: 30,
  height: 15,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: { ...ports },
});

Graph.registerNode('custom-polygon', {
  inherit: 'polygon',
  width: 30,
  height: 15,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: { ...ports },
});

Graph.registerNode('custom-circle', {
  inherit: 'circle',
  width: 24,
  height: 24,
  attrs: {
    body: {
      strokeWidth: 1,
    },
  },
  ports: { ...ports },
});

Graph.registerEdge(
  'edge',
  {
    zIndex: 0,
    attrs: {
      line: {
        stroke: '#5F95FF',
        strokeWidth: 1,
        targetMarker: {
          name: 'classic',
          size: 8,
        },
      },
    },
  },
  true
);
