import Block from './block';

function renderDOM(rootSelector: string, component: Block): void {
  const root: HTMLElement | null = document.querySelector(rootSelector);
  if (root) {
    root.innerHTML = '';
    root?.append(component.getContent());
  }
}
export { renderDOM as default };
