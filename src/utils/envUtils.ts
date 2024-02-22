/**
 * Checks if the current environment is development.
 * @returns {boolean} True if the environment is development, false otherwise.
 */
export const isDevelopmentMode = (): boolean => {
  return import.meta.env.DEV;
};
