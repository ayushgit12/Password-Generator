import { useState, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const handleChange = (e) => {
    setLength(e.target.value)
    // passwordGenerator()
  }

  const copyPasswordToClipboard = () => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }



  const passwordGenerator = () => {
    let pass = ""
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"

    if (numberAllowed) str += "1234567890"
    if (charAllowed) str += "!@#$%^&*()_-+"

    for (let i = 0; i < length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length));
    }

    setPassword(pass);




  }

  useEffect(() => {
    passwordGenerator()

  }, [length, numberAllowed, charAllowed])


  return (
    <>
      <h1 className='text-4xl text-center font-bold text-white my-6'>PASSWORD GENERATOR</h1>
      <div className='w-full max-w-md px-4 my-8 mx-auto shadow-md !sm:mx-4 text-orange-700 rounded-lg bg-gray-700'>
        <h1 className='text-white text-center my-3'>Generate Your Password</h1>

        <div className='flex shadow rounded-lg overflow-hidden mb-4'>

          <input
            type="text"
            value={password}
            onChange={() => {
              setPassword(password)
            }}
            className='outline-none w-full py-1 px-3'
            placeholder='Your Password'
            readOnly
            ref={passwordRef}

          />
          <button className='bg-violet-500 px-3 hover:bg-violet-900' onClick={() => {
            copyPasswordToClipboard();
            alert('Password Successfully Copied To Clipboard!')

          }}>Copy</button>
        </div>

        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input type="range" name="" id="" min={6} max={100} value={length} onChange={handleChange} />
            <div>{length}</div>
          </div>

          <input className=' ml-5' type="checkbox" defaultChecked={numberAllowed} onChange={() => {
            setNumberAllowed((prev) => !prev);
          }} />
          <div className='text-white'>Numbers</div>
          <input className=' ml-5' type="checkbox" defaultChecked={charAllowed} onChange={() => {
            setCharAllowed((prev) => !prev);
          }} />
          <div className='text-white'>Characters</div>
        </div>

      </div>
    </>
  )
}

export default App
