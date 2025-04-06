import React, { useState } from 'react'

const FormPage = () => {
    const [ data , setData] = useState(
        {
            name:"",
            email:"",
            password:""
        }
    )

    const handleSubmit = (e) => 
    {

        e.preventDefault()
        console.log(data)
      
    }
  return (
   <>
   
    <div>
        <input type='text' value={data.name} onChange={(e)=>{setData({...data,name:e.target.value})}} placeholder='Name' />
        <input type='text' value={data.email} onChange={(e)=>{setData({...data,email:e.target.value})}} placeholder='Email' />
        <input type='text' value={data.password} onChange={(e)=>{setData({...data,password:e.target.value})}} placeholder='Password' />
        <button type='submit' onClick={handleSubmit}>Submit</button>

    </div>
   </>
  )
}

export default FormPage