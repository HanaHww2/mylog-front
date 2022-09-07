import ReactQuill, { Quill } from 'react-quill';

let BlockEmbed = Quill.import('blots/block/embed');

class ImageBlot extends BlockEmbed {
  static blotName = 'imageBlot';
  static tagName = 'img';
  static create(data) {
    const node = super.create(data);
    node.setAttribute('src', data.src);
    node.setAttribute('id', data.id);
    console.log(data, node);
    return node;
  }
  static value(domNode) {
    console.log(domNode);
    const { src, id } = domNode.dataset;
    return { src, id };
  }
}

export default ImageBlot;
