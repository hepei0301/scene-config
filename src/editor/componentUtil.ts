import type {
  ComponentOptions,
  ComponentEditableData,
  ComponentData,
  CompositeData,
} from 'src/editor/type';
import NotFound from './NotFound';

const componentMap = new Map<string, ComponentOptions>();

export function registerComponent(type: string, options: ComponentOptions) {
  componentMap.set(type, options);
}

export function isValidComponent(type: string) {
  return componentMap.has(type);
}

export function getComponent(type: string) {
  return (
    componentMap.get(type) ||
    ({
      component: NotFound,
      defaultData: { type },
      defaultSize: { width: 200, height: 40 },
    } as ComponentOptions)
  );
}
