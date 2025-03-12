import React from 'react';

function ChatBox() {
    return (
        <div className='bg-primary text-pink-100 w-[90%] md:w-[70%] p-4 rounded-xl'>
            <div className='p-5 rounded-xl border-2 border-pink-100 flex flex-col gap-5'>
                <div className='flex flex-row justify-between text-sm md:text-base'>
                    <p>Message ID: <span className='font-bold'>321</span></p>
                    <p>Date: <span className='font-bold'>12-09-2002</span></p>
                </div>
                
                <div className='flex flex-col gap-1'>
                    <p className='font-bold text-center'>Patient</p>
                    <div className='bg-pink-100 text-primary h-[100px] md:h-[120px] rounded-2xl px-5 py-2 text-center font-bold overflow-y-auto'>
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                    </div>
                </div>
                
                <div className='flex flex-col gap-1'>
                    <p className='font-bold text-center'>Advisor</p>
                    <div className='bg-pink-100 text-primary h-[100px] md:h-[120px] rounded-2xl px-5 py-2 text-center font-bold overflow-y-auto'>
                        hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ChatBox;
