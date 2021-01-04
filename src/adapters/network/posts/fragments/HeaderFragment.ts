import type Fragment from './Fragment';

type HeaderFragment = {
  type: 'header';
  data: {
    text: string;
    level: number;
  };
};

export function isHeaderFragment(fragment: Fragment): fragment is HeaderFragment {
  return fragment.type === 'header';
}
