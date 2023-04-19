import { HandPalm, Play } from 'phosphor-react'
import { useForm, FormProvider } from 'react-hook-form'
/** hooks = funções com prefixo "use", que acoplam funcionalidade a um
 * componente existente.
 */
import { zodResolver } from '@hookform/resolvers/zod'
import * as zod from 'zod'
/** so usa o * quando a biblio n tem export default */

import {
  StartCountdownButton,
  HomeContainer,
  StopCountdownButton,
} from './styles'
import { useContext } from 'react'
import { NewCycleForm } from './components/NewCycleForm'
import { Countdown } from './components/Countdown'
import { CyclesContext } from '../../Context/CyclesContext'

/** Controlled = Manter em tempo o real o estado atualizado
 * ou seja quando ele escrever cada letra num input vai atualizar.
 * Isso pode ser um problema devido a sempre ter que renderizar toda
 * a aplicação, pois pode vir causar um problema de performance.
 * Usado em telas de cadastros, logins e afins que tem poucos inputs.
 */

/** Uncontrolled = É justamente o contrário do Controlled.
 * Abrir mão da atualização em tempo real no meu input para ter
 * uma maior performance.
 * Usado quando um form tem muitos inputs em tela e monitorar todos
 * daria um grande problema
 */

/** function register(name:string) {
 *    return {
 *      onChange: () => void,
 *      onBlur: () => void,
 * }
 * }
 * A função register atua como um conjunto de metodos, por isso usamos o
 * spread operator "..."
 * Utilizado para validar e manipular inputs
 */

const newCycleFormValidationSchema = zod.object({
  task: zod.string().min(1, 'Informe a tarefa'),
  minutesAmount: zod
    .number()
    .min(5, 'O ciclo precisa ser de no mínimo 5 minutos')
    .max(60, 'O ciclo precisa ser de no máximo 60 minutos'),
})

/** interface NewCycleFormData {
  task: string
  minutesAmount: number
}
Usar interface quando é p definir o objeto de validação
Usar Type quando vai criar a tipagem de outra referencia(variavel e etc)
**/

type NewCycleFormData = zod.infer<typeof newCycleFormValidationSchema>
// typeof p referenciar a variavel JS dentro do TS

export function Home() {
  const { createNewCycle, interruptCurrentCycle, activeCycle } =
    useContext(CyclesContext)

  const newCycleForm = useForm<NewCycleFormData>({
    resolver: zodResolver(newCycleFormValidationSchema),
    defaultValues: {
      task: '',
      minutesAmount: 0,
    },
  })

  const { handleSubmit, watch, reset } = newCycleForm

  function handleCreateNewCycle(data: NewCycleFormData) {
    createNewCycle(data)
    reset()
  }

  const task = watch('task')
  const isSubmitDisabled = !task /** Variável Auxiliar */

  /** Prop Drilling: (Problema)
   * Quando tem muitas propriedas apenas para
   * comunicação entre componentes.
   *
   * Context API: Permite compartilharmos informaçoes
   * entre vários componentes ao mesmo tempo.
   */

  return (
    <HomeContainer>
      {/** Form do "input" */}
      <form /** precisa pegar tudo da pagina devido ao botão */
        onSubmit={handleSubmit(handleCreateNewCycle)}
      >
        <FormProvider {...newCycleForm}>
          <NewCycleForm />
        </FormProvider>
        {/** Maneira de passar o register para o meu outro componente,
         * por isso o Form provider só vai em voltda dele */}

        <Countdown />

        {/** Botão */}
        {activeCycle ? (
          <StopCountdownButton onClick={interruptCurrentCycle} type="button">
            <HandPalm size={24} />
            Interromper
          </StopCountdownButton>
        ) : (
          <StartCountdownButton type="submit" disabled={isSubmitDisabled}>
            <Play size={24} />
            Começar
          </StartCountdownButton>
        )}
      </form>
    </HomeContainer>
  )
}
