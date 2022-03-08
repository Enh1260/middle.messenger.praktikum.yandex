import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus.ts';

class Block {
  static EVENTS = {
    INIT: 'init',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  constructor(propsAndChildren = {}) {
    const { children, props } = this.__getChildren(propsAndChildren);
    const eventBus = new EventBus();

    this.__id = makeUUID();
    this.children = children;

    this.props = this.__makePropsProxy({ ...props, __id: this.__id });
    this.initChildren();

    this.eventBus = () => eventBus;

    this.__registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
    eventBus.emit(Block.EVENTS.FLOW_CDM);
    eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  private __registerEvents(eventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this.__componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this.__componentDidUpdate.bind(this));
    eventBus.on(Block.EVENTS.FLOW_RENDER, this.__render.bind(this));
  }

  private init():void {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  protected initChildren(): void {
    return true;
  }

  private __componentDidMount():void {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          ch.dispatchComponentDidMount();
        });
      } else {
        child.dispatchComponentDidMount();
      }
    });
  }

  private __createDocumentElement(tagName: string): DocumentFragment {
    return document.createElement(tagName);
  }

  protected componentDidMount():boolean {
    return true;
  }

  protected dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  private __componentDidUpdate(oldProps, newProps):boolean {
    const response = this.componentDidUpdate(oldProps, newProps);
    return response;
  }

  protected componentDidUpdate(oldProps, newProps): boolean {
    return oldProps !== newProps;
  }

  protected setProps:void = (nextProps) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
    this.eventBus().emit(Block.EVENTS.FLOW_CDU);
  };

  get element() {
    return this.__element;
  }

  private __addEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.__element.addEventListener(eventName, events[eventName].bind(this));
    });
  }

  private __removeEvents(): void {
    const { events = {} } = this.props;

    Object.keys(events).forEach((eventName) => {
      this.__element.removeEventListener(eventName, events[eventName].bind(this));
    });
  }

  private __render(): void {
    const fragment = this.render();
    const htmlElement = fragment.firstElementChild as HTMLElement;

    if (this.__element) this._removeEvents();

    if (this.__element) {
      this.__element.replaceWith(htmlElement);
    } else {
      this.__element = htmlElement;
    }

    this.__addEvents();
  }

  protected render(): object {
    return this.compile();
  }

  public getContent(): HTMLElement {
    return this.element;
  }

  public createBlocks(data, Cnstr:Block): [Block] {
    const arr:Array = [];
    data.forEach((item) => {
      const newCnstr:(Block) = new Cnstr(item);
      arr.push(newCnstr);
    });
    return arr;
  }

  private __makePropsProxy(props: number | string | object) {
    const proxyProps = new Proxy(props, {
      get: (target, prop) => {
        if (typeof target[prop] === 'function') {
          return target[prop].bind(target);
        }
        return target[prop];
      },
      set: (target, prop, value) => {
        target[prop] = value;
        if (this.eventBus().emit(Block.EVENTS.FLOW_CDU, { ...target[prop], value })) {
          this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
        }
        return true;
      },
      deleteProperty: () => {
        throw new Error('Нет доступа');
      },
    });

    return proxyProps;
  }

  public show(): void {
    this.__element.style.display = 'block';
  }

  public hide(): void {
    this.__element.style.display = 'none';
  }

  private __getChildren(propsAndChildren: object): object {
    const children = {};
    const props = {};

    Object.entries(propsAndChildren).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value) && value.every((v) => v instanceof Block)) {
        children[key] = value;
      } else {
        props[key] = value;
      }
    });

    return { children, props };
  }

  public compile(template: (locals) => string, locals: number | string | object): HTMLElement {
    const propsAndChildren = locals;
    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndChildren[key] = child.map((ch) => `<div data-id="id-${ch.__id}"></div>`);
      } else {
        propsAndChildren[key] = `<div data-id="id-${child.__id}"></div>`;
      }
    });

    const fragment:DocumentFragment = this.__createDocumentElement('template');

    const htmlString: string = template(propsAndChildren);

    fragment.innerHTML = htmlString;

    Object.values(this.children).forEach((child) => {
      let stub: HTMLElement | Array<HTMLElement> = null;
      if (Array.isArray(child)) {
        stub = [];
        child.forEach((ch) => {
          stub.push(fragment.content.querySelector(`[data-id="id-${ch.__id}"]`));
        });
      } else {
        stub = fragment.content.querySelector(`[data-id="id-${child.__id}"]`);
      }

      if (stub === null || stub[0] === null) {
        throw new Error(`Отстуствует элемент в шаблоне${child}`);
      }
      if (Array.isArray(child)) {
        child.forEach((ch, index) => {
          stub[index].replaceWith(ch.getContent());
        });
      } else {
        stub.replaceWith(child.getContent());
      }
    });
    return fragment.content;
  }
}

export default Block;
