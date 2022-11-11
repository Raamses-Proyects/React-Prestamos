import { useState, useEffect } from 'react'
import { formatearDinero, calcularTotalPagar } from './helpers'
import Header from './components/Header'
import Boton from './components/Boton'
import Heading from './components/Heading'
import Resultado from './components/Resultado'

function App() {

  // States
  const [cantidad, setCantidad] = useState(10000)
  const [meses, setMeses] = useState(6)
  const [total, setTotal] = useState(0)
  const [pago, setPago] = useState(0)

  
  // Effects
  useEffect(() => {
    const resultado = calcularTotalPagar(cantidad, meses)
    setTotal(resultado)
  }, [cantidad, meses])
  
  useEffect(() => {
    setPago(total / meses)
  }, [total])


  // Varibles
  const MIN = 0
  const MAX = 20000
  const STEP = 100


  // Funciones
  const handleChage = (e) => {
    setCantidad(Number(e.target.value))
  }

  const handleClickDecremento = () => {
    const valor = cantidad - STEP
    if(valor < MIN ) {
      alert('Cantidad no valida')
      return
    }
    setCantidad(valor)
  }

  const handleClickIncremento = () => {
    const valor = cantidad + STEP
    if(valor > MAX ) {
      alert('Cantidad no valida')
      return
    }
    setCantidad(valor)
  }


  return (
    <div className="App my-20 max-w-lg mx-auto bg-white shadow p-10 ">
      <Header/>

      <div className='flex justify-between my-6'>
        <Boton operador='-' fn={handleClickDecremento}/>
        <Boton operador='+' fn={handleClickIncremento}/>
      </div>

      <input 
        type="range"
        min={MIN}
        max={MAX}
        step={STEP}
        value={cantidad}
        className='w-full h-6 bg-gray-200 accent-lime-500 hover:accent-lime-600'
        onChange={handleChage}
      />

      <p className='text-center my-10 text-5xl font-extrabold text-indigo-600'>
        { formatearDinero(cantidad) }
      </p>

   
      <Heading texto='Elige un plazo' textoSpan='a pagar'/>
      <select 
        value={meses}
        onChange={ (e) => setMeses(Number(e.target.value)) }
        className='mt-5 w-full p-2 bg-white border border-gray-300 rounded-lg text-center text-xl font-bold text-gray-500'>
        <option value="6">6 Meses</option>
        <option value="12">12 Meses</option>
        <option value="24">24 Meses</option>
      </select>

      <div className='my-5 space-y-3 bg-gray-50 p-5'>
        <Heading texto='Resumen' textoSpan='de pagos'/>
        <Resultado texto='Meses:' resultado={ meses }/>
        <Resultado texto='Total a pagar:' resultado={ formatearDinero(total) }/>
        <Resultado texto='Mensuales:' resultado={ formatearDinero(pago) }/>
      </div>
    </div>
  )
}

export default App
