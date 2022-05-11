import { expect, assert } from 'chai';
import HTTPTransport from './HTTPTransport';

describe('Проверяем работу HTTPTransport', () => {
  const HTTPTransportInstance = new HTTPTransport('/some/link');
  it('HTTPTransport может обрабатывать метод GET и возвращает промис', () => {
    assert.exists(HTTPTransportInstance.get);
    expect(HTTPTransportInstance.get()).to.be.a('promise');
  });
  it('HTTPTransport может обрабатывать метод POST и возвращает промис', () => {
    assert.exists(HTTPTransportInstance.get);
    expect(HTTPTransportInstance.post()).to.be.a('promise');
  });
  it('HTTPTransport может обрабатывать метод PUT и возвращает промис', () => {
    assert.exists(HTTPTransportInstance.put);
    expect(HTTPTransportInstance.put()).to.be.a('promise');
  });
  it('HTTPTransport может обрабатывать метод DELETE и возвращает промис', () => {
    assert.exists(HTTPTransportInstance.delete);
    expect(HTTPTransportInstance.delete()).to.be.a('promise');
  });
});
