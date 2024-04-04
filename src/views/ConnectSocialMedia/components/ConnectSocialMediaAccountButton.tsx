export const ConnectSocialMediaAccountButton = ({
  text,
  onClick,
}: {
  text: string;
  onClick: () => void;
}) => {
  return (
    <button
      onClick={onClick}
      className="h-9 w-40 cursor-pointer rounded-lg bg-primary text-sm text-white transition-colors duration-200 ease-in-out enabled:hover:opacity-90"
    >
      {text}
    </button>
  );
};
