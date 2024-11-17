import { useNavigate } from 'react-router-dom'
import s from './Wellcome.module.css'
import { useCustomerContext } from '../context/CustomerContext'
import { ChangeEvent, useEffect, useState } from 'react'
import { ROUTES } from '../constants/routes'

export function Wellcome() {
  const navigate = useNavigate()
  const { loading, username, setUsername } = useCustomerContext()
  const [name, setName] = useState('')
  const isButtonDisabled = name.trim() === ''

  useEffect(() => {
    if (username) {
      navigate(ROUTES.CUSTOMERS, { replace: true })
    }
  }, [username, navigate])

  if (loading) {
    return <h1>Carregando...</h1>
  }

  function handleInputChange(e: ChangeEvent<HTMLInputElement>) {
    const { value } = e.target
    setName(value)
  }

  function login() {
    if (name.trim() === '') {
      return
    }
    setUsername(name)
    navigate(ROUTES.CUSTOMERS)
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
        required
      />
      <button className={s.button} onClick={login} disabled={isButtonDisabled}>
        Entrar
      </button>
    </div>
  )
}
