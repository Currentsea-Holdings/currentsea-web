import classNames from 'classnames';
import { Close } from 'flowbite-react-icons/outline';

import { useCreateCampaignStore } from '@/stores/createCampaignStore';

import { CampaignDetailsForm } from './CampaignDetailsForm';
import { CreateCampaignWizardTimeline } from './components/CreateCampaignWizardTimeline';

interface CreateCampaignWizardProps {
  className?: string;
}
export const CreateCampaignWizard = ({ className }: CreateCampaignWizardProps) => {
  const { showCreateCampaignWizard, setShowCreateCampaignWizard, currentStep } =
    useCreateCampaignStore((state) => ({
      showCreateCampaignWizard: state.showCreateCampaignWizard,
      setShowCreateCampaignWizard: state.setShowCreateCampaignWizard,
      currentStep: state.currentStep,
    }));

  const formTitles = ['Campaign Details', 'Requirements & Compensation', 'Tasks', 'Review'];

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <CampaignDetailsForm title={formTitles[0]} />;
      // case 2:
      //   return <RequirementsCompensationForm />;
      // case 3:
      //   return <TasksForm />;
      // case 4:
      //   return <ReviewForm />;
      default:
        return null;
    }
  };

  const stepNumber = 1;

  return (
    <div
      className={classNames(
        `fixed inset-0 z-40 m-0 flex items-center justify-center space-y-0 bg-black bg-opacity-75 ${className}`,
        { hidden: !showCreateCampaignWizard },
      )}
    >
      <div className="flex h-full w-full flex-col items-center bg-white px-10 pt-10">
        <div className="absolute left-10 top-10">
          <Close
            className="cursor-pointer"
            size={30}
            onClick={() => {
              setShowCreateCampaignWizard(false);
            }}
          />
        </div>
        <div className="lg:mx-[15%]">{renderForm()}</div>
      </div>
      <CreateCampaignWizardTimeline stepNum={stepNumber} />
    </div>
  );
};
