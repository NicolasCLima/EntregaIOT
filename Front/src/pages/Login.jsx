import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

function Login() {

    const navigate = useNavigate();

    const [cpf, setCpf] = useState("");
    const [senha, setSenha] = useState("");


    async function handleLogin() {

        const response = await fetch(`${API}/login`, {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify({
                cpf,
                senha
            })

        });


        const data = await response.json();


        if (response.ok) {

            localStorage.setItem("userId", data.userId);

            navigate("/menu");

        } else {

            alert(data.error);

        }

    }


    function esqueciSenha() {

        const cpfDigitado = prompt("Digite seu CPF");

        if (!cpfDigitado) return;

        alert("Recuperação simulada enviada");

    }


    return (

        <div>

            <h2>Login</h2>

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

            <button onClick={handleLogin}>
                Entrar
            </button>

            <br /><br />

            <button onClick={() => navigate("/cadastro")}>
                Criar conta
            </button>

            <br /><br />

            <button onClick={esqueciSenha}>
                Esqueci minha senha
            </button>

        </div>

    );

}

export default Login;