import { describe, it, expect, afterEach, beforeEach, vi } from 'vitest'; 
import request from 'supertest';
import { App } from '../../src/app';
import { INVALID_REGISTER_MOCK, INVALID_REGISTER_MOCK_EMAIL, REGISTER_MOCK } from '../mock/register';
import AuthModel from '../../src/model/auth.model';
import AuthService from '../../src/service/auth.service';
import AuthController from '../../src/controller/auth.controller';
import { MOCK_LOGIN_VALIDATE } from '../mock/login';

/* vi.mock('../../src/model/auth.model', () => {
  return {
    default: class {
      register = vi.fn();
      login = vi.fn();
      findAll = vi.fn();
      findById = vi.fn();
      update = vi.fn();
      delete = vi.fn();
    }
  }
}); */

const app = new App().app;

describe('Testes da rota de candidatos', () => {  

  it.skip('deve conseguir registrar um candidato', async () => {
    const response = await request(app).post('/candidate/register').send(REGISTER_MOCK);

    expect(response.body.message).toBe('Usuário registrado!');
    expect(response.status).toBe(200);
    
  });

  it('não deve conseguir registrar um candidato com dados inválidos ou ausente', async () => {
    const response = await request(app).post('/candidate/register').send(INVALID_REGISTER_MOCK);
    
    //Verifica se a mensagem de erro está correta, contendo ao menos um campo faltante
    expect(response.body.error).toContain('Preencha todos os campos:');
    expect(response.status).toBe(400);
  });

  it('não deve conseguir pegar um candidato sem token', async () => {
    const response = await request(app).get('/candidate/1');

    expect(response.body.error).toBe('Token não fornecido!');
    expect(response.status).toBe(401);
  });

  it('não deve conseguir pegar um candidato com token inválido', async () => {
    const response = await request(app)
        .get('/candidate/1')
        .set('Authorization', 'Bearer ' + 'token');

    expect(response.body.error).toBe('Token inválido!');
    expect(response.status).toBe(401);
  });

  it('não deve conseguir pegar todos os candidatos sem token', async () => {
    const response = await request(app).get('/candidate')

    expect(response.status).toBe(401);
  });

  it('não deve conseguir atualizar um candidato sem token', async () => {
    const response = await request(app).put('/candidate/1');

    expect(response.status).toBe(401);
  });

  it('não deve conseguir deletar um candidato sem toekn', async () => {
    const response = await request(app).delete('/candidate/1');

    expect(response.status).toBe(401);
  });

});
