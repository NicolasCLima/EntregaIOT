import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Cadastro() {

    const navigate = useNavigate();

    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");
    const [tipo, setTipo] = useState("medico");


    async function cadastrar() {

        const response = await fetch(`${API}/cadastro`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                cpf,
                senha,
                tipo
            })

        });


        const data = await response.json();

        alert(data.message || data.error);


        if (response.ok) {

            navigate("/");

        }

    }


    return (

        <div>

            <h2>Cadastro</h2>

            <input
                placeholder="CPF"
                value={cpf}
                onChange={(e) => setCpf(e.target.value)}
            />

            <br /><br />

            <input
                type="password"
                placeholder="Senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
            />

            <br /><br />

            <select
                value={tipo}
                onChange={(e) => setTipo(e.target.value)}
            >

                <option value="medico">
                    Médico
                </option>

                <option value="admin">
                    Administrativo
                </option>

            </select>

            <br /><br />

            <button onClick={cadastrar}>
                Cadastrar
            </button>

            <br /><br />

            <button onClick={() => navigate("/")}>
                Voltar
            </button>

        </div>

    );

}

export default Cadastro;