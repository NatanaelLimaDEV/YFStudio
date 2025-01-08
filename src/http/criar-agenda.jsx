export async function criarAgenda({
  nome,
  email,
  contato,
  data,
  hora,
  servico,
  musica,
}) {
  await fetch("https://agenda-yfs.vercel.app/agenda", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      nome,
      email,
      contato,
      data,
      hora,
      servico,
      musica,
    }),
  });
}
