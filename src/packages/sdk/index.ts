export function submitForm(
  data: Record<string, unknown>,
): Promise<{ success: boolean }> {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log('Form submitted:', data);
      resolve({ success: true });
    }, 500);
  });
}
