import { useNavigate } from 'react-router-dom';
import Icons from '@/assets/icons';

export type BackButtonProps = {
  className?: string;
  route?: string | number;
};

export const BackButton = ({ className, route = -1 }: BackButtonProps) => {
  const navigate = useNavigate();

  const iconClasses = className
    ?.split(' ')
    .filter((className) => className.startsWith('text-'))
    .join(' ');
  const buttonClasses = className
    ?.split(' ')
    .filter((className) => !className.startsWith('text-'))
    .join(' ');
    
  const handleNavigate = () => {
    if (typeof route === 'string') {
      navigate(route);
    } else if (typeof route === 'number') {
      navigate(route);
    }
  }
  return (
    <button
      className={buttonClasses}
      title="Go back"
      aria-label="Go back"
      onClick={handleNavigate}
    >
      <Icons.LeftArrowIcon className={iconClasses} />
    </button>
  );
};
