import type Fragment from './Fragment';

type DelimiterFragment = {
  type: 'delimiter';
};

export function isDelimiterFragment(fragment: Fragment): fragment is DelimiterFragment {
  return fragment.type === 'delimiter';
}
