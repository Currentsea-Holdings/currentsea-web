import classNames from 'classnames';
import { getTheme, Table } from 'flowbite-react';
import { UsersGroup } from 'flowbite-react-icons/solid';

import Icons, { CampaignIcon, ChartMixedDollarIcon, DollarIcon } from '@/assets/icons';
import logo from '@/assets/logo-title-black.svg';

import { CSCardAnalytics } from '../components/CSCardAnalytics';

import type { CustomFlowbiteTheme } from 'flowbite-react';

interface AgencyDashboardProps {}

export const AgencyDashboard = () => {
  const revenue = 0;
  const clients = 0;
  const campaigns = 0;
  const roi = 0;

  interface CalendarItem {
    time: string;
    label: string;
  }

  interface Task {
    title: string;
  }

  interface Campaign {
    title: string;
    brand: string;
    dueDate: string;
    clients: unknown[];
    stage: string;
  }

  const activeCampaigns: Campaign[] = [];

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
          iconComponent={<UsersGroup className="text-primary" />}
          amount={`${clients}`}
          label="Clients"
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
      <div
        className={classNames(
          'mt-4 grid h-full w-full grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3',
        )}
      >
        <Campaigns />
      </div>
    </>
  );
};

export const Campaigns = () => {
  const tableTheme: CustomFlowbiteTheme['table'] = getTheme().table;

  const componentTheme: CustomFlowbiteTheme['table'] = {
    ...tableTheme,
    root: {
      ...tableTheme.root,
      base: `${tableTheme.root?.base} h-full shadow-md`,
      wrapper: 'relative h-full shadow-md',
    },
  };
  return (
    <div className="col-span-4 overflow-x-auto shadow-md drop-shadow-md">
      <Table theme={componentTheme}>
        <Table.Head>
          <Table.HeadCell className="border-y-1 w-[40%] border-gray-300 bg-white">
            Campaign
          </Table.HeadCell>
          <Table.HeadCell className="border-y-1 w-[20%] border-gray-300 bg-white">
            Due Date
          </Table.HeadCell>
          <Table.HeadCell className="border-y-1 w-[20%] border-gray-300 bg-white">
            Clients
          </Table.HeadCell>
          <Table.HeadCell className="border-y-1 w-[20%] border-gray-300 bg-white">
            Campaign Stage
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="border-t border-gray-30">
          <Table.Row>
            <Table.Cell
              colSpan={4}
              className="bg-white p-10 text-center"
              style={{ height: '50vh' }}
            >
              <div className="flex h-full flex-col items-center justify-center space-y-2">
                <img
                  src={logo}
                  alt="Logo"
                  className="mr-3 h-12"
                />
                <p className="text-lg text-gray-60">No active campaigns</p>
              </div>
            </Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
  );
};
