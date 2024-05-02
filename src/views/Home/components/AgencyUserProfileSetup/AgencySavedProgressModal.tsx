import { CSButton } from '@/components';
import { useUserProfile } from '@/hooks/useUserProfile';
import { type User } from '@/stores/authStore';
import { Modal } from 'flowbite-react';
import { BadgeCheck } from 'flowbite-react-icons/outline';
import { useNavigate } from 'react-router-dom';
import check from '@/assets/agencyCheck.svg';

const AgencySavedProgressModal = () => {
  const navigate = useNavigate();
  const { user, nextStep, setIsProfileCreationStepsOpen, completeProfile, closeModal } =
    useUserProfile();

  // const goToCompletedProfile = () => {
  //   completeProfile();
  //   closeModal();
  //   setIsProfileCreationStepsOpen(false);
  // };

  return (
    <Modal
      show={true}
      onClose={closeModal}
      className="border-none"
    >
      <Modal.Header
        className="border-none"
        style={{
          backgroundColor: '#F3FAF7',
        }}
      >
        <div className="flex items-center space-x-2">
          <img
            src={check}
            alt="check"
          />
          <p
            className="text-custom-blue"
            style={{ fontWeight: '600', color: '#152a23' }}
          >
            You&apos;re ready to go!
          </p>
        </div>
      </Modal.Header>
      <Modal.Body
        className="border-none text-custom-blue"
        style={{ backgroundColor: '#F3FAF7', color: '#152a23' }}
      >
        <p>Invite your clients and start growing your agency today!</p>
      </Modal.Body>
      <Modal.Footer
        className="border-none"
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: '#F3FAF7',
        }}
      >
        <CSButton
          onClick={nextStep}
          style={{ backgroundColor: '#152a23' }}
          className="w-50 mb-8 flex h-9 cursor-pointer items-center justify-center rounded-lg bg-black text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
        >
          Invite Clients
        </CSButton>
      </Modal.Footer>
    </Modal>
  );
};

export default AgencySavedProgressModal;
