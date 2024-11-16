import { useNavigate } from 'react-router-dom'
import s from './Wellcome.module.css'

export function Wellcome() {
  const navigate = useNavigate()

  function login() {
    navigate('/')
  }

  return (
    <div className={s.wellcome}>
      <h1 className={s.title}>Olá, seja bem-vindo!</h1>
      <input
        className={s.input}
        type='text'
        id='name'
        name='name'
        placeholder='Digite o seu nome:'
      />
      <button className={s.button} onClick={login}>
        Entrar
      </button>
    </div>
  )
}
