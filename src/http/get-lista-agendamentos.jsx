export async function getListaAgendamentos() {
  const response = await fetch("https://agenda-yfs.vercel.app/agenda-pendente", {
    method: "GET",
    headers: {
      "Cache-Control": "no-cache", // Garante que não utiliza cache
    },
  });

  if (!response.ok) {
    throw new Error("Erro ao buscar agendamentos");
  }

  const data = await response.json();
  return data.agendaPendente;
}