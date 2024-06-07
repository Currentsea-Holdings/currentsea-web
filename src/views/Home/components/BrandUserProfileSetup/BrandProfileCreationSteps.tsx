import { Modal } from 'flowbite-react';
import { useState } from 'react';

import { CSAlert } from '@/components/alerts/CSAlert';
import { useUserProfile } from '@/hooks/useUserProfile';

import BrandCompletetionModal from './BrandCompletionModal';
import BrandInfoForm from './BrandInfoForm';
import BrandShowcase from './BrandShowcase';

const steps = [
  { title: 'Tell us a little more about your brand...', component: BrandInfoForm },
  { title: 'Add content that best represents your brand...', component: BrandShowcase },
  { title: "You're read to go!", component: BrandCompletetionModal },
];

const BrandProfileCreationSteps = () => {
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
        message="Before you get started, you need a profile. Stand out from other brands with an epic profile. Get started now!"
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

export default BrandProfileCreationSteps;
