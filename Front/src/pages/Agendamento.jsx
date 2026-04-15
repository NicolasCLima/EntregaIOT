import { useEffect, useState } from "react";
import API from "../services/api";

function Agendamento() {

    const [medicos, setMedicos] = useState([]);
    const [consultas, setConsultas] = useState([]);

    const [medico, setMedico] = useState("");
    const [paciente, setPaciente] = useState("");
    const [data, setData] = useState("");
    const [hora, setHora] = useState("");


    useEffect(() => {

        buscarMedicos();
        buscarConsultas();

    }, []);


    async function buscarMedicos() {

        const res = await fetch(`${API}/medicos`);

        const data = await res.json();

        setMedicos(data);

    }


    async function buscarConsultas() {

        const res = await fetch(`${API}/consultas`);

        const data = await res.json();

        setConsultas(data);

    }


    async function agendar() {

        const response = await fetch(`${API}/consultas`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({

                medico_id: medico,
                paciente_nome: paciente,
                data_consulta: data,
                hora_consulta: hora

            })

        });


        const result = await response.json();

        alert(result.message || result.error);

        buscarConsultas();

    }


    return (

        <div>

            <h2>Agendamento</h2>

            <select
                onChange={(e) => setMedico(e.target.value)}
            >

                <option>
                    Escolha médico
                </option>

                {
                    medicos.map((m) => (

                        <option
                            key={m.id}
                            value={m.id}
                        >
                            {m.nome}
                        </option>

                    ))
                }

            </select>


            <br /><br />


            <input
                placeholder="Paciente"
                onChange={(e) => setPaciente(e.target.value)}
            />


            <br /><br />


            <input
                type="date"
                onChange={(e) => setData(e.target.value)}
            />


            <br /><br />


            <input
                type="time"
                onChange={(e) => setHora(e.target.value)}
            />


            <br /><br />


            <button onClick={agendar}>
                Agendar
            </button>


            <h3>Consultas cadastradas</h3>


            {
                consultas.map((c) => (

                    <div key={c.id}>

                        {c.medico} |
                        {c.paciente_nome} |
                        {c.data_consulta} |
                        {c.hora_consulta}

                    </div>

                ))
            }

        </div>

    );

}

export default Agendamento;