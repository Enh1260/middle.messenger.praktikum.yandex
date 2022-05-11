import Block from '../utils/block';

class TestBlock extends Block {
  render(): any {
    const el = document.createElement('div');
    el.innerHTML = '<div id="testblock"><div>';
    return el;
  }
}

export default TestBlock;
