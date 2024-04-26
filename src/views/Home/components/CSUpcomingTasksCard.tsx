import { CSCard } from '@/components/common';
import Icons from '@/assets/icons';

export const CSUpcomingTasksCard = ({ title }: { title: string }) => {
    return (
      <CSCard padding="p-4">
        <div className="flex items-center justify-between">
          <div className="text-base font-semibold text-gray-900 dark:text-white">{title}</div>
  
          <div className="flex items-start justify-start p-1 border border-green-700 rounded-full Button">
            <div className="relative w-3 h-3 EmptyCircle">
              <div className="absolute top-0 left-0 w-5 h-5 rounded-full Ellipse102" />
            </div>
          </div>
        </div>
        <div className="pb-4 text-sm font-normal text-gray-700 dark:text-gray-400">
          {`In _variables.scss on line 672 you define $table_variants. Each instance
          of "color-level" needs to be changed to "shift-color".`}
        </div>
        <div className="flex items-center justify-start">
          <div className="px-2.5 py-0.5 text-amber-700 bg-orange-200 rounded justify-center items-center gap-1 flex">
            <Icons.CalendarMonthIcon className="w-2.5 h-2.5 text-yellow-900" />
            <div className="Text text-center text-sm font-medium font-['Inter'] leading-tight">
              Tomorrow
            </div>
          </div>
        </div>
        <div className="inline-flex items-start justify-center CurrentseaButton">
          <div className="Button px-5 py-2.5 bg-blue-600 rounded-lg justify-center items-center gap-2 flex">
            <div className="Text text-white text-xs font-semibold font-['Montserrat'] leading-none">
              Upload content
            </div>
          </div>
        </div>
      </CSCard>
    );
  };