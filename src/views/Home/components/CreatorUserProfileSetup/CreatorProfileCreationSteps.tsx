import type { CustomFlowbiteTheme } from 'flowbite-react';
import { Modal, Progress, getTheme } from 'flowbite-react';
import { useState } from 'react';

import { CSAlert } from '@/components/alerts/CSAlert';
import { useUserProfile } from '@/hooks/useUserProfile';

import BaseRateForm from './CreatorBaseRateForm';
import CompletetionModal from './CreatorCompletionModal';
import CreatorInfoForm from './CreatorInfoForm';
import Showcase from './CreatorShowcase';
import { InfoTooltip } from '../InfoTooltip';
import { ProgressBar } from '../ProgressBar';

const steps = [
  { title: 'Tell us a little more about yourself...', component: CreatorInfoForm },
  {
    title: 'Set your base rates...',
    tooltip:
      'These prices are a starting point. You will have the opportunity to negotiate prices with brands.',
    component: BaseRateForm,
  },
  { title: 'Showcase your best content...', component: Showcase },
  { title: "You're ready to go!", component: CompletetionModal },
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
      {currentStep + 1 < steps.length ? (
        <Modal
          show={showModal}
          onClose={completeProfile}
        >
          <Modal.Header></Modal.Header>
          <ProgressBar
            currentStep={currentStep}
            totalSteps={steps.length}
          />
          <Modal.Body className="flex flex-col md:max-h-[700px] md:min-h-[700px]">
            <span className="flex">
              <h1 className="mb-6 text-3xl font-semibold text-dark">{steps[currentStep].title}</h1>
              {steps[currentStep].tooltip && (
                <InfoTooltip
                  content="These prices are a starting point. You will have the opportunity to negotiate prices with brands."
                  size={21}
                  placement="bottom"
                  className="ml-4"
                />
              )}
            </span>
            <CurrentForm />
          </Modal.Body>
        </Modal>
      ) : (
        <CurrentForm />
      )}
    </>
  );
};

export default CreatorProfileCreationSteps;
