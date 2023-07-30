'use client';

import axios from "axios";
import { useCallback, useState, useEffect } from "react";
import { FieldValues, useForm, SubmitHandler } from "react-hook-form";
import { BsGithub, BsGoogle } from 'react-icons/bs';
import { FaVk } from 'react-icons/fa';
import { toast } from 'react-hot-toast';
import { signIn, useSession } from 'next-auth/react';

import Input from "@/app/components/inputs/Input";
import Button from "@/app/components/Button";
import AuthSocialButton from "./AuthSocialButton";
import resources from "@/app/languages/resources";

type Variant = 'LOGIN' | 'REGISTER';

interface AuthFormProps {
    lang: string;
}

const AuthForm: React.FC<AuthFormProps> = ({lang}) => {

    const session = useSession();
    const [variant, setVariant] = useState<Variant>('LOGIN');
    const [isLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        if(session?.status == 'authenticated'){
            console.log('authenticated')
        }
    }, [session?.status])
    
    const toggleVariant = useCallback(() => {
        if(variant === 'LOGIN'){
            setVariant('REGISTER');
        } else {
            setVariant('LOGIN');
        }
    }, [variant]);

    const {
        register,
        handleSubmit,
        formState: {
            errors
        }
    } = useForm<FieldValues>({
        defaultValues: {
            name: '',
            email: '',
            password: ''
        }
    })

    const onSubmit: SubmitHandler<FieldValues> = (data) => {
        setIsLoading(true);

        if (variant === 'REGISTER'){
            axios.post('/api/register', data)
            .catch(() => toast.error('Something went wrong!'))
            .finally(() => setIsLoading(false));
        }
        
        if (variant === 'LOGIN'){
            signIn('credentials', {
                ...data,
                redirect: false
            })
            .then((callback) => {
                if(callback?.error) {
                    toast.error('Invalid credentials!');
                }

                if(callback?.ok && !callback?.error) {
                    toast.success('Logged in!');
                }
            })
            .finally(() => setIsLoading(false));
        }
    }

    const socialAction = (action: string) => {
        setIsLoading(true);

        signIn(action, { redirect: false })
        .then((callback) => {
            if(callback?.error){
                toast.error('Invalid credentials!');
            }

            if(callback?.ok && !callback?.error) {
                toast.success('Logged in!');
            }
        })
        .finally(() => setIsLoading(false));
    }

    return (
        <div
            className="
                mt-8
                sm:mx-auto
                sm:w-full
                sm:max-w-md
            "
        >
            <div
                className="
                  bg-white
                    px-4
                    py-8
                    shadow
                    sm:rounded-lg
                    sm:px-10
                "
            >
                <form
                    className="space-y-6"
                    onSubmit={handleSubmit(onSubmit)}
                >
                    {variant === 'REGISTER' && (
                        <Input 
                            id="name" 
                            label={resources[lang].name}
                            register={register}
                            errors={errors}
                            required
                            disabled={isLoading}
                        />
                    )}

                    <Input 
                        id="email" 
                        label={resources[lang].email}
                        type="email"
                        register={register}
                        errors={errors}
                        required
                        disabled={isLoading}
                    />

                    <Input 
                        id="password" 
                        label={resources[lang].password}
                        type="password"
                        register={register}
                        errors={errors}
                        required
                        disabled={isLoading}
                    />

                    <Button
                        disabled={isLoading}
                        fullWidth
                        type='submit'
                    >
                        {variant === 'LOGIN' ? resources[lang].loginButton : resources[lang].registerButton }
                    </Button>    
                </form>

                <div className="mt-6">
                    <div className="relative">
                        <div
                            className="
                                absolute
                                inset-0
                                flex
                                items-center
                            "
                        >
                            <div className="w-full border-t border-gray-300"/>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-2 text-gray-500">
                                { resources[lang].socialLinks }
                            </span>
                        </div>
                    </div>
                    <div className="mt-6 flex gap-2">
                        <AuthSocialButton
                            icon={BsGithub}
                            onClick={() => socialAction('github')}
                        />

                        <AuthSocialButton
                            icon={BsGoogle}
                            onClick={() => socialAction('google')}
                        />

                        <AuthSocialButton
                            icon={FaVk}
                            onClick={() => socialAction('vk')}
                        />
                    </div>
                </div>

                <div className="
                        flex
                        gap-2
                        justify-center
                        text-sm
                        mt-6
                        px-2
                        text-gray-500
                    "
                >
                    <div>
                        {variant === 'LOGIN' ? resources[lang].registerStateMessage : resources[lang].loginStateMessage }
                    </div>
                    <div
                        onClick={toggleVariant}
                        className="underline cursor-pointer"
                    >
                        {variant === 'LOGIN' ? resources[lang].registerStateAction : resources[lang].loginStateAction }
                    </div>
                </div>

            </div>
            
        </div>
    )
}

export default AuthForm;