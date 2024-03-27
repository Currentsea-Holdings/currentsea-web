import { toast } from 'react-toastify';
import { HiCheck, HiExclamation, HiX } from 'react-icons/hi'
import classNames from 'classnames';

// interface toastType {
//   type: 'success' | 'error' | 'info' | 'warning';
// }

enum toastTypes {
  success = 'success',
  // info = 'info',
  // warning = 'warning',
  error = 'error',
}

const toastIcon = {
  success: {
    icon: <HiCheck className="h-5 w-5" />,
    className: 'bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200',
  },
  error: {
    icon: <HiExclamation className="h-5 w-5" />,
    className: 'bg-red-100 text-red-500',
  },
}

export const useToast = () => {
  return (type?: toastTypes) => toast(
    <div className="flex items-center">
      <div className={classNames('grid h-screen grid-cols-2', type && toastIcon[type].className)}>
        {type && toastIcon[type].icon}
      </div>
      <div className="ml-3 text-sm font-normal">
        Password reset email resent. Please check your inbox and spam folder.
      </div>
    </div>,
  );
};
