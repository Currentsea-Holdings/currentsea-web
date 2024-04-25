import { Modal } from 'flowbite-react';
import { useState, useEffect } from 'react';
import CreatorInfoForm from './CreatorInfoForm';
import { type User, useAuthStore } from '@/stores/authStore';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import ProfileCreationModal from './ProfileCreationModal';
import { useUserProfile } from '@/hooks/useUserProfile';
import BaseRateForm from './BaseRateForm';
import Showcase from './Showcase';
import CompletetionModal from './CompletionModal';

const steps = [
  { title: 'One more thing...', component: ProfileCreationModal },
  { title: 'Tell us a little more about yourself...', component: CreatorInfoForm },
  { title: 'Set your base rates...', component: BaseRateForm },
  { title: 'Showcase your best content...', component: Showcase },
  { title: 'You\'re read to go!', component: CompletetionModal },
];

const ProfileCreationSteps = () => {
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

export default ProfileCreationSteps;
