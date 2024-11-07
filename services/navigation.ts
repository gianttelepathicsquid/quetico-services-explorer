export const CONTACT_FORM_URL = 'https://queticologistics.com/contact';

export const navigateToContactForm = (source?: string) => {
  // Add UTM parameters or tracking if needed
  const url = new URL(CONTACT_FORM_URL);
  if (source) {
    url.searchParams.append('source', source);
  }
  window.location.href = url.toString();
};
