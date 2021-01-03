import Paragraph from '@editorjs/paragraph';
import Header from '@editorjs/header';
import Underline from '@editorjs/underline';
import Delimiter from '@editorjs/delimiter';
import Quote from '@editorjs/quote';
import Embed from '@editorjs/embed';
import SimpleImage from '@editorjs/simple-image';

export default {
  paragraph: {
    class: Paragraph,
    config: {
      preserveBlank: true,
    },
  },
  header: Header,
  underline: Underline,
  delimiter: Delimiter,
  quote: Quote,
  embed: Embed,
  image: SimpleImage,
};
