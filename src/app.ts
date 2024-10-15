import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import dotenv from 'dotenv';
import router from './routes';

dotenv.config();

class App {
    public app: express.Express;

    constructor() {
        this.app = express();
        this.config();
        this.routes();
    }

    private config(): void {
        this.app.use(cors(
            {
                origin: '*',
                methods: ['GET', 'POST', 'PUT', 'DELETE'],
                allowedHeaders: ['Content-Type', 'Authorization'],
            },
        ));
        this.app.use(express.json());
        this.app.use('/usuarios/img', express.static('uploads/foto'));
    }

    private routes(): void {
        this.app.get('/', (req, res) => {
            res.status(200).json({ message: 'Seja bem-vindo á API da Opus! Fique a vontade para sugerir mlhorias. (^_^)' });
        });

        this.app.use(router);
    }

    public start(PORT: string | number): void {
        this.app.listen(PORT, () => {
            console.log(`O servidor está rodando na porta: ${PORT}`);
        });
    }
}

export { App };