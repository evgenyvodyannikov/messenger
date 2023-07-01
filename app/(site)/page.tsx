'use client';

import Image from "next/image"
import AuthForm from './components/AuthForm'
import { useState } from "react";

import resources from "../languages/resources";
import LanguageSwitcher from "../components/LanguageSwitcher";

type Language = 'EN' | 'RU';

export default function Home() {

    const [language, setLanguage] = useState<Language>('RU');

    return (
        <div
            className="
                flex
                min-h-full
                flex-col
                justify-center
                py-12
                sm:px-6
                lg:px-8
                bg-gray-100
            "
        >

            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <Image
                    alt="Logo"
                    height="96"
                    width="96"
                    className="mx-auto w-auto"
                    src="/images/logo-bg.png"
                />
            </div>
            <h2
                className="
                    mt-6
                    text-center
                    text-3xl
                    font-bold
                    tracking-tight
                    text-gray-900
                "
            >
                {resources[language].welcomeLoginMessage}
            </h2>


        
            <AuthForm lang={language}/>
            <LanguageSwitcher handleSwitch={setLanguage}/>

        </div>
    )
}
