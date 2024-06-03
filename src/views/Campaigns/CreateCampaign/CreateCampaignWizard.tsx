import classNames from 'classnames';
import { Close } from 'flowbite-react-icons/outline';

import { useCreateCampaignStore } from '@/stores/createCampaignStore';

import { CreateCampaignWizardTimeline } from './components/CreateCampaignWizardTimeline';
import { CampaignDetailsForm } from './CampaignDetailsForm';
import { RequirementsCompensationForm } from './RequirementsCompensationForm';
import { TasksForm } from './TasksForm';

interface CreateCampaignWizardProps {
  className?: string;
}
export const CreateCampaignWizard = ({ className }: CreateCampaignWizardProps) => {
  const { showCreateCampaignWizard, setShowCreateCampaignWizard, currentStep, setCurrentStep } =
    useCreateCampaignStore((state) => ({
      showCreateCampaignWizard: state.showCreateCampaignWizard,
      setShowCreateCampaignWizard: state.setShowCreateCampaignWizard,
      currentStep: state.currentStep,
      setCurrentStep: state.setCurrentStep,
    }));

  const formTitles = ['Campaign Details', 'Requirements & Compensation', 'Tasks', 'Review'];

  const renderForm = () => {
    switch (currentStep) {
      case 1:
        return <CampaignDetailsForm title={formTitles[0]} />;
      case 2:
        return <RequirementsCompensationForm title={formTitles[1]} />;
      case 3:
        return <TasksForm title={formTitles[2]} />;
      // case 4:
      //   return <ReviewForm />;
      default:
        return null;
    }
  };

  return (
    <div
      className={classNames(
        `fixed inset-0 z-40 m-0 flex items-center justify-center space-y-0 bg-black bg-opacity-75 ${className}`,
        { hidden: !showCreateCampaignWizard },
      )}
    >
      <div className="relative flex h-full w-full flex-col items-center overflow-y-auto bg-white px-10 py-10">
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
      <CreateCampaignWizardTimeline
        currentStep={currentStep}
        setCurrentStep={setCurrentStep}
        stepTitles={formTitles}
      />
    </div>
  );
};
