'use client'

import React, { useState } from 'react'
import { Resend } from 'resend'
import Image from 'next/image'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import '@fontsource-variable/onest'

export default function Home() {
  // Estados para los valores del formulario
  const [nombres, setNombres] = useState('')
  const [apellidos, setApellidos] = useState('')
  const [celular, setCelular] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      // Realizar la solicitud fetch
      const response = await toast.promise(
        fetch('api/send', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            from: 'onboarding@resend.dev',
            to: 'segurosgodtello@gmail.com',
            //to: 'lexzum10@gmail.com',
            subject: 'Información SOAT',
            html: `<div>
          <p>Nombre: ${nombres} ${apellidos} </p>  
          <p>Celular: ${celular}</p>
          </div>`,
            text: `${nombres} ${apellidos} ${celular}`
          })
        }),
        {
          pending: 'Enviando Correo...',
          success: 'Enviado Correctamente 👌',
          error: 'Intenta de nuevo🤯'
        }
      )
      console.log(response)

      if (response.ok) {
        console.log('La petición POST fue exitosa')
        // Aquí puedes realizar cualquier acción adicional después de que la petición sea exitosa
        setNombres('')
        setApellidos('')
        setCelular('')
        setIsLoading(false)
      } else {
        console.error('Error al realizar la petición POST')
        setIsLoading(false)
      }
    } catch (error) {
      console.error('Error al procesar la petición:', error)
      setIsLoading(false)
    }
  }

  /*   const notify = () => {
    return new toast('🦄 Wow so easy!', {
      position: 'bottom-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'dark'
    })
  } */

  return (
    <main className="flex flex-col h-screen md:flex-row">
      <section className="flex-1 bg-[#9ad953] py-10 flex items-center h-full">
        <img
          className=""
          src="https://www.gerenciaderiesgos.com/wp-content/uploads/revslider/soat/AAA-1.png"
          alt=""
        />
      </section>
      <section className="flex-1 bg-[#212121] py-10 px-4">
        <div className="flex flex-col gap-6 justify-evenly px-2 mx-auto max-w-2xl h-full md:px-10">
          <picture className="flex justify-center">
            <img
              className="object-cover h-32 md:h-48"
              src="https://cloudfront-us-east-1.images.arcpublishing.com/elcomercio/AEY6AXJIE5G6DJKY264FVMN2FI.jpg"
              alt=""
            />
          </picture>

          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-10 text-white"
          >
            <div className="container">
              <label className="label">Nombres</label>
              <input
                required
                type="text"
                name="nombres"
                placeholder="Nombres"
                id="nombres"
                value={nombres}
                onChange={(e) => setNombres(e.target.value)}
              />
            </div>
            <div className="container">
              <label className="label">Apellidos</label>
              <input
                required
                type="text"
                name="apellidos"
                placeholder="Apellidos"
                id="apellidos"
                value={apellidos}
                onChange={(e) => setApellidos(e.target.value)}
              />
            </div>
            <div className="container">
              <label className="label">Celular</label>
              <input
                required=""
                type="text"
                name="celular"
                placeholder="Celular"
                id="celular"
                value={celular}
                onChange={(e) => setCelular(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="button disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              Contactame
            </button>
          </form>
        </div>
        <div>
          {/* <button onClick={notify}>Notify !</button> */}
          <ToastContainer position="bottom-right" />
        </div>
      </section>
    </main>
  )
}
