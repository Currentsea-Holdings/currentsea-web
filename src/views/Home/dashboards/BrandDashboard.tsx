import classNames from 'classnames';
import { ShoppingBag } from 'flowbite-react-icons/solid';

import Icons, { CampaignIcon, ChartMixedDollarIcon, DollarIcon } from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';

import { CSActiveCampaigns } from '../components/CSActiveCampaigns';
import { CSCalendarWidget } from '../components/CSCalendarWidget';
import { CSCardAnalytics } from '../components/CSCardAnalytics';
import { CSUpcomingTasks } from '../components/CSUpcomingTasks';

interface BrandDashboardProps {}

export const BrandDashboard = () => {
  const revenue = 0;
  const sales = 0;
  const campaigns = 0;
  const roi = 0;

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
        className={classNames('mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4')}
      >
        <CSCardAnalytics
          icon={DollarIcon}
          amount={`${revenue}`}
          label="Revenue"
        />
        <CSCardAnalytics
          iconComponent={<ShoppingBag className="text-primary" />}
          amount={`${sales}`}
          label="Sales"
        />
        <CSCardAnalytics
          icon={CampaignIcon}
          amount={`${campaigns}`}
          label="Campaigns"
        />
        <CSCardAnalytics
          icon={ChartMixedDollarIcon}
          amount={`${roi}`}
          label="ROI"
        />
      </div>
      <div className="mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        <CSCalendarWidget
          calendarItems={calendarItems}
          emptyStateImg={logo}
        />
        <CSUpcomingTasks
          title="Upcoming Tasks"
          tasks={upcomingTasks}
          emptyStateImg={logo}
        />
      </div>
      <div
        className={classNames('mt-4 grid w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3')}
      >
        <CSActiveCampaigns
          title="Active Campaigns"
          campaigns={activeCampaigns}
          emptyStateImg={logo}
        />
      </div>
    </>
  );
};
