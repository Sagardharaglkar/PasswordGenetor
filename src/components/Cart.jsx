import React, { useCallback, useEffect } from 'react'
import { FaRegCopy } from "react-icons/fa6";
import { useState } from 'react';
import toast, { Toaster } from 'react-hot-toast';

const Cart = () => {
    const [Password, setPassword] = useState("Password")
    const [strength, setstrength] = useState("Weak")
    const [length, setlength] = useState(7);
    const [Upper, setUpper] = useState(false);
    const [Lower, setLower] = useState(false);
    const [Number, setNumber] = useState(true);
    const [Symbol, setSymbol] = useState(false);


    const lower = "abcdefghijklmnopqrstuvwxyz";
    const upperChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const numChars = "0123456789";
    const specialChars = "!@#$%^&*()-_=+[]{}|;:,.<>?";

    const strengthCheck = () => {
        if (length < 6) {
            setstrength("Too weak!");
        } if (length >= 6 && length < 12) {
            setstrength("Week");
        } if (length >= 12 && length < 16) {
            setstrength("Medium");
        } if (length >= 16) {
            setstrength("Strong")
        }
    }

    useEffect(
      () => {
        if (length < 6) {
            setstrength("Too weak!");
        } if (length >= 6 && length < 12) {
            setstrength("Weak");
        } if (length >= 12 && length < 16) {
            setstrength("Medium");
        } if (length >= 16) {
            setstrength("Strong")
        }
      },
      [length],
    )
    

    const generate = () => {
        let pass = "";

        while (pass.length < length) {
            if (Upper && pass.length < length) {
                const ForUpper = Math.floor(Math.random() * upperChars.length);
                pass += upperChars[ForUpper];
            }
            if (Lower && pass.length < length) {
                const ForLower = Math.floor(Math.random() * lower.length);
                pass += lower[ForLower];
            }
            if (Number && pass.length < length) {
                const ForNumber = Math.floor(Math.random() * numChars.length);
                pass += numChars[ForNumber];
            }
            if (Symbol && pass.length < length) {
                const ForSymbol = Math.floor(Math.random() * specialChars.length);
                pass += specialChars[ForSymbol];
            }

        }

        setPassword(pass);
    }

    const copyText = (text) => {
        toast.success('Copyed to Clipbord!')

        navigator.clipboard.writeText(text)
    }

    return (
        <>
            <Toaster
                position="top-center"
                reverseOrder={true}
            />
            <div className='bg-[#0A0E30] text-white lg:w-1/4 lg:mx-auto  my-24'>
                <div className=" rounded-xl password flex justify-between items-center px-6 py-1 bg-[#1C2040]">
                    <p>{Password}</p>
                    <button className='hover:bg-[#0A0E30] p-4 rounded-xl' onClick={() => { copyText(Password) }}><FaRegCopy />
                    </button>
                </div>

                <div className='rounded-xl flex justify-center items-center flex-col gap-4 mt-4 px-6 p-4 bg-[#1C2040]'>
                    <div className="flex justify-between w-full">
                        <p>Character length</p>
                        <p>{length}</p>
                    </div>

                    <input type="range" className='w-full' defaultValue={7} min={4} max={32} onChange={((e) => { setlength(e.target.value);  })} />

                    <div className='flex justify-start w-full gap-5'>
                        <input type="checkbox" onChange={((e) => { setUpper(!Upper) })} />
                        <p>Include Uppercase Letters</p>
                    </div>

                    <div className='flex justify-start w-full gap-5'>
                        <input type="checkbox" onChange={((e) => { setLower(!Lower) })} />
                        <p>Include Lowercase Letters</p>
                    </div>

                    <div className='flex justify-start w-full gap-5'>
                        <input type="checkbox" onChange={((e) => { setNumber(!Number) })} checked={Number} />
                        <p>Include Numbers</p>
                    </div>

                    <div className='flex justify-start w-full gap-5'>
                        <input type="checkbox" onChange={((e) => { setSymbol(!Symbol) })} />
                        <p>Include Symbols</p>
                    </div>

                    <div className="rounded-xl strength w-full flex justify-between bg-[#0A0E30] p-4">
                        <p>Strength</p>
                        <p className={`${strength === 'Weak' ? 'text-orange-400' : strength === 'Too weak!' ? 'text-red-400' : strength === 'Medium' ? 'text-yellow-400' : strength === 'Strong' ? 'text-green-400' : '' }`}>{strength}</p>

                    </div>

                    <button onClick={generate} className='bg-blue-800 hover:bg-blue-600 w-full py-3 rounded-xl'>Generate Password</button>
                </div>

            </div>
        </>
    )
}

export default Cart