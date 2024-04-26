import { ArrowRight } from 'flowbite-react-icons/outline';

import emptyState from '@/assets/images/common/empy-state.svg';
import { CSButton, CSCard } from '@/components';

interface CSCalendarWidgetProps {
  calendarItems?: {
    time: string;
    label: string;
  }[];
}

export const CSCalendarWidget = ({ calendarItems = [] }: CSCalendarWidgetProps) => {

  const viewCalendar = () => {
    console.log('viewCalendar clicked');
    // navigate('/calendar'); //TODO: This route/view/screen or api call etc still has to be made.
  };

  return (
    <CSCard
      className="max-h-[436px]"
      title="Today's Schedule"
    >
      {calendarItems.length > 0 ? (
        calendarItems.map((item) => (
          <div
            key={item.label}
            className="flex w-full flex-col items-start gap-1 rounded-lg bg-[#edfafa] px-2 py-1"
          >
            <div className="text-[#075c68]">{item.time}</div>
            <div className="text-lg font-medium leading-[27px] text-[#065d69]">{item.label}</div>
          </div>
        ))
      ) : (
        <div className="flex w-full flex-col items-center justify-center gap-1 rounded-lg">
          <img
            src={emptyState}
            alt="No events today"
            className='mt-10'
          />
          <p className='mt-4'>No events today</p>
          <CSButton
            onClick={viewCalendar}
            className="w-50 mb-8 mt-6 flex h-9 cursor-pointer items-center justify-center rounded-lg text-sm font-semibold text-primary"
            outline
          >
            <p className="mr-1">View calendar</p> <ArrowRight />
          </CSButton>
        </div>
      )}
    </CSCard>
  );
};
