import { expect } from 'chai';
import Router from './router';
import TestBlock from '../test/testBlock';

const router = new Router('#app');
router.use('/', TestBlock)
  .use('/login', TestBlock)
  .use('/register', TestBlock)
  .start();

describe('Проверяем работу Router', () => {
  it('Router должен регистрировать новые роуты', () => {
    expect(router.getRoute('/login'))
      .to.deep.include({ _pathname: '/login' });
    expect(router.getRoute('/register'))
      .to.deep.include({ _pathname: '/register' });
  });
  it('Переход на новую страницу должен менять состояние сущности history', () => {
    router.go('/login');
    expect(window.location.pathname).to.eq('/login');
  });
});
