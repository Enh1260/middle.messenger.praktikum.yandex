import chai, { expect } from 'chai';
import { default as chaiDom } from 'chai-dom';
import TestBlock from './testBlock.ts';
import renderDOM from '../utils/renderDom.ts';
import Block from '../utils/block.ts';

chai.use(chaiDom);
const testBlock = new TestBlock();

describe('Проверяем работу компонента', () => {
  it('Компонент должен быть сущностью базовго компонента Block', () => {
    expect(testBlock).to.be.an.instanceof(Block);
  });

  it('При рендере компонента должна вставляться DOM компонента', () => {
    renderDOM('#app', testBlock);
    expect(document.querySelector('#app')).to.contain.html('<div id="testblock"><div>');
  });
});
