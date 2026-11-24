import React, { useContext, useState } from 'react'
import axios from 'axios'
import { AdminContext } from '../context/AdminContext'
import { toast } from 'react-toastify'

const Auth = () => {
    const {token,setToken,backendURL,navigate} = useContext(AdminContext)

    const [currentState,setCurrentState] = useState("Login")
    const [firstName,setFirstName] = useState('')
    const [lastName,setLastName] = useState('')
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [password2, setPassword2] = useState('')
    const [loading,setLoading] = useState(false)
    const [errorMessage, setErrorMessage] = useState('')
    const [gender,setGender] = useState('')
    const [successMessage,setSuccessMessage] = useState('')

     const handleGenderChange = (e)=>{

    setGender(e.target.value)

  }


    const formData = new FormData()
    formData.append('firstName',firstName)
    formData.append('lastName',lastName)
    formData.append('email',email)
    formData.append('password',password)
    formData.append('gender',gender)

  
    const loginData = new FormData()

    loginData.append('email',email)
    loginData.append('password',password)





    const onSubmitHandler = async(e)=>{
        try {
            e.preventDefault();
            switch (currentState) {
                case "Login":
                    setLoading(true)
                    console.log(password)

                    
                    const response = await axios.post(backendURL + '/api/super/auth',{email,password})
                    console.log(password)
                    if(response.data.success)
                    {
                       
                        localStorage.setItem('token',response.data.token)
                        setToken(localStorage.getItem('token'))
                        toast.success("Logged in!")
                        setSuccessMessage(response.data.message)
                        navigate('/dashboard')

                    }else
                    {
                        setErrorMessage(response.data.message)
                        toast.error(response.data.message)
                    }
                    break;
                
                case "Signup":

                    setLoading(true)
                    if(password !== password2)
                    {
                        toast.error("password Mismatch")
                        setErrorMessage("Password mismatch")

                        return;
                    }
                    const signupResponse  = await axios.post(backendURL + '/api/users/doctor/register',formData,{headers:{
                        "Content-Type":"multipart/form-data"
                    }})

                    if(signupResponse.data.success)
                    {
                       
                        localStorage.setItem(signupResponse.data.token)
                        setToken(localStorage.getItem('token'))

                        setSuccessMessage(signupResponse.data.message)
                        navigate('/dashboard')
                        toast.success(signupResponse.data.message)
                        setFirstName('')
                        setLastName('')
                        setEmail('')
                        setPassword('')
                        setPassword2('')
                    }
                    else
                    {
                        setErrorMessage(signupResponse.data.message)
                        toast.error(signupResponse.data.message)
                    }
                    break;
                default:
                    break;
            }
            
        } catch (error) {
            setErrorMessage(error.message)
            toast.error(error.message)
            
        }
        finally
        {
            setLoading(false)

        }
    }


    
  return (
    <div className='loginPage text-black dark:text-white'>
    <header id='header' className='flex items-center justify-center bg-primary light:bg-dark'>

        <div className='flex items-center justify-between'>
            <p className='text-center text-white'>Tend</p>

        </div>


    </header>
        <div className='hidden mt-3 '>
                {
                    errorMessage ? 
                    <div role="alert" className="alert alert-error">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 shrink-0 stroke-current" fill="none" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <span>{errorMessage}</span>
                    </div>
                    : ''
                }
            </div>


        <div className=''>
            <div className='flex flex-col items-center justify-center top-[10%] left-[40%] absolute max-sm:left-[10%]'>

            <div className='flex gap-8 mt-8'>

                <p onClick={()=>setCurrentState("Login")} className={` ${currentState ==="Login" ? 'btn btn-primary' : 'btn btn-soft' }`}>Login</p>
                <p onClick={()=>setCurrentState("Signup")} className={`${currentState === "Signup" ? 'btn btn-primary' : 'btn btn-soft'}`}>Signup</p>

            </div>

            

            <form onSubmit={onSubmitHandler} className='mt-5 max-sm:w-fit'>
                <fieldset className={`flex flex-col gap-3 px-5 py-2 border-2 border-gray-300 ${currentState === "Login" ? 'gap-5' : ''} max-sm:w-[300px]`}>
                    <legend>
                        {currentState}
                    </legend>

                       
                        
                       
                        
                    
                        <label htmlFor="email">Email:</label>
                        <input onChange={(e)=>setEmail(e.target.value)} value={email} className="input validator outline-none" type="email" required placeholder="mail@site.com" />
                        
                    

                        <label htmlFor="">Password</label>
                        <input onChange={(e)=>setPassword(e.target.value)} value={password} type="password" className="input validator" required placeholder="Password" minLength="8" 
                        pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}" 
                        title="Must be more than 8 characters, including number, lowercase letter, uppercase letter" />
                       
                    
                   

                    {
                        currentState === 'Login' ? 
                         <div className='cursor-pointer'>
                        <p className='text-xs text-sky-700 underline hover:text-sky-800'>Forgot Password?</p>
                    </div> : ''

                    }

                    
                   
                    
                    {
                        loading ?  <button className='btn btn-primary rounded-2xl' type='submit' disabled>please wait..<span className='loading loading-spinner'></span></button> :

                        <button onClick={onSubmitHandler} className='btn btn-primary rounded-2xl' type='submit' >{currentState}</button>

                    }
                    
                    
                </fieldset>

                
            </form>
            
        </div>
        </div>

    </div>
  )
}

export default Auth