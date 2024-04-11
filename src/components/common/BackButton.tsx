import { Link, useNavigate } from 'react-router-dom';
import Icons from '@/assets/icons';

export type BackButtonProps = {
  className?: string;
  /**
   * The route for navigation. Accepts:
   * - A string for the path to navigate to using `<Link>`.
   * - A number to navigate steps in history (e.g., -1 for back) using `useNavigate`.
   * - A function to navigate to a route.
   *
   * Defaults to -1, navigating back one page.
   */
  route?: string | number | (() => void);
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

  const handleNavigation = () => {
    if (typeof route === 'string') {
      return (
        <Link
          to={route}
          title="Go back"
          aria-label="Go back"
          className={buttonClasses}
        >
          <Icons.LeftArrowIcon className={iconClasses} />
        </Link>
      );
    } else if (typeof route === 'function') {
      return (
        <button
          className={buttonClasses}
          title="Go back"
          aria-label="Go back"
          onClick={route}
        >
          <Icons.LeftArrowIcon className={iconClasses} />
        </button>
      );
    } else {
      return (
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
    }
  };

  return <div className={buttonClasses}>{handleNavigation()}</div>;
};
