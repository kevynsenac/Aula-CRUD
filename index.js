const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db");
app.use(cors());
app.use(express.json());

// Rota de saúde para verificar se o servidor está rodando e o banco de dados está conectado
app.get("/health", async (req, res) => {
  try {
    await db.query("SELECT 1");
    return res.status(200).json({
      status: "ok",
      database: "conectado",
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      database: "desconectado",
      erro: err.message,
    });
  }
});

// --- 1. CREATE (Cadastrar um produto) ---
app.post("/produtos", async (req, res) => {
  const { nome, preco, quantidade } = req.body;
  try {
    const [resultado] = await db.query(
      "INSERT INTO produtos (nome, preco, quantidade) VALUES (?, ?, ?)",
      [nome, preco, quantidade],
    );
    return res.status(201).json({
      status: "created",
      id: resultado.insertId,
      nome,
      preco,
      quantidade,
    });
  } catch (err) {
    return res.status(500).json({
      status: "error",
      erro: err.message,
    });
  }
});

// --- 2. READ (Listar todos os produtos) ---
app.get("/produtos", async (req, res) => {
  try {
    const [produtos] = await db.query("SELECT * FROM produtos");
    return res.status(200).json(produtos);
  } catch (err) {
    return res.status(500).json({
      status: "error",
      erro: err.message,
    });
  }
});

// --- 3. UPDATE (Atualizar um produto) ---
app.put("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  const { nome, preco, quantidade } = req.body;
  try {
    const sql = `UPDATE produtos SET nome = ?, preco = ?, quantidade = ? WHERE id = ?`;
    const [resultado] = await db.query(sql, [nome, preco, quantidade, id]);

    if (resultado.affectedRows === 0)
      return res.status(404).json({ message: "Produto não encontrado!" });
    res
      .status(200)
      .json({ message: `Produto ${nome}, com id ${id} foi atualizado!` });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
});

// --- 4. DELETE (Excluir um produto) ---
app.delete("/produtos/:id", async (req, res) => {
  const { id } = req.params;
  try {
    const sql = `DELETE FROM produtos WHERE id = ?`;
    const [resultado] = await db.query(sql, [id]);
    if (resultado.affectedRows === 0)
      return res.status(404).json({ message: "Produto nao encontrado!" });
    res.status(200).json({ message: `Produto com id ${id} foi deletado!` });
  } catch (err) {
    return res.status(500).json({ erro: err.message });
  }
});

app.listen(3000, () => {
  console.log("Verificação de saúde rodando em http://localhost:3000/health");
  console.log("Produtos sendo mostrados em http://localhost:3000/produtos");
});
