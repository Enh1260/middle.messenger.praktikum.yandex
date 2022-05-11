import Block from '../../../../utils/block';
import template from './searchUserList.pug';

class searchUserList extends Block {
  render() {
    return this.compile(template, { ...this.props });
  }
}
export default searchUserList;
