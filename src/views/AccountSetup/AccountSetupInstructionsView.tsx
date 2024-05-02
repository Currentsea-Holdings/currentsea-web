import loginBackground from '@/assets/images/authentication/login-background.png';
import logo from '@/assets/logo-title-black.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

interface AccountSetupFormFields {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  profilePhoto: FileList;
}

export const AccountSetupInstructionsView: React.FC = () => {
  const { register, handleSubmit } = useForm<AccountSetupFormFields>();
  const navigate = useNavigate();
  const [selectedFileName, setSelectedFileName] = useState('No file chosen');
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [currentStep, setCurrentStep] = useState(1);


  const onSubmit = (data: AccountSetupFormFields) => {
    console.log(data);

    setCurrentStep(2); //Updated to 2 after creator info is done

    navigate('/connect-social-media')
    // Handle form submission
  };

  // Handle file selection
  // const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
  //   // Using optional chaining and nullish coalescing operator
  //   const fileName = event.target.files?.[0]?.name ?? 'No file chosen';
  //   setSelectedFileName(fileName);
  // };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      setSelectedFileName(file.name);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreviewUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setSelectedFileName('No file chosen');
      setImagePreviewUrl('');
    }
  };

  return (
    <div className="flex h-screen">
      <div className="w-full bg-cover bg-center bg-no-repeat p-4 md:w-1/3"
        style={{ backgroundImage: `url(${loginBackground})` }}
      >
        <div className="flex h-full flex-col items-center justify-center">
          <div className="relative mt-12 min-h-[45%] w-5/6 rounded-lg bg-white p-8 text-center shadow-md">
            {/* Logo */}
            <img
              src={logo}
              alt="CurrentSea logo"
              className="md:w-30 lg:w-30 xl:w-30 mx-auto -mt-4 mb-8 h-auto w-32 max-w-xs"
            />

            <h2 className="mb-0 ml-2 text-left text-xl font-semibold text-black">Account set up</h2>
            <p className="mb-4 ml-2 text-left text-sm">Start earning in 3 easy steps!</p>

            <div className={`text-left text-sm ml-2 relative ${currentStep >= 1 ? ' text-blue-600' : 'text-gray-600'}`}>
              
              <div className="mb-2 flex items-center">
                <div className={`w-6 h-6 flex items-center justify-center border ${currentStep >= 1 ? '  border-blue-600 text-blue-600' : 'border-gray-600 text-gray-600'} rounded-full mr-2`}>
                  {currentStep > 1 ? '✓' : '1'} {/* Replace 1 with a tick if past this step */}
                </div>
                <span className={currentStep == 1 ? 'font-semibold' : 'font-normal'}>Creator Info</span>
              </div>
              {/* Line */}
              <div className={`border-l ${currentStep >= 2 ? 'border-blue-600' : 'border-gray-600'} absolute`} style={{ height: '2.7rem', left: '0.7rem', top: '1.6rem' }}></div>


              <div className="mb-2 mt-12 flex items-center">
              <div className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${currentStep >= 2 ? 'border-blue-600 text-blue-600' : 'border-gray-600 text-gray-600'}`}>
                {currentStep > 2 ? '✓' : '2'}
                </div>
                <span className={currentStep >= 2 ? 'font-semibold' : 'text-gray-600 font-normal'}>Social Media</span>
              </div>
              {/* Line */}
              <div className={`border-l ${currentStep >= 3 ? 'border-blue-600' : 'border-gray-600'} absolute`} style={{ height: '2.7rem', left: '0.7rem', top: '6.2rem' }}></div>

              <div className="mt-12 flex items-center">
                <div className={`mr-2 flex h-6 w-6 items-center justify-center rounded-full border ${currentStep >= 3 ? 'border-blue-600 text-blue-600' : 'border-gray-600 text-gray-600'}`}>
                  3
                </div>
                <span className={currentStep >= 3 ? 'font-semibold' : 'text-gray-600 font-normal'}>Earnings Set up</span>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="flex w-3/4 flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <h3 className="mb-10 text-center text-2xl font-bold text-black">
            Let&apos;s start with the basics...
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="space-y-6 bg-white p-10"
          >
            <div className="mb-4 text-left">
              <label
                htmlFor="profilePhoto"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Profile photo
              </label>

              <div className="flex items-center ">
                {/* Profile Image Preview */}
                {imagePreviewUrl && (
                  <div className="mr-2 shrink-0">
                    <img
                      src={imagePreviewUrl}
                      alt="Profile preview"
                      className="h-12 w-12 rounded-full object-cover"
                    />
                  </div>
                )}

                {/* Choose File Button */}
                <label
                  htmlFor="profilePhoto"
                  className="cursor-pointer rounded-l-xl border border-blue-600 bg-blue-600 px-4 py-2 text-sm text-white"
                >
                  Choose file
                </label>

                {/* File Name Display */}
                <div className="relative flex flex-1 items-center overflow-hidden rounded-r-xl border border-gray-300 px-4 py-2 text-sm text-gray-700">
                  <span className="overflow-hidden overflow-ellipsis whitespace-nowrap">
                    {selectedFileName}
                  </span>
                  <input
                    type="file"
                    id="profilePhoto"
                    {...register('profilePhoto')}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={handleFileChange}
                  />
                </div>
              </div>
            </div>

            <div>
              <label
                htmlFor="First name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                First name
              </label>
              <input
                id="firstName"
                type="text"
                {...register('firstName', { required: 'First name is required'})}
                className="block w-full  rounded-xl border border-gray-300 p-2 text-gray-700"
              />
            </div>
            <div>
              <label
                htmlFor="Last name"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Last name
              </label>
              <input
                id="lastName"
                type="text"
                {...register('lastName', { required: 'Last name is required'})}
                className="block w-full rounded-xl border border-gray-300 p-2"
              />
            </div>
            <div>
              <label
                htmlFor="Phone"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Phone
              </label>
              <input
                id="phone"
                type="text"
                {...register('phone', { required: 'Phone no is required'})}
                className="block w-full rounded-xl border border-gray-300 p-2"
              />
            </div>
            <div className="mb-6 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="city"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  City
                </label>
                <input
                  id="city"
                  type="text"
                  {...register('city')}
                  className="form-input mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
                />
              </div>

              <div className="w-1/3">
                <label
                  htmlFor="state"
                  className="mb-2 block text-sm font-semibold text-gray-700"
                >
                  State
                </label>
                <select
                  id="state"
                  {...register('state')}
                  className="form-select mt-1 block w-full rounded-xl border-gray-300 text-gray-700"
                >
                  <option value="">Select</option>
                  {/* Need to Add more states */}
                  <option value="state1">State 1</option>
                  <option value="state2">State 2</option>
                  <option value="state3">State 3</option>
                </select>
              </div>
            </div>
            <button
              type="submit"
              className="w-full rounded-xl border-gray-300 bg-gray-300 px-4 py-2 font-bold text-white hover:bg-blue-700"
            >
              Next: Social Media
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AccountSetupInstructionsView;
