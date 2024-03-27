export const censorEmail = (email: string): string => {
  const [username, domain] = email.split("@");
  const censoredUsername = `${username[0]}${username[1]}${"*".repeat(
    username.length - 1
  )}`;
  const domainParts = domain.split(".");
  const censoredDomain = domainParts
    .map((part, index) => {
      if (index === 0) {
        return part[0] + "*".repeat(part.length - 1);
      }
      return part;
    })
    .join(".");

  return `${censoredUsername}@${censoredDomain}`;
};
