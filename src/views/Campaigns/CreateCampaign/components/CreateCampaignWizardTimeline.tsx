import background from '@/assets/images/create-campaign.svg';
import logo from '@/assets/logo-title-black.png';
import classNames from 'classnames';
import type { CustomFlowbiteTheme} from 'flowbite-react';
import { Timeline, getTheme } from 'flowbite-react';

const steps = ['Campaign Details', 'Requirements & Compensation', 'Tasks', 'Review'];

export const CreateCampaignWizardTimeline = ({ stepNum }: { stepNum: number }) => {
  return (
    <div
      className="h-full w-full bg-cover bg-center bg-no-repeat p-4 md:w-1/2"
      style={{ backgroundImage: `url(${background})` }}
    >
      <div className="flex h-full flex-col items-center justify-center">
        <div className="relative mt-12 w-5/6 rounded-lg bg-white p-8 text-center shadow-md">
          <img
            src={logo}
            alt="CurrentSea logo"
            className="md:w-30 lg:w-30 xl:w-30 mx-auto -mt-4 mb-8 h-auto w-32 max-w-xs"
          />

          <h2 className="mb-0 ml-2 text-left text-xl font-semibold text-black">Create a Campaign</h2>
          
          <div className="relative ml-5 text-left text-sm mt-6">
          { WizardTimeline({ steps }) }
          </div>
        </div>
      </div>
    </div>
  );
};

const WizardTimeline = ({ steps }: { steps: string[] }) => {
  const timelineTheme: CustomFlowbiteTheme['timeline'] = getTheme().timeline;

  const componentTheme: CustomFlowbiteTheme['timeline'] = {
    root: {
      direction: {
        vertical: `${timelineTheme.root?.direction?.vertical} border-dark`,
      }
    },
    item: {
      content: {
        title: {
          base: `${timelineTheme.item?.content?.title?.base} font-medium`,
        }
      },
    },
  };

  return (
  <Timeline theme={componentTheme}>
    {steps.map((step, index) => (
      <Timeline.Item key={index} className='relative'>
        <div
          className={classNames(
            'absolute left-[-2.3rem] flex h-6 w-6 items-center justify-center rounded-full border border-dark bg-white',
            {
              ' top-[.25rem]': steps.length === index + 1,
            },
          )}
        >
          {index + 1}
        </div>
        <Timeline.Content>
          <Timeline.Title className='text-left'>{step}</Timeline.Title>
        </Timeline.Content>
      </Timeline.Item>
    ))}
  </Timeline>
);
}