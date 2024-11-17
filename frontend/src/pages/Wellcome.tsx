import { useNavigate } from 'react-router-dom'
import s from './Wellcome.module.css'
import { useCustomerContext } from '../context/CustomerContext'
import { ChangeEvent, useState } from 'react'

export function Wellcome() {
  const navigate = useNavigate()
  const { setUsername } = useCustomerContext()
  const [name, setName] = useState('')

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setName(value)
  }

  function login() {
    setUsername(name)
    navigate('/customers')
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
        value={name}
        onChange={handleInputChange}
      />
      <button className={s.button} onClick={login}>
        Entrar
      </button>
    </div>
  )
}
