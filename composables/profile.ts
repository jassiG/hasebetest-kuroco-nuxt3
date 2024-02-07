const config = useRuntimeConfig();

export default async function getProfile() {
  const res = await useFetch('/rcms-api/13/profile',{
    baseURL:config.public.apiBase,
    credentials: 'include',
  });
  return res.data.value;
}
