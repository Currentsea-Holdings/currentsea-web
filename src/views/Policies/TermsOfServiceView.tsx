import { TERMS } from '@/utils/constants/policies/terms.constants';

export const TermsOfServiceView = () => {
  return (
    <div className="mx-auto my-10 max-w-4xl rounded-lg p-5 px-5 shadow-lg">
      <h1 className="mb-4 text-center font-bold">{TERMS.title}</h1>
      <p>{TERMS.intro}</p>
      <hr className="my-10" />
      <ol className="mt-4">
        {TERMS.sections.map((section, index) => (
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
          {TERMS.contact.text} <a href={`mailto:${TERMS.contact.email}`}>{TERMS.contact.email}</a>
        </li>
      </ol>
    </div>
  );
};
