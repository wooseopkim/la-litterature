import type Fragment from './Fragment';

type ImageFragment = {
  type: 'image';
  data: {
    url: string;
    caption: string;
    withBackground: boolean;
    withBorder: boolean;
    strecthed: boolean;
  };
};

export function isImageFragment(fragment: Fragment): fragment is ImageFragment {
  return fragment.type === 'image';
}
