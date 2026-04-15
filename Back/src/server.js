const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors());


// conexão banco

const db = mysql.createPool({
    host: "localhost",
    user: "root",
    password: "senai",
    database: "prova_db"
});



// CADASTRO USUÁRIO


app.post("/api/cadastro", async (req, res) => {

    const { cpf, senha, tipo } = req.body;

    try {

        await db.query(
            `
            INSERT INTO usuarios (cpf, senha, tipo)
            VALUES (?, ?, ?)
            `,
            [cpf, senha, tipo]
        );

        res.status(201).json({
            message: "Usuário cadastrado com sucesso"
        });

    } catch (error) {

        res.status(500).json({
            error: "Erro ao cadastrar usuário"
        });

    }

});



// LOGIN


app.post("/api/login", async (req, res) => {

    const { cpf, senha } = req.body;

    try {

        const [rows] = await db.query(
            `
            SELECT *
            FROM usuarios
            WHERE cpf = ?
            AND senha = ?
            `,
            [cpf, senha]
        );

        if (rows.length === 0) {

            return res.status(401).json({
                error: "CPF ou senha inválidos"
            });

        }

        const usuario = rows[0];

        res.json({
            message: "Login realizado",
            userId: usuario.id,
            tipo: usuario.tipo
        });

    } catch (error) {

        res.status(500).json({
            error: "Erro no servidor"
        });

    }

});



// LISTAR MÉDICOS


app.get("/api/medicos", async (req, res) => {

    try {

        const [rows] = await db.query(
            `
            SELECT id, nome
            FROM usuarios
            WHERE tipo = 'medico'
            `
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: "Erro ao buscar médicos"
        });

    }

});



// CRIAR CONSULTA


app.post("/api/consultas", async (req, res) => {

    const {
        medico_id,
        paciente_nome,
        data_consulta,
        hora_consulta
    } = req.body;

    try {

        const [existe] = await db.query(
            `
            SELECT *
            FROM consultas
            WHERE medico_id = ?
            AND data_consulta = ?
            AND hora_consulta = ?
            `,
            [medico_id, data_consulta, hora_consulta]
        );

        if (existe.length > 0) {

            return res.status(400).json({
                error: "Horário já ocupado"
            });

        }


        await db.query(
            `
            INSERT INTO consultas
            (
                medico_id,
                paciente_nome,
                data_consulta,
                hora_consulta
            )
            VALUES (?, ?, ?, ?)
            `,
            [
                medico_id,
                paciente_nome,
                data_consulta,
                hora_consulta
            ]
        );

        res.status(201).json({
            message: "Consulta criada com sucesso"
        });

    } catch (error) {

        res.status(500).json({
            error: "Erro ao criar consulta"
        });

    }

});



// LISTAR CONSULTAS


app.get("/api/consultas", async (req, res) => {

    try {

        const [rows] = await db.query(
            `
            SELECT
                consultas.id,
                usuarios.nome AS medico,
                paciente_nome,
                data_consulta,
                hora_consulta
            FROM consultas
            JOIN usuarios
                ON consultas.medico_id = usuarios.id
            ORDER BY data_consulta, hora_consulta
            `
        );

        res.json(rows);

    } catch (error) {

        res.status(500).json({
            error: "Erro ao listar consultas"
        });

    }

});


app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});