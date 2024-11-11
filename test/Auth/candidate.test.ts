import { describe, it, expect } from 'vitest'; 
import request from 'supertest';
import { App } from '../../src/app';
import { INVALID_REGISTER_MOCK, REGISTER_MOCK, REGISTER_MOCK_TO_DELETE, UPDATE_MOCK } from '../mock/register';

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
    expect(response.status).toBe(201);
    
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
    const response = await request(app).get('/candidates')

    expect(response.status).toBe(401);
  });

  it('não deve conseguir atualizar um candidato sem token', async () => {
    const response = await request(app).put('/candidate/1');

    expect(response.status).toBe(401);
  });

  it('não deve conseguir deletar um candidato sem token', async () => {
    const response = await request(app).delete('/candidate/1');

    expect(response.status).toBe(401);
  });

  it('Não deve conseguir registrar um candidato já cadastrado', async () => {
   
    await request(app).post('/candidate/register').send(REGISTER_MOCK);
  
    const response = await request(app).post('/candidate/register').send(REGISTER_MOCK);
  
    expect(response.body.error).toBe('E-mail já cadastrado!');
    expect(response.status).toBe(400);
  });

  it('Deve conseguir retornar um suário por id  com token válido', async () => {
   
    const login = await request(app).post('/auth').send(MOCK_LOGIN_VALIDATE);
    const token = login.body.token;
    const response = await request(app).get('/candidate/1')
    .set('Authorization', `Bearer ${token}`);
   
    expect(response.status).toBe(200);
  });

  it('Deve conseguir retornar todos os usuários com token válido', async () => {
   
    const login = await request(app).post('/auth').send(MOCK_LOGIN_VALIDATE);
    const token = login.body.token;
    const response = await request(app).get('/candidates')
    .set('Authorization', `Bearer ${token}`);
   
    expect(response.status).toBe(200);
  });

  it('Deve conseguir atualizar o usuários com token válido', async () => {
    
    await request(app).post('/candidate/register').send(REGISTER_MOCK_TO_DELETE);
    const email = REGISTER_MOCK_TO_DELETE.email;
    const password = REGISTER_MOCK_TO_DELETE.password;

    const loginUser = {
      email: email,
      password: password
    }

    const login = await request(app).post('/auth').send(loginUser);
    const token = login.body.token;
    const response = await request(app).put('/candidate/3')
    .set('Authorization', `Bearer ${token}`).send(UPDATE_MOCK);
    expect(response.status).toBe(200);
  });
  /* Depois de deletado, deve-se cancelar os testes */
  it.skip('Deve conseguir deletar o usuários com token válido', async () => {
    
    await request(app).post('/candidate/register').send(REGISTER_MOCK_TO_DELETE);
    const email = REGISTER_MOCK_TO_DELETE.email;
    const password = REGISTER_MOCK_TO_DELETE.password;

    const loginUser = {
      email: email,
      password: password
    }

    const login = await request(app).post('/auth').send(loginUser);
    if(login.status == 200){   
    const token = login.body.token;
    const response = await request(app).delete('/candidate/3').set('Authorization', `Bearer ${token}`)
    expect(response.status).toBe(204);
    }
  });

  

});
