import { useEffect } from 'react';
import { useUserProfile } from '@/hooks/useUserProfile';
import { Modal } from 'flowbite-react';
import { useNavigate } from 'react-router-dom';
import checkCircle from '@/assets/checkCircle.svg';

const AgencyEmailInviteConfirmation = () => {
  const navigate = useNavigate();
  const { user, nextStep, setIsProfileCreationStepsOpen, completeProfile, closeModal } =
    useUserProfile();

  const goToCompletedProfile = () => {
    completeProfile();
    closeModal();
    setIsProfileCreationStepsOpen(false);
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      goToCompletedProfile();
    }, 3000);

    return () => {clearTimeout(timer)};
  }, []);

  return (
    <Modal
      show={true}
      onClose={goToCompletedProfile}
      className="border-none"
    >
      <Modal.Header
        className="border-none"
        style={{ backgroundColor: '#F3FAF7', color: '#152a23' }}
      ></Modal.Header>
      <Modal.Body
        className="text-center"
        style={{ height: '300px', backgroundColor: '#F3FAF7', color: '#152a23' }}
      >
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <img
            src={checkCircle}
            alt="check"
          />
          <p
            className="text-lg font-semibold mt-2"
            style={{ color: '#152a23' }}
          >
            Invites have been sent!
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer
      className="border-none"
      style={{ backgroundColor: '#F3FAF7', color: '#152a23' }}
      ></Modal.Footer>
    </Modal>
  );
};

export default AgencyEmailInviteConfirmation;
