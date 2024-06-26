import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import { open } from 'sqlite';
import sqlite3 from 'sqlite3';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 3001;

app.use(express.json());

// Conectar ao banco de dados SQLite
const dbPath = path.resolve(__dirname, 'crypto.db');
let db;

// Inicializar o banco de dados
const initializeDb = async () => {
    db = await open({
        filename: dbPath,
        driver: sqlite3.Database
    });
};

initializeDb().catch(err => {
    console.error('Failed to initialize database:', err);
    process.exit(1);
});

// Middleware para tratar erros de SQL
function handleSQLError(res, err) {
    console.error('Erro ao executar consulta SQL:', err);
    res.status(500).json({ error: 'Erro ao processar a requisição.' });
}

// Endpoint para registrar um novo usuário
app.post('/api/register', async (req, res) => {
    const { first_name, last_name, email, password, username } = req.body;
    const sql = 'INSERT INTO users (first_name, last_name, email, password, username) VALUES (?, ?, ?, ?, ?)';

    try {
        await db.run(sql, [first_name, last_name, email, password, username]);
        console.log(`Usuário ${first_name} cadastrado com sucesso!`);
        res.json({ message: 'Usuário cadastrado com sucesso.' });
    } catch (err) {
        console.error('Erro ao registrar usuário:', err);
        res.status(500).json({ error: 'Erro ao cadastrar usuário.' });
    }
});

// Endpoint para login de usuário
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
    const sql = 'SELECT * FROM users WHERE username = ? AND password = ?';

    try {
        const row = await db.get(sql, [username, password]);
        if (!row) {
            return res.status(401).json({ error: 'Credenciais inválidas.' });
        }
        console.log(`Usuário ${row.first_name} logado com sucesso!`);

        res.status(200).json({ message: 'Login bem-sucedido.', user: row });
    } catch (err) {
        console.error('Erro ao fazer login:', err);
        res.status(500).json({ error: 'Erro ao fazer login.' });
    }
});

// Endpoint para adicionar favorito para um usuário
app.post('/api/favorites', (req, res) => {
    const { userId, coinId, coinName } = req.body;
    const sql = 'INSERT or IGNORE INTO favorites (userId, coinId, coinName) VALUES (?, ?, ?)';

    db.run(sql, [userId, coinId, coinName], function (err) {
        if (err) {
            console.error('Erro ao executar consulta SQL:', err);
            return res.status(500).json({ error: 'Erro ao adicionar favorito.' });
        }
    });

    // TODO: acho que é gambiarra
    res.status(200).json({ message: 'Favorito adicionado com sucesso.' });

});


// Endpoint para obter favoritos de um usuário
app.get('/api/favorites/:userId', async (req, res) => {
    const userId = req.params.userId;
    const sql = 'SELECT * FROM favorites WHERE userId = ?';

    try {
        const rows = await db.all(sql, [userId]);
        res.json(rows); // Retorna os favoritos encontrados em formato JSON
    } catch (err) {
        console.error('Erro ao buscar favoritos:', err);
        res.status(500).json({ error: 'Erro ao buscar favoritos.' });
    }
});

// Endpoint para remover favorito de um usuário
app.delete('/api/favorites/:userId/:coinId', async (req, res) => {
    const { userId, coinId } = req.params;
    const sql = 'DELETE FROM favorites WHERE userId = ? AND coinId = ?';

    try {
        await db.run(sql, [userId, coinId]);
        res.json({ message: 'Favorito removido com sucesso.' });
    } catch (err) {
        console.error('Erro ao remover favorito:', err);
        res.status(500).json({ error: 'Erro ao remover favorito.' });
    }
});

// Iniciar o servidor
app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
});

// Encerrar conexão com o banco de dados quando o servidor é encerrado
process.on('SIGINT', () => {
    db.close((err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log('Conexão com o banco de dados fechada.');
        process.exit(0);
    });
});
