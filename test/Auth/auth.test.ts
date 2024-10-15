import { describe, it, expect} from 'vitest'; 
import request from 'supertest';
import { App } from '../../src/app';
import { MOCK_LOGIN_VALIDATE } from '../mock/login';

const app = new App().app;

describe('Testes da rota de autenticação', () => {

  it('deve conseguir logar', async () => {
    const response = await request(app).post('/auth').send(MOCK_LOGIN_VALIDATE);

    expect(response.body.token).toBeTruthy();
    expect(response.status).toBe(200); 
  });

  it('não deve conseguir logar com dados inválidos', async () => {
    const response = await request(app).post('/auth').send({ email: 'abc@abc.ab', password: '123' });

    expect(response.body.error).toBe('Candidato não encontrado!');
    expect(response.status).toBe(400);
  });

});
