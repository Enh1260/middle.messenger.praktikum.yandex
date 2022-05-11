import chai from 'chai';
import chaiDom from 'chai-dom';
import TestBlock from './testBlock';
import renderDOM from '../utils/renderDom';
import Block from '../utils/block';

chai.use(chaiDom);
const testBlock = new TestBlock();

describe('Проверяем работу компонента', () => {
  it('Компонент должен быть сущностью базовго компонента Block', () => {
    chai.expect(testBlock).to.be.an.instanceof(Block);
  });

  it('При рендере компонента должна вставляться DOM компонента', () => {
    renderDOM('#app', testBlock);
    chai.expect(document.querySelector('#app')).to.contain.html('<div id="testblock"><div>');
  });
});
