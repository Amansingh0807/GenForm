import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';

const GenerateFormInput=()=>{
    return (
        <div className='flex items-center gap-4 my-8'>
         <Input type="text" placeholder="Write a prompt to generate form..." />
           <Button> Generate</Button>
            

        </div>
    )
}

export default GenerateFormInput;



