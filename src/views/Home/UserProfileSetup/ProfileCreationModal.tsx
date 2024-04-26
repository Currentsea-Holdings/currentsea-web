import { CSButton } from '@/components';
import { useUserProfile } from '@/hooks/useUserProfile';
import { type User } from '@/stores/authStore';
import { Modal } from 'flowbite-react';
import { InfoCircle } from 'flowbite-react-icons/outline';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import tooltip from '@/assets/tooltip.svg';

const ProfileCreationModal = () => {
  const { user, nextStep, setIsProfileCreationStepsOpen, closeModal } = useUserProfile();


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
          <img src={tooltip} alt="tooltip" />
          {/* <InfoCircle
            className="mt-0 text-custom-blue"
            size={15}
          /> */}
          <p
            className="text-custom-blue"
            style={{ fontWeight: '600' }}
          >
            One more thing...
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="border-none text-custom-blue">
        <p>
          Before you get started, you need a profile. Stand out from other creators with an epic
          profile.
        </p>
      </Modal.Body>
      <Modal.Footer
        className="border-none"
        style={{ height: '50px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <CSButton
          onClick={nextStep}
          className="w-50 mb-8 flex h-9 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
        >
          Create Profile
        </CSButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileCreationModal;
