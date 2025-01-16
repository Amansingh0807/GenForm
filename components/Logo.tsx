import React from 'react';
import Image from 'next/image';

const Logo = () => {
    return (
        <div className="flex items-center">
            <Image 
                src="/genform.png" 
                alt="GenForm App Logo" 
                width={50} 
                height={50} 
            />
            <h1 className="font-extrabold text-2xl ml-4">GenForm.ai</h1>
        </div>
    );
};

export default Logo;
