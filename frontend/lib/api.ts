export async function apiFetch(url: string, options: any = {}) {
  const token = localStorage.getItem("token");

  const res = await fetch(`http://localhost:3000${url}`, {
    ...options,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
      ...options.headers,
    },
  });

  return res.json();
}
