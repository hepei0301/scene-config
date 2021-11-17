import { Graph, Dom } from '@antv/x6';

Graph.registerConnector(
  'link-line',
  (s, t) => {
    const offset = 4;
    const control = 80;
    const v1 = { x: s.x, y: s.y + offset + control };
    const v2 = { x: t.x, y: t.y - offset - control };

    return `M ${s.x} ${s.y}
       L ${s.x} ${s.y + offset}
       C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${t.x} ${t.y - offset}
       L ${t.x} ${t.y}
      `;
  },
  true
);

Graph.registerConnector(
  'algo-edge',
  (source, target) => {
    const offset = 4;
    const control = 80;
    const v1 = { x: source.x, y: source.y + offset + control };
    const v2 = { x: target.x, y: target.y - offset - control };

    return `M ${source.x} ${source.y}
         L ${source.x} ${source.y + offset}
         C ${v1.x} ${v1.y} ${v2.x} ${v2.y} ${target.x} ${target.y - offset}
         L ${target.x} ${target.y}
        `;
  },
  true
);
