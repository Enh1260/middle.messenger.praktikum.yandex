import Block from '../utils/block.ts';

class TestBlock extends Block {
  render() {
    const el = document.createElement('div');
    el.innerHTML = '<div id="testblock"><div>';
    return el;
  }
}

export default TestBlock;
