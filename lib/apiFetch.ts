import useAuthStore from '@/store/useAuthStore';
import useSettingsStore from '@/store/useSettingStore';

export async function apiFetch(
  path: string,
  options: RequestInit = {}
) {
  const baseUrl = useSettingsStore.getState().serverUrl; 
  const token = useAuthStore.getState().token; 

  const originalHeaders: Record<string, string> =
    options.headers instanceof Headers
      ? Object.fromEntries(options.headers.entries())
      : (options.headers as Record<string, string>) || {};

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...originalHeaders,
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };

  const response = await fetch(`${baseUrl}${path}`, {
    ...options,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response;
}
