import type Fragment from './Fragment';

type EmbedFragment = {
  type: 'embed';
  data: {
    service: string;
    embed: string;
    caption: string;
  };
};

export function isEmbedFragment(fragment: Fragment): fragment is EmbedFragment {
  return fragment.type === 'embed';
}
