export async function getListaAgendamentos() {
  const response = await fetch("https://agenda-yfs.vercel.app/agenda-pendente");
  const data = await response.json();

  return data.agendaPendente;
}
