import './NotFound.module.css'
import errorRobot from '../assets/icons/error-robot.svg'
import s from './NotFound.module.css'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export function NotFound() {
  const navigate = useNavigate()

  return (
    <div className={s.notFound}>
      <div className={s.container}>
        <img
          src={errorRobot}
          alt='Uma ilustração de um robô com uma expressão triste e um sinal de alerta, indicando que ocorreu um erro'
          className={s.image}
        />
        <div className={s.text}>
          <h1 className={s.title}>404 - Página não encontrada</h1>
          <p className={s.message}>Desculpe, a página que esta procurando não existe.</p>
          <button onClick={() => navigate(ROUTES.CUSTOMERS)} className={s.goBack}>
            Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  )
}
