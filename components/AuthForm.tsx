'use client';
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
//form scehma
import { z } from "zod"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import CustomInput from './CustomInput';
import { authFormSchema } from '@/lib/utils';
import { Loader2 } from 'lucide-react';
import { UNDERSCORE_NOT_FOUND_ROUTE_ENTRY } from 'next/dist/shared/lib/constants';
import { useRouter } from 'next/navigation';
import { getLoggedInUser, signIn, signUp } from '@/lib/actions/user.actions';


 
 


const AuthForm =  ({ type}: {type:string}) => {
    const [user, setUser] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
   
  
     
    const router = useRouter()

   const formSchema =  authFormSchema(type);

   // 1. Define your form.
   const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

   // 2. Define a submit handler.
   const onSubmit = async (data: z.infer<typeof formSchema>) => {


    setIsLoading(true)

    try {
     
        //sign up with appwrite & create a plaid token
  
         if(type === 'sign-up'){
           const newUser = await signUp(data);
           setUser(newUser);
         }

         if(type === 'sign-in'){
            const response = await  signIn({
                email: data.email,
                password: data.password,
            })

            if(response){
                router.push('/')
            }
         }

    setIsLoading(false);
    } catch(error){
         console.log(error);
    } finally {
        setIsLoading(false);
    }
  }
  return (
    <section className='auth-form'>
        
       <header className='flex flex-col gap-5 md:gap-8'>
       <Link href="/" className="cursor-pointer flex items-center gap-1">
            <Image 
              src="/icons/logo.svg"
              width={34}
              height={34}
              alt="Horizon logo"
            />
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">Horizon</h1>
          </Link>

            <div className="flex flex-col gap-1 md:gap-3">
                 <h1 className='text-24 lg:text-36 
                 font-semibold text-gray-900'>
                     {user ? 'Link Account' : type === 
                     'sign-in' ? 'Sign In' : 'Sign Up'}

                     <p className='text-16 font-normal text-gray-600'>

                        {user ? 'Link your account to get started' :
                         'Please enter your details'}
                     </p>
                 </h1>
            </div>
       </header>
         
         { user ? (
            <div className='flex flex-col gap-4'>
                {/* Plaidlink */}
            </div>
         ) : 
            <>
                     <Form {...form}>
                     <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                  
                     {type === 'sign-up' && (
                        <>
                       <div className='flex gap-4'>
                       <CustomInput 
                        control={form.control}
                        label='First Name'
                        placeholder='Enter you first name'
                        name='firstName'
                        />

                        <CustomInput 
                        control={form.control}
                        label='Last Name'
                        placeholder='Enter you last name'
                        name='lastName'
                        />
                       </div>

                      

                        <CustomInput 
                        control={form.control}
                        label='Address'
                        placeholder='Enter your specific address'
                        name='address1'
                        />

                       <CustomInput 
                        control={form.control}
                        label='City'
                        placeholder='Enter your city'
                        name='city'
                        />

                        <div className="flex gap-4">
                        <CustomInput 
                        control={form.control}
                        label='State'
                        placeholder='Example: Maharashtra'
                        name='state'
                        />

                        <CustomInput 
                        control={form.control}
                        label='Postal Code'
                        placeholder='Example: 41123 '
                        name='postalCode'
                        />
                        </div>

                        <div className="flex gap-4">
                        <CustomInput 
                        control={form.control}
                        label='Date of Birth'
                        placeholder='YYYY-MM-DD'
                        name='dateOfBirth'
                        />

                        <CustomInput 
                        control={form.control}
                        label='Aadhaar Number'
                        placeholder='xxxx-xxxx-xxxx'
                        name='aadhaarNumber'
                        />
                        </div>

                     
                        </>
                     )}

                     <CustomInput control={form.control} name='email' label="Email"
                     placeholder='Enter your email'/>

                     
                     <CustomInput control={form.control} name='password' label="Password"
                     placeholder='Enter your password'/>

                 <div className='flex flex-col gap-4'>

                     <Button type="submit" disabled={isLoading}
                     className='form-btn'>

                      {/* loader */}
                      {isLoading ? <> < Loader2 size={20} className='animate-spin'/>  &nbsp; Loading...
                      </> : type === 'sign-in' ? 
                      'Sign-In' : 'Sign-up'}

                      </Button>
                      </div>
                   </form>
                 </Form>



          <footer className='flex justify-center gap-1'>
             <p className='text-14 font-normal text-gray-600'>
                {type === 'sign-in' ? "Don't have an account ?" :
             'Already have an account ?'  }</p>
             <Link href={ type === 'sign-in' ? '/sign-up':
                './sign-in'} className='form-link'>
                    { type === 'sign-in' ? 'Sign Up':
                'Sign In'}
                </Link>
          </footer>

            </>
          }
    </section>
  )
}

export default AuthForm
