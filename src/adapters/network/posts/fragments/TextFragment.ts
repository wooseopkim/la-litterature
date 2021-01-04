import type Fragment from './Fragment';

type TextFragment = {
  type: 'paragraph';
  data: {
    text: string;
  };
};

export function isTextFragment(fragment: Fragment): fragment is TextFragment {
  return fragment.type === 'paragraph';
}
