import { FC } from 'react';
import classNames from 'classnames';
import { ChartMixedDollarIcon, RotateIcon, MouseIcon } from '@/assets/icons';
import { CSUpcomingTasks } from '@/views/Home/CSUpcomingTasks';
import { CSCard } from '@/components/common';
import { CSCardAnalytics } from '@/views/Home/CSCardAnalytics';

interface HomeProps {
  className?: string;
}

export const Home: FC<HomeProps> = ({ className, ...props }: HomeProps) => {
  return (
    <>
    <h1 className="my-2">Home</h1>
      <div
        className={classNames('grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSCardAnalytics
          icon={ChartMixedDollarIcon}
          amount="$950"
          label="Earnings"
        />
        <CSCardAnalytics
          icon={RotateIcon}
          amount="123"
          label="Conversions"
        />
        <CSCardAnalytics
          icon={MouseIcon}
          amount="23"
          label="Affiliate Link Clicks"
        />
      </div>
      <div className="grid w-full grid-cols-1 gap-4 mt-4 md:grid-cols-2 xl:grid-cols-3 max-h-[436px]">
        <CSCard title="Today's Schedule">
          <div className="bg-[#edfafa] flex flex-col gap-1 w-full items-start px-2 py-1 rounded-lg">
            <div className="text-[#075c68]">12:30-15:00</div>
            <div className="text-lg font-medium leading-[27px] text-[#065d69]">Flowbite Meet</div>
          </div>
          <div className="bg-[#edfafa] flex flex-col gap-1 w-full items-start px-2 py-1 rounded-lg">
            <div className="text-[#075c68]">12:30-15:00</div>
            <div className="text-lg font-medium leading-[27px] text-[#065d69]">Flowbite Meet</div>
          </div>
          <div className="bg-[#edfafa] flex flex-col gap-1 w-full items-start px-2 py-1 rounded-lg">
            <div className="text-[#075c68]">12:30-15:00</div>
            <div className="text-lg font-medium leading-[27px] text-[#065d69]">Flowbite Meet</div>
          </div>
        </CSCard>
        <CSUpcomingTasks title="Upcoming Tasks" />
      </div>
      <div className="border-2 border-gray-300 border-dashed rounded-xl dark:border-gray-600 h-96"></div>
    </>
  );
};
