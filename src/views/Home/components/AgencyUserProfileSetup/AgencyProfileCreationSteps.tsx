import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Modal, Progress, getTheme } from 'flowbite-react';
import { useState } from 'react';

import { CSAlert } from '@/components/alerts/CSAlert';
import { useUserProfile } from '@/hooks/useUserProfile';

import AgencyEmailInviteConfirmation from './AgencyEmailInviteConfirmation';
import AgencyInfoForm from './AgencyInfoForm';
import AgencySavedProgressModal from './AgencySavedProgressModal';
import AgencyShowcase from './AgencyShowcase';
import InviteClientsForm from './InviteClientsForm';
import { ProgressBar } from '../ProgressBar';
import { InfoTooltip } from '../InfoTooltip';

const steps = [
  { title: 'Tell us a little more about yourself...', component: AgencyInfoForm },
  { title: 'Amplify some of your clients work...', component: AgencyShowcase },
  { title: "You're read to go!", component: AgencySavedProgressModal },
  { title: 'Invite Clients', component: InviteClientsForm },
  { title: 'Invites have been sent!', component: AgencyEmailInviteConfirmation },
];

const AgencyProfileCreationSteps = () => {
  const { currentStep, completeProfile, profileCompleted } = useUserProfile();

  const [showModal, setShowModal] = useState(false);

  if (profileCompleted) {
    return null;
  }

  const CurrentForm = steps[currentStep].component;

  const progressTheme: CustomFlowbiteTheme['progress'] = {
    ...getTheme().progress,
    base: `${getTheme().progress.base} rounded-none`,
    bar: `${getTheme().progress.bar} rounded-none`,
  };

  return (
    <>
      <CSAlert
        color="gray"
        title={'One more thing...'}
        message="Before you get started, you need a profile. Get started now!"
        buttonText="Create profile"
        onButtonClick={() => {
          setShowModal(true);
        }}
      />
      <Modal
        show={showModal}
        onClose={completeProfile}
      >
        <Modal.Header></Modal.Header>
        <ProgressBar
          currentStep={currentStep}
          totalSteps={steps.length}
        />
        <Modal.Body className="flex flex-col md:min-h-[700px]">
          <span className="flex">
            <h1 className="mb-6 text-3xl font-semibold text-dark">{steps[currentStep].title}</h1>
          </span>
          <CurrentForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AgencyProfileCreationSteps;
