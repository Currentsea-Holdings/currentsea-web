import { Modal } from 'flowbite-react';
import { useState } from 'react';

import { CSAlert } from '@/components/alerts/CSAlert';
import { useUserProfile } from '@/hooks/useUserProfile';

import AgencyEmailInviteConfirmation from './AgencyEmailInviteConfirmation';
import AgencyInfoForm from './AgencyInfoForm';
import AgencySavedProgressModal from './AgencySavedProgressModal';
import AgencyShowcase from './AgencyShowcase';
import InviteClientsForm from './InviteClientsForm';

const steps = [
  { title: 'Tell us a little more about your agency...', component: AgencyInfoForm },
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
        <Modal.Header>{steps[currentStep].title}</Modal.Header>
        <Modal.Body>
          <CurrentForm />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default AgencyProfileCreationSteps;
