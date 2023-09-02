import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useAuthUser } from '../../context/UserContext';
import logo from '../../assets/logo.png';

function LoginPage() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();
  const { loginUser, autologin } = useAuthUser();

  const onSubmit = async (data) => {
    try {
      await loginUser(data);
      autologin();
      navigate('/dashboard');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
    }
  };

  return (
    <div className="container">
      <div className='centro'>
        <div className='imgbox'>
          <img className='img' src={logo} alt="Logo" />
        </div>
        <div className='fundo'>
          <h1 className='titulo'>Login</h1>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="formulario">
              <label className='label' htmlFor="email">Email</label>
              <input
                className='input'
                type="email"
                id="email"
                name="email"
                placeholder="Seu email"
                {...register('email')}
              />
              {errors.email && <p className="error-message">{errors.email.message}</p>}
            </div>
            <div className="formulario">
              <label className='label' htmlFor="password">Password</label>
              <input className='input'
                type="password"
                id="password"
                name="password"
                placeholder="Sua senha"
                {...register('password')}
              />
              {errors.password && <p className="mensagemErro">{errors.password.message}</p>}
            </div>
            <button className='entrar' type="submit">Entrar</button>
          </form>
          <p className='pa'>Ainda não possui uma conta?</p>
          <button className='cadastroButton' onClick={() => navigate('/register')}>Cadastro</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
