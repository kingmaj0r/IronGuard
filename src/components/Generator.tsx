import Image from 'next/image';
import { useState, useEffect, useCallback } from "react";
import logo from "../assets/img/logo.png";

export default function Generator(props) {
    const [passwords, setPasswords] = useState([]);
    const [passwordConfig, setPasswordConfig] = useState({
        number: props.passwordsNumber >= 1 ? props.passwordsNumber : 4,
        size: 8,
        includeSymbols: false,
        includeNumbers: false,
        includeCharacters: false
    });

    const handleChange = (event) => {
        const { id, value, checked } = event.target;

        if (id === 'size-input') {
            setPasswordConfig(config => ({
                ...config,
                size: parseInt(value)
            }));
        } else if (id === 'include-symbols:') {
            setPasswordConfig(config => ({
                ...config,
                includeSymbols: checked
            }));
        } else if (id === 'include-numbers:') {
            setPasswordConfig(config => ({
                ...config,
                includeNumbers: checked
            }));
        } else if (id === 'include-characters:') {
            setPasswordConfig(config => ({
                ...config,
                includeCharacters: checked
            }));
        } else if (id === 'passwords-number') {
            setPasswordConfig(config => ({
                ...config,
                number: parseInt(value)
            }));
        }
    }

    const createPassword = useCallback((length) => {
        function getRandomChar() {
            const charPool = [];
            if (passwordConfig.includeSymbols) {
                charPool.push('!"#$%&\'()*+,-./:;<=>?@[\\]^_`{|}~');
            }
            if (passwordConfig.includeNumbers) {
                charPool.push('0123456789');
            }
            if (passwordConfig.includeCharacters) {
                charPool.push('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ');
            }

            if (charPool.length === 0) {
                return '';
            }

            const randomCharPool = charPool[Math.floor(Math.random() * charPool.length)];
            return randomCharPool[Math.floor(Math.random() * randomCharPool.length)];
        }

        let password = '';

        for (let i = 1; i <= length; i++) {
            password += getRandomChar();
        }
        return password;
    }, [passwordConfig]);

    const getPasswords = useCallback((passwordsLength = 8) => {
        const passwordsArray = [];

        if (passwordsLength <= 35 && passwordsLength >= 5) {
            for (let i = 1; i <= passwordConfig.number; i++) {
                passwordsArray.push(createPassword(passwordsLength));
            }
            setPasswords(passwordsArray);
        }
    }, [passwordConfig, createPassword]);

    useEffect(() => {
        getPasswords(passwordConfig.size);
    }, [passwordConfig, getPasswords]);

    const copyPassword = (event) => {
        const password = event.target.value;
        navigator.clipboard.writeText(password)
            .then(() => {
                alert('Copied to clipboard: ' + password);
            })
            .catch((error) => {
                alert(`An error occurred while copying to the clipboard: ${error}`);
            });
    }

    return (
        <section className="max-sm:w-full max-sm:px-0 max-sm:py-4
        h-full p-12 w-5/6 flex flex-col items-center justify-center
        gap-4" data-testid="generator">
            <span className="font-bold text-center gap-2 flex flex-col justify-center 
            items-center">
                <Image src={logo} className="text-2xl w-96 animate-text-entry" alt="logo" />
                <h2 className="text-white text-3xl font-bold animate-text-entry-invert
                max-md:hidden">Never use weak <span className="text-emerald-500">passwords </span>again.</h2>
            </span>
            
            
            <div className="flex flex-nowrap max-md:flex-col justify-around items-center
            max-lg:w-full max-lg:px-4 max-md:h-1/6 max-sm:gap-4 w-4/12 h-3/6">
                <button onClick={() => getPasswords(passwordConfig.size)}
                    className="generator-button"
                >New Password</button>
                <div className="flex w-6/12 h-12 items-center justify-around">
                    <div className="flex flex-col w-full h-full gap-4">
                        <input type="range" min="5" max="35" defaultValue={passwordConfig.size}
                            className={`size-input ${passwordConfig.size == 5 ? "hover:slider-thumb:rounded-full" : ""} ${passwordConfig.size == 35 ? "hover:slider-thumb:rounded-full" : ""}`} onChange={handleChange} id={'size-input'} />
                        <div className="text-white flex flex-nowrap font-bold
                        items-center justify-between h-full w-full tracking-widest">
                            <h1 className={`${passwordConfig.size == 5 ? "text-white" : "text-emerald-500"} duration-500`}>5</h1>
                            <h1>SIZE: <span className="text-emerald-500">{passwordConfig.size}</span></h1>
                            <h1 className={`${passwordConfig.size == 35 ? "text-white" : "text-emerald-500"} duration-500`}>35</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="flex w-6/12 h-12 items-center justify-around">
                <div className="flex flex-col w-full h-full gap-4">
                    <input type="range" min="1" max="14" defaultValue={passwordConfig.number}
                        className={`hover:slider-thumb:rounded-full`} onChange={handleChange} id={'passwords-number'} />
                    <div className="text-white flex flex-nowrap font-bold
                    items-center justify-between h-full w-full tracking-widest">
                        <h1 className={`${passwordConfig.number == 1 ? "text-white" : "text-emerald-500"} duration-500`}>1</h1>
                        <h1>Passwords: <span className="text-emerald-500">{passwordConfig.number}</span></h1>
                        <h1 className={`${passwordConfig.number == 20 ? "text-white" : "text-emerald-500"} duration-500`}>14</h1>
                    </div>
                </div>
            </div>

            <div className="bg-gray-900 flex items-center justify-center gap-1">
                <div className="flex">
                    <input type="checkbox" id="include-symbols:" className="peer hidden" onChange={handleChange} />
                    <label htmlFor="include-symbols:" className="select-none cursor-pointer rounded-lg border - 2 border-gray-200
                    py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "> Include Symbols </label>
                </div>
                <div className="flex" >
                    <input type="checkbox" id="include-numbers:" className="peer hidden" onChange={handleChange}/>
                    <label htmlFor="include-numbers:" className="select-none cursor-pointer rounded-lg border - 2 border-gray-200
                    py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "> include numbers </label>
                </div>
                <div className="flex">
                    <input type="checkbox" id="include-characters:" className="peer hidden" onChange={handleChange} />
                    <label htmlFor="include-characters:" className="select-none cursor-pointer rounded-lg border - 2 border-gray-200
                    py-3 px-6 font-bold text-gray-200 transition-colors duration-200 ease-in-out peer-checked:bg-gray-200 peer-checked:text-gray-900 peer-checked:border-gray-200 "> include characters </label>
                </div>
            </div>

            <div className={`max-sm:px-0 max-md:h-full
            max-sm:p-6 max-md:p-0 grid items-center
            gap-6 w-full h-3/6 ${passwordConfig.number <= 5 ? "grid-cols-1" : "md:grid-cols-2 sm:grid-cols-1"}`}>
                {passwords.map((password, index) => (
                    <input className="password-input"
                        key={index}
                        type="text"
                        value={password}
                        onClick={copyPassword}
                        title="Click to copy to clipboard"
                        readOnly />
                ))}
            </div>
        </section>
    );
}