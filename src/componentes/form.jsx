import React, { useState } from "react";
import Button from "./button";
import "./form.css";
import Input from "./input";
import { FaX } from "react-icons/fa6";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import { DemoContainer, DemoItem } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import iconCalendario from "../assets/calendar.svg";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Toastify from "toastify-js";
import { useQuery } from "@tanstack/react-query";
import { getListaAgendamentos } from "../http/get-lista-agendamentos";

dayjs.locale("pt-br");

function Form() {
  const date = dayjs().format("YYYY-MM-DD");
  const [valueData, setValueData] = useState(dayjs(date.toString()));
  const [valueHr, setValueHr] = useState("");
  const [janelaUp, janelaDisplay] = useState(false);
  const [nome, setNome] = useState("");
  const [musica, setMusica] = useState("");
  const [procedimento, setProcedimento] = useState("");
  const [verificaDia, setVerificaDia] = useState({
    "08:30h": true,
    "13:30h": true,
    "17:30h": true,
  });

  const { data } = useQuery({
    queryKey: ["agenda"],
    queryFn: getListaAgendamentos,
    staleTime: 1000 * 60,
  });

  // Agrupar os agendamentos por data e verificar os horários ocupados
  const horariosOcupadosPorDia = data?.reduce((acc, agendamento) => {
    const dataFormatada = dayjs(agendamento.data).format("YYYY-MM-DD");
    const horarioFormatado = agendamento.hora;

    if (!acc[dataFormatada]) {
      acc[dataFormatada] = [];
    }

    acc[dataFormatada].push(horarioFormatado);
    return acc;
  }, {});

  const MudarDisplay = () => {
    janelaDisplay(!janelaUp);
  };

  const VerificaDia = (dataV) => {
    const fds = dayjs(dataV).day(); // Retorna o índice do dia (0 = domingo, 1 = segunda, ..., 6 = sábado)
    const dataFormatada = dayjs(dataV).format("YYYY-MM-DD");

    // Horários disponíveis
    const horarios = ["08:30h", "13:30h", "17:30h"];

    // Horários ocupados para a data selecionada
    const horariosOcupados = horariosOcupadosPorDia?.[dataFormatada] || [];

    const novoVerificaDia = {};

    // biome-ignore lint/complexity/noForEach: <explanation>
    horarios.forEach((horario) => {
      // Desabilita horário se estiver ocupado
      if (horariosOcupados.includes(horario)) {
        novoVerificaDia[horario] = true; // Desabilitado
      } else {
        // Lógica específica para cada tipo de dia
        if (fds === 0) {
          // Domingo: todos os horários ficam habilitados
          novoVerificaDia[horario] = false;
        } else if (fds >= 1 && fds <= 5) {
          // Dias úteis: apenas 17:30h fica habilitado
          novoVerificaDia[horario] = horario !== "17:30h";
        } else if (fds === 6) {
          // Sábado: apenas 13:30h e 17:30h ficam habilitados
          novoVerificaDia[horario] = horario === "08:30h";
        }
      }
    });

    setVerificaDia(novoVerificaDia);

    // Resetar o horário selecionado se estiver desabilitado
    if (novoVerificaDia[valueHr]) {
      setValueHr("");
    }
  };

  const SubmitData = () => {
    if (valueData < dayjs(date.toString())) {
      Toastify({
        text: "Data inválida! Selecione a data atual ou futura.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ef4444",
        },
      }).showToast();
      return;
    }

    if (!valueHr) {
      Toastify({
        text: "Selecione um horário.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ef4444",
        },
      }).showToast();
      return;
    }
    MudarDisplay();
  };

  const Enviar = () => {
    if (!procedimento || !nome || !musica || !valueData || !valueHr) {
      Toastify({
        text: "Por favor, preencha todos os campos antes de enviar.",
        duration: 3000,
        close: true,
        gravity: "top",
        position: "right",
        stopOnFocus: true,
        style: {
          background: "#ef4444",
        },
      }).showToast();
      return;
    }


    const mensagem = `Procedimento: ${procedimento}%0ANome: ${nome}%0AMúsica: ${musica}%0AData: ${valueData.format(
      "dddd, DD MMMM YYYY"
    )}%0AHorário: ${valueHr}`;

    const numeroTel = "558898072612";
    const url = `https://wa.me/${numeroTel}?text=${mensagem}`;

    window.open(url, "_blank");
  };

  const Ajuda = () => {
    const mensagem =
      "Olá! Estou interessada nos procedimentos e gostaria de mais informações.";

    const numeroTel = "558898072612";
    const url = `https://wa.me/${numeroTel}?text=${mensagem}`;

    window.open(url, "_blank");
  };

  return (
    <div className="form">
      <h2>{}</h2>
      <label className="label-form" htmlFor="procedimento">
        Qual o tipo de procedimento?
      </label>
      <select
        className="procedimento"
        value={procedimento}
        onChange={(e) => setProcedimento(e.target.value)}
      >
        <option value="" disabled>
          Clique para escolher
        </option>
        <option value="Alongamento">Alongamento</option>
        <option value="Manutenção">Manutenção</option>
        <option value="Esmaltação">Esmaltação</option>
      </select>
      <label className="label-form" htmlFor="nome">
        Nome
      </label>
      <Input
        id="nome"
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <label className="label-form" htmlFor="musica">
        Qual estilo de música você curte?
      </label>
      <Input
        id="musica"
        type="text"
        value={musica}
        onChange={(e) => setMusica(e.target.value)}
      />
      <label className="label-form" htmlFor="button">
        Selecione o melhor dia e horário
      </label>
      <button
        id="button"
        type="button"
        className="exibir-data"
        onClick={MudarDisplay}
      >
        <span>
          <img src={iconCalendario} alt="" />
        </span>
        <p>
          {valueData && valueHr
            ? `${valueData.format("dddd, DD MMMM YYYY")} às ${valueHr}`
            : "Nenhuma data selecionada"}
        </p>
      </button>
      <div id="form-calendario" style={{ display: janelaUp ? "flex" : "none" }}>
        <div className="calendario">
          <FaX className="icon-fechar" onClick={MudarDisplay} />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale="pt-br"
          >
            <DemoContainer components={["DateCalendar"]}>
              <DemoItem>
                <DateCalendar
                  views={["day"]}
                  value={valueData}
                  onChange={(newValue) => {
                    setValueData(newValue);
                    VerificaDia(newValue);
                  }}
                  shouldDisableDate={(date) => {
                    // Desabilita datas anteriores ao dia atual
                    return dayjs(date).isBefore(dayjs(), "day");
                  }}
                />
              </DemoItem>
            </DemoContainer>
          </LocalizationProvider>

          <FormControl component="fieldset">
            <FormLabel component="legend">Horários Disponíveis</FormLabel>
            <RadioGroup
              value={valueHr}
              onChange={(e) => setValueHr(e.target.value)}
              row
            >
              <FormControlLabel
                value="08:30h"
                control={<Radio />}
                label="08:30h"
                disabled={verificaDia["08:30h"]}
              />
              <FormControlLabel
                value="13:30h"
                control={<Radio />}
                label="13:30h"
                disabled={verificaDia["13:30h"]}
              />
              <FormControlLabel
                value="17:30h"
                control={<Radio />}
                label="17:30h"
                disabled={verificaDia["17:30h"]}
              />
            </RadioGroup>
          </FormControl>

          <Button text={"Ok"} classS={"bt-confirmar"} onclick={SubmitData} />
        </div>
      </div>
      <div className="bt-form-bottom">
        <Button text={"Agendar"} classS={"bt-confirmar"} onclick={Enviar} />
        <Button text={"Ajuda?"} classS={"bt-ajuda"} onclick={Ajuda} />
      </div>
    </div>
  );
}

export default Form;
