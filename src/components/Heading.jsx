function Heading({texto, textoSpan}) {
  return (
    <h2 className='text-2xl font-extrabold text-gray-500 text-center'>
      {texto}<span className='text-indigo-600'> {textoSpan} </span>
    </h2>
  )
}

export default Heading