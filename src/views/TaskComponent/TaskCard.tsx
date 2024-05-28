/* eslint-disable @typescript-eslint/restrict-plus-operands */
import { CalendarIcon } from '@/assets/icons';
import PropTypes from 'prop-types';

// Define the status type
type StatusType = 'incomplete' | 'inReview' | 'complete';

interface TaskCardProps {
  status: StatusType;
  dueDate: Date;
  onActionClick?: () => void;
  incompleteActionText?: string;
  inReviewActionText?: string;
  headerText: string;
  bodyText: string;
  completedText?: string;
  showActionButton?: boolean;
}

// Helper function to format date in mm/dd/yy format in UTC
const formatDateInUTC = (date: Date) => {
  const year = date.getUTCFullYear().toString().slice(-2);
  const month = ('0' + (date.getUTCMonth() + 1)).slice(-2); // months are zero-based
  const day = ('0' + date.getUTCDate()).slice(-2);
  return `${month}/${day}/${year}`;
};

const TaskCard: React.FC<TaskCardProps> = ({
  status,
  dueDate,
  onActionClick,
  incompleteActionText,
  inReviewActionText,
  headerText,
  bodyText,
  completedText = 'Completed!',
  showActionButton = true,
}) => {
  const renderActionButton = () => {
    if (status === 'incomplete' && showActionButton) {
      return (
        <button
          onClick={onActionClick}
          className="bg-blue-500 w-full text-white text-xs font-semibold px-4 py-2 mt-8 rounded-md"
        >
          {incompleteActionText}
        </button>
      );
    } else if (status === 'inReview' && showActionButton) {
      return (
        <button
          className="w-4/5 mx-auto block text-xs font-semibold px-4 py-2 mt-12 rounded-md"
          style={{ backgroundColor: '#fcd9bd', color: '#c55300' }}
        >
          {inReviewActionText}
        </button>
      );
    } else if (status === 'complete') {
      return (
        <button
          className="w-3/4 mx-auto block text-xs font-semibold px-4 py-2 rounded-md"
          style={{ backgroundColor: '#def7ec', color: '#15543f' }}
        >
          {completedText}
        </button>
      );
    }
    return null;
  };

  const renderDueDate = () => {
    if (status === 'complete') {
      return null;
    }

    const today = new Date();
    const todayUTC = new Date(Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()));
    const dueDateUTC = new Date(Date.UTC(dueDate.getUTCFullYear(), dueDate.getUTCMonth(), dueDate.getUTCDate()));
    const isOverdue = dueDateUTC < todayUTC;
    const isTomorrow = dueDateUTC.toDateString() === new Date(todayUTC.getTime() + 24 * 60 * 60 * 1000).toDateString();

    let bgColor = 'bg-blue-100';
    let textColor = 'text-blue-800';
    let iconColor = 'text-blue-800';
    let dateText = formatDateInUTC(dueDate);

    if (isTomorrow) {
      bgColor = 'bg-[rgb(252,217,189)]';
      textColor = 'text-[rgb(197,83,0)]';
      iconColor = 'text-[rgb(197,83,0)]';
      dateText = 'Tomorrow';
    } else if (isOverdue) {
      bgColor = 'bg-red-100';
      textColor = 'text-[rgba(155,29,28,255)]';
      iconColor = 'text-[rgba(155,29,28,255)]';
      dateText = 'Overdue';
    }

    return (
      <div className={`w-1/2 flex items-center p-1 rounded-md mt-2 ${bgColor}`}>
        <CalendarIcon className={`mr-1 p-1 ${iconColor}`} />
        <span className={`text-sm font-semibold ${textColor}`}>
          {dateText}
        </span>
      </div>
    );
  };

  const renderStatusIcon = () => {
    if (status === 'complete') {
      return (
        <div className="flex items-center justify-center w-6 h-6 bg-green-600 rounded-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="w-4 h-4"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
      );
    } else {
      return (
        <div className="w-6 h-6 border border-green-600 rounded-full"></div>
      );
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md w-64 min-h-60`}>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-sm font-semibold text-black">{headerText}</h2>
        {renderStatusIcon()}
      </div>
      <p className="text-gray-500 mb-8 text-sm">{bodyText}</p>
      {renderDueDate()}
      <div className="mt-0">{renderActionButton()}</div>
    </div>
  );
};

// Use PropTypes to validate the component's props
TaskCard.propTypes = {
  status: PropTypes.oneOf(['incomplete', 'inReview', 'complete'] as const).isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
  onActionClick: PropTypes.func,
  incompleteActionText: PropTypes.string,
  inReviewActionText: PropTypes.string,
  headerText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  completedText: PropTypes.string,
  showActionButton: PropTypes.bool,
};

export default TaskCard;
