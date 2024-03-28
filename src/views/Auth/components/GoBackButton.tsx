import { useNavigate } from 'react-router-dom';
import Icons from '@/assets/icons';

export const GoBackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className="h-full"
      title="Go back"
      aria-label="Go back"
      onClick={() => {
        navigate(-1);
      }}
    >
      <Icons.LeftArrowIcon className="ml-2 mr-3 mt-1 text-dark" />
    </button>
  );
};
