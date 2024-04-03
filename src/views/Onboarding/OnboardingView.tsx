import { useForm } from 'react-hook-form';
import { OnboardingBreadcrumbs } from './components/OnboardingBreadcrumbs';

interface AccountSetupFormFields {
  firstName: string;
  lastName: string;
  phone: string;
  city: string;
  state: string;
  profilePhoto: FileList;
}

export const OnboardingView = () => {
  const { register, handleSubmit } = useForm<AccountSetupFormFields>();
  const onSubmit = (data: AccountSetupFormFields) => {
    console.log(data);
    // Handle form submission
  };

  return (
    <div className="flex h-screen">
      <OnboardingBreadcrumbs stepNum={1} />
      <div className="flex w-3/4 flex-col items-center justify-center p-8">
        <div className="w-full max-w-xl">
          <h3 className="mb-10 text-center text-2xl font-bold text-black">
            Let&apos;s start with the basics...
          </h3>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className=" space-y-10 space-y-6 bg-white p-10"
          >
            <div className="mb-0 text-left">
              <label
                htmlFor="profilePhoto"
                className="mb-2 block text-sm font-semibold text-gray-700"
              >
                Profile photo
              </label>
              <div className="flex items-center">
                <label
                  htmlFor="profilePhoto"
                  className="cursor-pointer rounded-l-xl border border-blue-600 bg-blue-600 px-4 py-2 text-white"
                >
                  Choose file
                </label>
                <div className="relative flex-1 rounded-r-xl border border-gray-300 px-4 py-2 text-gray-700">
                  <span id="file-chosen">No file chosen</span>
                  <input
                    type="file"
                    id="profilePhoto"
                    {...register('profilePhoto')}
                    className="absolute inset-0 h-full w-full cursor-pointer opacity-0"
                    onChange={(event) => {
                      //Need to add code here
                    }}
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
                {...register('firstName')}
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
                {...register('lastName')}
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
                {...register('phone')}
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
