import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import CreatorInfoForm from './AgencyInfoForm';
import { type User, useAuthStore } from '@/stores/authStore';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import { useUserProfile } from '@/hooks/useUserProfile';
import AgencyProfileCreationModal from './AgencyProfileCreationModal';
import AgencyInfoForm from './AgencyInfoForm';
import AgencyShowcase from './AgencyShowcase';
import AgencyCompletetionModal from './AgencyCompletionModal';


const steps = [
  { title: 'One more thing...', component: AgencyProfileCreationModal },
  { title: 'Tell us a little more about your agency...', component: AgencyInfoForm },
  { title: 'Amplify some of your clients work...', component: AgencyShowcase },
  { title: 'You\'re read to go!', component: AgencyCompletetionModal },
];

const AgencyProfileCreationSteps = () => {
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

export default AgencyProfileCreationSteps;
