import classNames from 'classnames';

import Icons, { ChartMixedDollarIcon, MouseIcon, RotateIcon } from '@/assets/icons';

import { CSActiveCampaigns } from '../components/CSActiveCampaigns';
import { CSCalendarWidget } from '../components/CSCalendarWidget';
import { CSCardAnalytics } from '../components/CSCardAnalytics';
import { CSUpcomingTasks } from '../components/CSUpcomingTasks';

interface CreatorDashboardProps {}

export const CreatorDashboard = () => {
  const earnings = 0;
  const conversions = 0;
  const affiliateLinkClicks = 0;

  interface CalendarItem {
    time: string;
    label: string;
  }

  const calendarItems: CalendarItem[] = [
    // {
    //   time: '12:30-15:00',
    //   label: 'Flowbite Meet',
    // },
    // {
    //   time: '12:30-15:00',
    //   label: 'Flowbite Meet',
    // },
    // {
    //   time: '12:30-15:00',
    //   label: 'Flowbite Meet',
    // },
  ];

  interface Task {
    title: string;
  }

  const upcomingTasks: Task[] = [
    // {
    //   title: 'Task 1',
    // },
    // {
    //   title: 'Task 2',
    // },
    // {
    //   title: 'Task 3',
    // },
    // {
    //   title: 'Task 4',
    // },
    // {
    //   title: 'Task 5',
    // },
    // {
    //   title: 'Task 6',
    // },
  ];

  interface Campaign {
    title: string;
    brand: string;
  }

  const activeCampaigns: Campaign[] = [
    // {
    //   title: 'Campaign Name',
    //   brand: 'Brand Name',
    // },
    // {
    //   title: 'Campaign Name 2',
    //   brand: 'Brand Name',
    // },
    // {
    //   title: 'Campaign Name 3',
    //   brand: 'Brand Name',
    // },
  ];

  return (
    <>
      <div
        className={classNames('mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSCardAnalytics icon={ChartMixedDollarIcon} amount={`$${earnings}`} label="Earnings" />
        <CSCardAnalytics icon={RotateIcon} amount={`${conversions}`} label="Conversions" />
        <CSCardAnalytics
          icon={MouseIcon}
          amount={`${affiliateLinkClicks}`}
          label="Affiliate Link Clicks"
        />
      </div>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CSCalendarWidget calendarItems={calendarItems} />
        <CSUpcomingTasks title="Upcoming Tasks" tasks={upcomingTasks} />
      </div>
      <div
        className={classNames('mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSActiveCampaigns title="Active Campaigns" campaigns={activeCampaigns} />
      </div>
    </>
  );
};
