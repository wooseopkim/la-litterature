import type Fragment from './Fragment';

type QuoteFragment = {
  type: 'quote';
  data: {
    text: string;
    caption: string;
    alignment: 'left' | 'center';
  };
};

export function isQuoteFragment(fragment: Fragment): fragment is QuoteFragment {
  return fragment.type === 'quote';
}
