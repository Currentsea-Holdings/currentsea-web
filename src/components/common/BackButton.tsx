import { Link, useNavigate } from 'react-router-dom';
import Icons from '@/assets/icons';

export type BackButtonProps = {
  className?: string;
  /**
   * The route for navigation. Accepts:
   * - A string for the path to navigate to using `<Link>`.
   * - A number to navigate steps in history (e.g., -1 for back) using `useNavigate`.
   * Defaults to -1, navigating back one page.
   */
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

  return typeof route === 'string' ? (
    <div className={buttonClasses}>
      <Link
        to={route}
        title="Go back"
        aria-label="Go back"
      >
        <Icons.LeftArrowIcon className={iconClasses} />
      </Link>
    </div>
  ) : (
    <button
      className={buttonClasses}
      title="Go back"
      aria-label="Go back"
      onClick={() => {
        navigate(route);
      }}
    >
      <Icons.LeftArrowIcon className={iconClasses} />
    </button>
  );
};
