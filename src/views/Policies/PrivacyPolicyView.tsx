import { PRIVACY_POLICY } from '@/utils/constants/policies/privacy-policy.constants';

export const PrivacyPolicyView = () => {
  return (
    <div className="mx-auto my-10 max-w-4xl rounded-lg p-5 px-5 shadow-lg">
      <h1 className="mb-4 text-center font-bold">{PRIVACY_POLICY.title}</h1>
      <p>{PRIVACY_POLICY.intro}</p>
      <hr className="my-10" />
      <ol className="mt-4">
        {PRIVACY_POLICY.sections.map((section, index) => (
          <li
            key={index}
            className="mb-10"
          >
            <h2>
              <strong>{section.title}</strong>
            </h2>
            <p>{section.content}</p>
          </li>
        ))}
        <li className="mb-10">
          <h2>
            <strong>Contact Us</strong>
          </h2>
          {PRIVACY_POLICY.contact.text}{' '}
          <a href={`mailto:${PRIVACY_POLICY.contact.email}`}>{PRIVACY_POLICY.contact.email}</a>
        </li>
      </ol>
    </div>
  );
};
