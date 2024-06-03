import { CalendarIcon } from '@/assets/icons';
import { Datepicker } from 'flowbite-react';
import PropTypes from 'prop-types';
import { CSDatepicker } from './CSDatepicker';

// Define the status type
type StatusType = 'incomplete' | 'inReview' | 'complete';

interface TaskCardProps {
  status: StatusType;
  dueDate?: Date;
  onDueDateChange?: (date: Date | null | undefined) => void;
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
  const month = ('0' + (date.getUTCMonth() + 1).toString()).slice(-2); // months are zero-based
  const day = ('0' + date.getUTCDate().toString()).slice(-2);
  return `${month}/${day}/${year}`;
};

export const TaskCard = ({
  status,
  dueDate,
  onDueDateChange,
  onActionClick,
  incompleteActionText,
  inReviewActionText,
  headerText,
  bodyText,
  completedText = 'Completed!',
  showActionButton = Boolean(onActionClick),
}: TaskCardProps) => {

  const handleDueDateChange = (date: Date | null | undefined) => {
    onDueDateChange?.(date);
  };

  const renderActionButton = () => {
    if (status === 'incomplete' && showActionButton) {
      return (
        <button
          onClick={onActionClick}
          className="mt-8 w-full rounded-md bg-blue-500 px-4 py-2 text-xs font-semibold text-white"
        >
          {incompleteActionText}
        </button>
      );
    } else if (status === 'inReview' && showActionButton) {
      return (
        <button
          className="mx-auto mt-12 block w-4/5 rounded-md px-4 py-2 text-xs font-semibold"
          style={{ backgroundColor: '#fcd9bd', color: '#c55300' }}
        >
          {inReviewActionText}
        </button>
      );
    } else if (status === 'complete') {
      return (
        <button
          className="mx-auto block w-3/4 rounded-md px-4 py-2 text-xs font-semibold"
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

    if (!dueDate) {
      return (
        <CSDatepicker
        value={dueDate}
        onChange={handleDueDateChange}
        className="rounded-md bg-blue-100 p-1 px-2 text-blue-800"
        placeholder="Set Due Date"
      />
      );
    }

    const today = new Date();
    const todayUTC = new Date(
      Date.UTC(today.getUTCFullYear(), today.getUTCMonth(), today.getUTCDate()),
    );
    const dueDateUTC = new Date(
      Date.UTC(dueDate.getUTCFullYear(), dueDate.getUTCMonth(), dueDate.getUTCDate()),
    );
    const isOverdue = dueDateUTC < todayUTC;
    const isTomorrow =
      dueDateUTC.toDateString() ===
      new Date(todayUTC.getTime() + 24 * 60 * 60 * 1000).toDateString();

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
      <div className={`mt-2 flex w-min rounded-md p-1 px-2 ${bgColor}`}>
        <CalendarIcon className={`mr-1 p-1 ${iconColor}`} />
        <span className={`text-sm font-semibold ${textColor}`}>{dateText}</span>
      </div>
    );
  };

  const renderStatusIcon = () => {
    if (status === 'complete') {
      return (
        <div className="flex h-[20px] w-[20px] min-w-[20px] items-center justify-center rounded-full bg-green-600">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="white"
            className="h-4 w-4"
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
      return <div className="h-[20px] w-[20px] rounded-full border border-green-600"></div>;
    }
  };

  return (
    <div className={`w-56 rounded-lg bg-white p-4 shadow-md`}>
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-lg font-semibold text-black">{headerText}</h2>
        {renderStatusIcon()}
      </div>
      <p className="mb-8 text-base text-gray-500">{bodyText}</p>
      {renderDueDate()}
      <div className="mt-0">{renderActionButton()}</div>
    </div>
  );
};

// Use PropTypes to validate the component's props
TaskCard.propTypes = {
  status: PropTypes.oneOf(['incomplete', 'inReview', 'complete'] as const).isRequired,
  dueDate: PropTypes.instanceOf(Date).isRequired,
  onDueDateChange: PropTypes.func,
  onActionClick: PropTypes.func,
  incompleteActionText: PropTypes.string,
  inReviewActionText: PropTypes.string,
  headerText: PropTypes.string.isRequired,
  bodyText: PropTypes.string.isRequired,
  completedText: PropTypes.string,
  showActionButton: PropTypes.bool,
};
