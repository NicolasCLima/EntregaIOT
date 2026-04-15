import { useNavigate } from "react-router-dom";

function Menu() {

    const navigate = useNavigate();


    function sair() {

        localStorage.removeItem("userId");

        navigate("/");

    }


    return (

        <div>

            <h2>Menu principal</h2>

            <button
                onClick={() => navigate("/agendamento")}
            >
                Agendar consulta
            </button>

            <br /><br />

            <button onClick={sair}>
                Sair
            </button>

        </div>

    );

}

export default Menu;