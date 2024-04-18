import { CSButton } from '@/components/common';
import { Modal } from 'flowbite-react';
import { InfoCircle } from 'flowbite-react-icons/outline';
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

interface ProfileCreationModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const ProfileCreationModal: React.FC<ProfileCreationModalProps> = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const navigate = useNavigate();
  const modalRef = useRef<HTMLDivElement>(null);

  const closeModalOnOutsideClick = (event: MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(event.target as Node)) {
      onClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('mousedown', closeModalOnOutsideClick);
    }
    return () => {
      document.removeEventListener('mousedown', closeModalOnOutsideClick);
    };
  }, [isOpen, onClose]);

  const goToCreateUserProfile = () => {
    navigate('/'); // TODO: ROUTE NEEDS TO CHANGE TO CORRECT ONE
  }

  return (
    <Modal
      show={isOpen}
      onClose={onClose}
      ref={modalRef}
      className="border-none"
    >
      <Modal.Header
        className="border-none"
        style={{
          height: '50px',
        }}
      >
        <div className="flex items-center space-x-2">
          <InfoCircle
            className="text-custom-blue mt-0"
            size={15}
          />
          <p
            className="text-custom-blue"
            style={{ fontWeight: '600' }}
          >
            One more thing...
          </p>
        </div>
      </Modal.Header>
      <Modal.Body className="text-custom-blue border-none">
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
          onClick={goToCreateUserProfile}
          className="w-50 mb-8 flex h-9 cursor-pointer items-center justify-center rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
        >
          Create Profile
        </CSButton>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileCreationModal;
