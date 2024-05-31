import type { SocialMediaPlatform } from '@/types';
import classNames from 'classnames';
interface SocialMediaIconProps {
  platform: SocialMediaPlatform;
  onClick?: () => void;
  isSelected?: boolean;
}

export const SocialMediaIcon = ({ platform, onClick, isSelected }: SocialMediaIconProps) => {
  const { name, icon } = platform;
  return (
    <button
      type="button"
      className={classNames({ 'opacity-30' : !isSelected }, 'mr-4')}
      onClick={onClick}
      disabled={!onClick}
      aria-label={name}
    >
      { isSelected && <span className="sr-only">Selected</span>}
      <img src={icon} alt={`${name} icon`} />
    </button>
  );
};

