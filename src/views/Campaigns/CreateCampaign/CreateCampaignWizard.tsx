import { CreateCampaignWizardTimeline } from './components/CreateCampaignWizardTimeline';
import { Close } from 'flowbite-react-icons/outline';
import classNames from 'classnames';
import { useCreateCampaignStore } from '@/stores/createCampaignStore';

interface CreateCampaignWizardProps {
  className?: string;
}
export const CreateCampaignWizard = ({ className }: CreateCampaignWizardProps) => {
  const showCreateCampaignWizard = useCreateCampaignStore(
    (state) => state.showCreateCampaignWizard,
  );
  const setShowCreateCampaignWizard = useCreateCampaignStore(
    (state) => state.setShowCreateCampaignWizard,
  );

  const stepNumber = 1;

  return (
    <div
      className={classNames(
        `fixed inset-0 z-40 m-0 flex items-center justify-center space-y-0 bg-black bg-opacity-75 ${className}`,
        { hidden: !showCreateCampaignWizard },
      )}
    >
      <div className="flex h-full w-full flex-col bg-white pl-10 pt-10">
        <Close
          className="cursor-pointer"
          size={30}
          onClick={() => {
            setShowCreateCampaignWizard(false);
          }}
        />
      </div>
      <CreateCampaignWizardTimeline stepNum={stepNumber} />
    </div>
  );
};
