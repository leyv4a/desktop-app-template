import { useState,useEffect } from 'react'


function App() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')

  const submitForm = (e) => {
    e.preventDefault();
    // console.log(JSON.stringify({
    //   name: name,
    //   email: email,
    // }))
    addUser();
  }

  const [users, setUsers] = useState([]);
  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    fetch('http://localhost:3001/api/users') // Coloca la ruta 
    .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json(); // Devuelve la respuesta parseada como JSON
    })
    .then((data) => {
      setUsers(data);
      console.log('Datos recibidos:', data); // Muestra los datos recibidos en la consola
    })
    .catch((error) => console.error(error));
  }

const addUser = () => {
  fetch('http://localhost:3001/api/users', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: name,
      email: email,
    }),
  })
   .then((response) => {
      if (!response.ok) {
        throw new Error('La solicitud no fue exitosa');
      }
      return response.json();
    })
   .then(() => {
      // Limpia el estado después de que la solicitud sea exitosa
      setName('');
      setEmail('');
      getUsers(); // Actualiza la lista de usuarios después de agregar uno nuevo
      
    })
   .catch((error) => console.error(error));
}
  return (
    <>
     <div className='bg-slate-900 w-screen h-screen flex items-center justify-center flex-col'> 
        <h2 className='text-white text-5xl mb-3'> Electron + Express + React-Tailwind</h2>
        <div className='columns:2 flex gap-6 mt-10'>
        <div className="flex flex-col gap-2"> 
         <ul className='text-white text-3xl mt-3'>
        {users.map((user) => (
          <li key={user.id}>{user.name} - {user.email}</li>
          ))}
        </ul></div>
          <form onSubmit={submitForm} className='flex flex-col gap-2 bg-slate-200 p-4 rounded'>
            <input value={name} onChange={e => {setName(e.target.value)}} type='text' placeholder='Name'/>
            <input value={email} onChange={e => {setEmail(e.target.value)}} type='text' placeholder='Email'/>
            <input className='cursor-pointer' type='submit' value="Send"/>
          </form>
        </div>
     </div>
     
    </>
  )
}

export default App
