import Block from '../../../utils/block';
import template from './fieldset-info.pug';

class FieldsetInfo extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
export default FieldsetInfo;
