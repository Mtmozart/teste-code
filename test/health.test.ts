import { describe, it, expect } from 'vitest';
import request from 'supertest';
import { App } from '../src/app';

const app = new App().app;

describe('Teste de exemplo', () => {
  it('deve passar', () => {
    expect(1 + 1).toBe(2);
  });

  it('deve pegar o body da req com a mensagem de boas vindas', async () => {
    const response = await request(app).get('/');

    expect(response.body.message).toBe('Seja bem-vindo á API da Opus! Fique a vontade para sugerir mlhorias. (^_^)');
    expect(response.status).toBe(200);
  });

});
