import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Modal } from 'flowbite-react';
import { CSButton } from '@/components';
import { useUserProfile } from '@/hooks/useUserProfile';
import { useMutation } from '@tanstack/react-query';
import { useAuthStore } from '@/stores/authStore';

interface InviteClientsFormFields {
  email: string;
}

interface MutationResponse {
  success: boolean;
  message: string;
}

const updateUserProfile = (data: { emailInvites: string[] }): Promise<MutationResponse> => {
  return Promise.resolve({ success: true, message: 'Updated successfully' });
};

const InviteClientsForm = () => {
  const userProfile = useAuthStore((state) => state.userProfile);
  const { user, nextStep, closeModal } = useUserProfile();
  const [emails, setEmails] = useState<string[]>([]);
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<InviteClientsFormFields>();

  const handleKeyPress = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter' && watch('email')) {
      event.preventDefault();
      setEmails([...emails, watch('email')]);
      reset();
    }
  };

  const handleRemoveEmail = (emailToRemove: string) => {
    setEmails(emails.filter((email) => email !== emailToRemove));
  };

  const mutationFunction = async () => {
    if (!userProfile || !user) throw new Error('User profile is not available.');
    const payload = { emailInvites: emails };
    console.log('Submitting Payload:', payload);
    return await updateUserProfile(payload);
  };

  const { mutate, isPending } = useMutation({
    mutationFn: mutationFunction,
    onSuccess: () => {
      console.log('Invites sent successfully.');
      nextStep();
    },
    onError: (error: Error) => {
      console.error('Error submitting profile:', error);
    },
  });

  const onSubmit = () => {
    mutate();
  };

  return (
    <Modal
      show={true}
      onClose={closeModal}
    >
      <Modal.Header>Invite Clients</Modal.Header>
      <Modal.Body>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
        >
          <div className="flex flex-wrap gap-2">
            {emails.map((email, index) => (
              <div
                key={index}
                className="flex items-center rounded-full bg-gray-200 px-2 py-1"
              >
                <span
                  className="mr-2"
                  style={{ color: '#525d7a', fontSize: '12px' }}
                >
                  {email}
                </span>
                <button
                  type="button"
                  onClick={() => {
                    handleRemoveEmail(email);
                  }}
                  className="text-gray-600 hover:text-gray-900"
                >
                  &times;
                </button>
              </div>
            ))}
          </div>
          <input
            type="email"
            {...register('email')}
            placeholder="Enter email and press enter"
            className="form-input mt-2 w-full rounded border p-2"
            style={{color: 'black'}}
            onKeyDown={handleKeyPress}
          />
          <CSButton
            type="submit"
            disabled={emails.length === 0 || isPending}
            isProcessing={isPending}
            className="mt-4 w-full"
            style={{ backgroundColor: '#a13232'}}
          >
            Invite
          </CSButton>
        </form>
      </Modal.Body>
    </Modal>
  );
};

export default InviteClientsForm;
