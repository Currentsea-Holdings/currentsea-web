import classNames from 'classnames';
import { getTheme, Timeline } from 'flowbite-react';

import background from '@/assets/images/create-campaign.svg';
import logo from '@/assets/logo-title-black.png';

import type { CustomFlowbiteTheme } from 'flowbite-react';

interface CreateCampaignWizardTimelineProps {
  currentStep: number;
  setCurrentStep: (step: number) => void;
  stepTitles: string[];
}

export const CreateCampaignWizardTimeline = ({
  currentStep,
  setCurrentStep,
  stepTitles
}: CreateCampaignWizardTimelineProps) => {
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

          <h2 className="mb-0 ml-2 text-left text-xl font-semibold text-black">
            Create a Campaign
          </h2>

          <div className="relative ml-5 mt-6 text-left text-sm">
            <WizardTimeline
              stepTitles={stepTitles}
              currentStep={currentStep}
              setCurrentStep={setCurrentStep}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

interface WizardTimelineProps extends CreateCampaignWizardTimelineProps {}

const WizardTimeline = ({ stepTitles, currentStep, setCurrentStep }: WizardTimelineProps) => {
  const timelineTheme: CustomFlowbiteTheme['timeline'] = {
    root: {
      direction: {
        vertical: `${getTheme().timeline.root.direction.vertical} border-dark`,
      },
    },
    item: {
      content: {
        title: {
          base: `${getTheme().timeline.item.content.title.base} font-medium`,
        },
      },
    },
  };

  return (
    <Timeline theme={timelineTheme}>
      {stepTitles.map((step, index) => (
        <Timeline.Item
          key={index}
          className={classNames('relative cursor-default', {
            'cursor-pointer': currentStep >= index + 1,
          })}
          onClick={() => {
            // uncomment when finished with form
            // currentStep > index + 1 && setCurrentStep(index + 1);
            setCurrentStep(index + 1);
          }}
        >
          <div
            className={classNames(
              'absolute left-[-2.3rem] flex h-6 w-6 items-center justify-center rounded-full border border-dark bg-white text-dark',
              { 'top-[.25rem]': stepTitles.length === index + 1 },
              { 'border-primary text-primary': currentStep >= index + 1 },
            )}
          >
            {index + 1}
          </div>
          <Timeline.Content>
            <Timeline.Title
              className={classNames(
                'text-left',
                { 'font-semibold': index + 1 === currentStep },
                { 'text-primary': currentStep >= index + 1 },
              )}
            >
              {step}
            </Timeline.Title>
          </Timeline.Content>
        </Timeline.Item>
      ))}
    </Timeline>
  );
};
