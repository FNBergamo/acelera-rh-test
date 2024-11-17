import s from './ComingSoon.module.css'
import comingSoon from '../assets/coming-soon.png'
import { useNavigate } from 'react-router-dom'
import { ROUTES } from '../constants/routes'

export function ComingSoon() {
  const navigate = useNavigate()

  return (
    <div className={s.ComingSoon}>
      <div className={s.container}>
        <img
          src={comingSoon}
          alt='Uma ilustração de um robô com uma expressão triste e um sinal de alerta, indicando que ocorreu um erro'
          className={s.image}
        />
        <div className={s.text}>
          <h1 className={s.title}>Novidades a caminho</h1>
          <p className={s.message}>Em breve, a página estará disponível. Fique ligado!</p>
          <button onClick={() => navigate(ROUTES.CUSTOMERS)} className={s.goBack}>
            Voltar para página inicial
          </button>
        </div>
      </div>
    </div>
  )
}
