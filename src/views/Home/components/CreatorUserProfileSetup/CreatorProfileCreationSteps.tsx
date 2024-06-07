import { Modal } from 'flowbite-react';
import { useState } from 'react';

import { CSAlert } from '@/components/alerts/CSAlert';
import { useUserProfile } from '@/hooks/useUserProfile';

import BaseRateForm from './CreatorBaseRateForm';
import CompletetionModal from './CreatorCompletionModal';
import CreatorInfoForm from './CreatorInfoForm';
import Showcase from './CreatorShowcase';

const steps = [
  { title: 'Tell us a little more about yourself...', component: CreatorInfoForm },
  { title: 'Set your base rates...', component: BaseRateForm },
  { title: 'Showcase your best content...', component: Showcase },
  { title: "You're read to go!", component: CompletetionModal },
];

const CreatorProfileCreationSteps = () => {
  const { currentStep, completeProfile, profileCompleted } = useUserProfile();

  const [showModal, setShowModal] = useState(false);

  if (profileCompleted) {
    return null;
  }

  const CurrentForm = steps[currentStep].component;

  return (
    <>
      <CSAlert
        color="primary"
        title={'One more thing...'}
        message="Before you get started, you need a profile. Stand out from other creators with an epic profile. Get started now!"
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

export default CreatorProfileCreationSteps;
