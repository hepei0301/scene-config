declare module '*.css';
declare module '*.less';
declare module '*.png';
declare module '*.svg' {
  export function ReactComponent(props: React.SVGProps<SVGSVGElement>): React.ReactElement;
  const url: string;
  export default url;
}

declare namespace JSX {
  interface IntrinsicAttributes {
    styleName?: string;
  }
}

interface AntTreeNodeProps {
  selectable?: boolean;
}

interface Window {
  VERSION: string;
}
