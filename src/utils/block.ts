import { v4 as makeUUID } from 'uuid';
import EventBus from './eventBus';
import { isEqual } from './isEqual';

export type TChildren = {
  [key: string]: Block | Block[];
}

export interface TComponentProps {
  __id?: string;
  __element?: HTMLElement;
  children?: TChildren;

  [key: string]: any;
}

export default class Block {
  static EVENTS = {
    INIT: 'init',
    INIT_CHLD: 'init-children',
    FLOW_CDM: 'flow:component-did-mount',
    FLOW_CDU: 'flow:component-did-update',
    FLOW_RENDER: 'flow:render',
  };

  protected __id: string;

  private __element!: HTMLElement;

  protected props: any;

  public children: TChildren;

  public eventBus: EventBus;

  constructor(propsAndChildren: TComponentProps = {}) {
    const { children, props } = this.__getChildren(propsAndChildren) as TComponentProps;

    this.__id = makeUUID();
    this.children = children as TChildren;
    this.props = this.__makePropsProxy({ ...props, __id: this.__id });
    this.eventBus = new EventBus();

    this.__registerEvents();
    this.eventBus.emit(Block.EVENTS.INIT_CHLD);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  private __registerEvents() {
    this.eventBus.on(Block.EVENTS.INIT_CHLD, this.initChildren.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDM, this.__componentDidMount.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_CDU, this.__componentDidUpdate.bind(this));
    this.eventBus.on(Block.EVENTS.FLOW_RENDER, this.__render.bind(this));
  }

  protected initChildren(): void {

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

  private __createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  protected componentDidMount(): void {

  }

  protected dispatchComponentDidMount() {

  }

  private __componentDidUpdate(oldProps: any, newProps: any) {
    const response = this.componentDidUpdate(oldProps, newProps);

    if (response) return;

    this.eventBus.emit(Block.EVENTS.INIT_CHLD);
    this.eventBus.emit(Block.EVENTS.FLOW_RENDER);
  }

  protected componentDidUpdate(oldProps: any, newProps: any): boolean {
    const setPropsIsEqual = isEqual(oldProps, newProps);

    return setPropsIsEqual;
  }

  protected isPropsKeysInState(path: any, newProps: any): boolean {
    const newPropsKeys = Object.keys(newProps);

    return newPropsKeys.includes(path);
  }

  public setProps = (nextProps: any): void => {
    if (!nextProps) return;

    const oldProps = { ...this.props };

    Object.assign(this.props, nextProps);
    this.eventBus.emit(Block.EVENTS.FLOW_CDU, oldProps, nextProps);
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
      this.__element!.removeEventListener(eventName, events[eventName].bind(this));
    });
  }

  private __render(): void {
    const fragment = this.render();

    const htmlElement = fragment.firstElementChild as HTMLElement;

    if (this.__element) this.__removeEvents();
    if (this.__element) {
      this.__element.replaceWith(htmlElement);
      this.__element = htmlElement;
    } else {
      this.__element = htmlElement;
    }
    this.__addEvents();

    this.eventBus.emit(Block.EVENTS.FLOW_CDM);
  }

  protected render() {
    return this.compile();
  }

  public getContent(): HTMLElement {
    return this.__element;
  }

  public createChildren(nameChildren: string, component: Block, props: any) {
    if (!props) return;
    this.children[nameChildren] = this.createBlocks(props, component);
  }

  public createBlocks(data: any, Cnstr:any): Block[] | [] {
    if (!data) return [];
    const arr: Block[] = [];
    data.forEach((item: any) => {
      const newCnstr:Block = new Cnstr(item);
      arr.push(newCnstr);
    });
    return arr;
  }

  private __makePropsProxy(props: TComponentProps) {
    const proxyProps = new Proxy(props, {
      get: (target, prop: string) => {
        if (typeof target[prop] === 'function') {
          return target[prop].bind(target);
        }
        return target[prop];
      },
      set: (target, prop: string, value) => {
        target[prop] = value;

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
    const children: TChildren = {};
    const props: TComponentProps = {};

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

  public compile(template: any = {}, locals: TComponentProps = {}) {
    const propsAndChildren = locals;

    Object.entries(this.children).forEach(([key, child]) => {
      if (Array.isArray(child)) {
        propsAndChildren[key] = child.map((ch) => `<div data-id="id-${ch.__id}"></div>`);
      } else {
        propsAndChildren[key] = `<div data-id="id-${child.__id}"></div>`;
      }
    });

    const fragment = this.__createDocumentElement('template') as HTMLTemplateElement;

    const htmlString: string = template(propsAndChildren);
    fragment.innerHTML = htmlString;

    Object.values(this.children).forEach((child: Block) => {
      let stub: any = [];
      if (Array.isArray(child)) {
        child.forEach((ch) => {
          if (Array.isArray(stub)) {
            const selector = `[data-id="id-${ch.__id}"]`;
            const fragmentContent = fragment.content.querySelector(selector) as Element;
            stub.push(fragmentContent);
          }
        });
      } else {
        stub = fragment.content.querySelector(`[data-id="id-${child.__id}"]`);
      }

      if (stub === null || stub[0] === null) {
        throw new Error(`Отстуствует элемент в шаблоне,${child.__element}`);
      }
      if (Array.isArray(child)) {
        child.forEach((ch, index) => {
          stub[index].replaceWith(ch.getContent());
        });
      } else if (!Array.isArray(stub)) {
        stub.replaceWith(child.getContent());
      }
    });
    return fragment.content;
  }
}
