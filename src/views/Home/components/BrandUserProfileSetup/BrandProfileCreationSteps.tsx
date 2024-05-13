import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import CreatorInfoForm from './BrandInfoForm';

import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import BrandProfileCreationModal from './BrandProfileCreationModal';
import BrandInfoForm from './BrandInfoForm';
import BrandShowcase from './BrandShowcase';
import BrandCompletetionModal from './BrandCompletionModal';

const steps = [
  { title: 'One more thing...', component: BrandProfileCreationModal },
  { title: 'Tell us a little more about your brand...', component: BrandInfoForm },
  { title: 'Add content that best represents your brand...', component: BrandShowcase },
  { title: 'You\'re read to go!', component: BrandCompletetionModal },
];

const BrandProfileCreationSteps = () => {
  const { user, currentStep, nextStep, completeProfile, profileCompleted } = useUserProfile();

  if (profileCompleted) {
    return null;
  }

  const CurrentForm = steps[currentStep].component;

  return (
    <Modal
      show={true}
      onClose={completeProfile}
    >
      <Modal.Header>{steps[currentStep].title}</Modal.Header>
      <Modal.Body>
        <CurrentForm />
      </Modal.Body>
    </Modal>
  );
};

export default BrandProfileCreationSteps;
