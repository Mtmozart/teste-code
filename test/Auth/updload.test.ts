import { App } from "../../src/app";
import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { MOCK_LOGIN_VALIDATE } from "../mock/login";
import path from "path";


const app = new App().app;

describe('Testes da rota de download de arquivo', () => {

  it('Não deve fazer o download de currículo sem token válido', async () => {

    const response = await request(app)
      .post('/uploads/curriculum/1')
      .set('Authorization', 'Bearer ' + 'token');

    expect(response.status).toBe(401);
  });

  it('Deve fazer o download de currículo com token válido', async () => {
    const login = await request(app).post('/auth').send(MOCK_LOGIN_VALIDATE);
    const token = login.body.token;

    const filePath = path.resolve(__dirname, '..', '..', 'test', 'assets', 'testando.pdf');

    const response = await request(app)
      .post('/uploads/curriculum/1')
      .attach('curriculum', filePath)
      .set('Authorization', `Bearer ${token}`)
      ;

    expect(response.status).toBe(201);
  });

  it('Deve retornar erro 400 se estiver sem arquivos.', async () => {
    const login = await request(app).post('/auth').send(MOCK_LOGIN_VALIDATE);
    const token = login.body.token;
    const response = await request(app)
      .post('/uploads/curriculum/1')
      .set('Authorization', `Bearer ${token}`)
      ;

    expect(response.status).toBe(400);
  });

  it('Deve retornar erro 400 se estiver com arquivo com formato inválido.', async () => {
    const login = await request(app).post('/auth').send(MOCK_LOGIN_VALIDATE);
    const token = login.body.token;
    const filePath = path.resolve(__dirname, '..', '..', 'test', 'assets', 'teste-outro-arquivo.odt');

    const response = await request(app)
      .post('/uploads/curriculum/1')
      .attach('curriculum', filePath)
      .set('Authorization', `Bearer ${token}`)
      ;

    expect(response.status).toBe(400);
  });

})