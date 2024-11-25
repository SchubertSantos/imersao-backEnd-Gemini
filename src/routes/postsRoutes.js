import express from "express";
import multer from "multer";
import { listarPosts, postarNovoPost, uploadImagem, atualizarNovoPost } from "../Controllers/postsController.js";
import cors from "cors";


const corsOptions = {
  origin: "http://localhost:8000", 
  optionsSuccessStatus: 200
}

// Configura o armazenamento para os arquivos enviados
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    // Define o diretório para salvar os arquivos enviados
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    // Mantém o nome original do arquivo enviado
    cb(null, file.originalname);
  }
})

// Cria um middleware Multer para upload de arquivos
const upload = multer({ dest: ".uploads", storage });
// Opcional para sistemas Linux/Mac: define o diretório de destino (comentar a linha anterior)
// const upload = multer({ dest: ".uploads" })

// Função para definir as rotas da aplicação
const routes = (app) => {
  // Permite que o servidor entenda requisições com formato JSON
  app.use(express.json());
  app.use(cors(corsOptions));
  
  // Rota GET para listar todos os posts
  app.get("/posts", listarPosts);

  // Rota POST para criar um novo post
  app.post("/posts", postarNovoPost);

  // Rota POST para upload de imagem
  // Utiliza o middleware 'upload.single("imagem")' para processar o upload de um único arquivo chamado "imagem"
  app.post("/upload", upload.single("imagem"), uploadImagem);

  app.put("/upload/:id", atualizarNovoPost);
}

export default routes;