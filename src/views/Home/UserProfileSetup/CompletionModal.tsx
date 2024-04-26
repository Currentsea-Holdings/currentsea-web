import { CSButton } from '@/components/common';
import { useUserProfile } from '@/hooks/useUserProfile';
import { type User } from '@/stores/authStore';
import { Modal } from 'flowbite-react';
import { BadgeCheck } from 'flowbite-react-icons/outline';
import { useNavigate } from 'react-router-dom';
import check from '@/assets/check.svg';

const CompletetionModal = () => {
  const navigate = useNavigate();
  const { user, nextStep, setIsProfileCreationStepsOpen, completeProfile, closeModal } = useUserProfile();


  const goToCompletedProfile = () => {
    completeProfile();
    closeModal();
    setIsProfileCreationStepsOpen(false);
  };

  return (
    <Modal
      show={true}
      onClose={closeModal}
      className="border-none"
    >
      <Modal.Header
        className="border-none"
        style={{
          height: '50px',
        }}
      >
        <div className="flex items-center space-x-2">
          <img
            src={check}
            alt="check"
          />
          <p
            className="text-custom-blue"
            style={{ fontWeight: '600' }}
          >
            You&apos;re read to go!
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="border-none text-custom-blue">
        <p>Checkout your profile here.</p>
      </Modal.Body>
      <Modal.Footer
        className="border-none"
        style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CSButton
          onClick={goToCompletedProfile}
          className="w-50 mb-8 flex h-9 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
        >
          View Profile
        </CSButton>
      </Modal.Footer>
    </Modal>
  );
};

export default CompletetionModal;
