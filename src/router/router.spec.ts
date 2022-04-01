import { expect } from 'chai';
import Router from './router.ts';
import TestBlock from '../test/testBlock.ts';

const router = new Router('#app');
router.use('/', TestBlock)
  .use('/login', TestBlock)
  .use('/register', TestBlock)
  .start();

describe('Проверяем работу Router', () => {
  it('Router должен регистрировать новые роуты', () => {
    expect(router.routes.length).to.eq(3);
  });
  it('Переход на новую страницу должен менять состояние сущности history', () => {
    router.go('/login');
    expect(window.location.pathname).to.eq('/login');
  });
});
