import Block from './block.ts';

function renderDOM(rootSelector: string, component: Block): void {
  const root: HTMLElement = document.querySelector(rootSelector);
  root.innerHTML = '';
  root.append(component.getContent());
}
export { renderDOM as default };
