import {
  FacebookIcon,
  InstagramIcon,
  LinkedInIcon,
  PinterestIcon,
  SnapchatIcon,
  TikTokIcon,
  TwitchIcon,
  XIcon,
  YouTubeIcon,
} from '@/assets/images/platform-logos/platform-logos.tsx';

export const socialLogoArray = [
  {
    id: 'tiktok',
    name: 'TikTok',
    Icon: TikTokIcon,
    isAvailable: true,
    isDisabled: false,
  },
  {
    id: 'facebook',
    name: 'Facebook',
    Icon: FacebookIcon,
    isAvailable: false,  // Facebook is unavailable
    isDisabled: true,  // button is disabled
  },
  {
    id: 'instagram',
    name: 'Instagram',
    Icon: InstagramIcon,
    isAvailable: false,  // Instagram is unavailable
    isDisabled: true, // button is disabled
  },
  {
    id: 'youtube',
    name: 'YouTube',
    Icon: YouTubeIcon,
    isAvailable: true,
    isDisabled: false,
  },
  {
    id: 'twitch',
    name: 'Twitch',
    Icon: TwitchIcon,
    isAvailable: true,
    isDisabled: false,
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    Icon: SnapchatIcon,
    isAvailable: true,
    isDisabled: false,
  },
  {
    id: 'x',
    name: 'X',
    Icon: XIcon,
    isAvailable: true,
    isDisabled: false,
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    Icon: PinterestIcon,
    isAvailable: true,
    isDisabled: false,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    Icon: LinkedInIcon,
    isAvailable: true,
    isDisabled: false,
  },
];