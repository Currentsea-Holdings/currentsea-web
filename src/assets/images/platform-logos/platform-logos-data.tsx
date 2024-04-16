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
  },
  {
    id: 'facebook',
    name: 'Facebook',
    Icon: FacebookIcon,
    isAvailable: false,  // Facebook is unavailable
  },
  {
    id: 'instagram',
    name: 'Instagram',
    Icon: InstagramIcon,
    isAvailable: false,  // Instagram is unavailable
  },
  {
    id: 'youtube',
    name: 'YouTube',
    Icon: YouTubeIcon,
    isAvailable: true,
  },
  {
    id: 'twitch',
    name: 'Twitch',
    Icon: TwitchIcon,
    isAvailable: true,
  },
  {
    id: 'snapchat',
    name: 'Snapchat',
    Icon: SnapchatIcon,
    isAvailable: true,
  },
  {
    id: 'x',
    name: 'X',
    Icon: XIcon,
    isAvailable: true,
  },
  {
    id: 'pinterest',
    name: 'Pinterest',
    Icon: PinterestIcon,
    isAvailable: true,
  },
  {
    id: 'linkedin',
    name: 'LinkedIn',
    Icon: LinkedInIcon,
    isAvailable: true,
  },
];