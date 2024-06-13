import { Modal } from 'flowbite-react';
import { useState } from 'react';

import { CSAlert } from '@/components/alerts/CSAlert';
import { useUserProfile } from '@/hooks/useUserProfile';

import BrandCompletetionModal from './BrandCompletionModal';
import BrandInfoForm from './BrandInfoForm';
import BrandShowcase from './BrandShowcase';
import { ProgressBar } from '../ProgressBar';
import { InfoTooltip } from '../InfoTooltip';

const steps = [
  { title: 'Tell us a little more about your brand...', component: BrandInfoForm },
  { title: 'Add content that best represents your brand...', component: BrandShowcase },
  { title: "You're ready to go!", component: BrandCompletetionModal },
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

export default BrandProfileCreationSteps;
