'use client'
import { Box, Stack } from "@mui/material";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
 const [messages, setMessages] = useState([{
  role: 'assistant',
  content: 'Hi how can I help?'
 }])

 const [message, setMessage] = useState('')

 return(
    <Box 
        width='100vw' 
        height='100vh'
        display='flex'
        flexDirection='column'
        justifyContent='center'
        alignItems='center'>
            <Stack
                direction='column'
                width='600px'
                height='700px'
                border='2px solid black'
                p={2}
                spacing={2}>
                    <Stack
                        direction='column'
                        spacing={2}
                        flexGrow={1}
                        overflow='auto'
                        maxHeight='100%'>
                            {messages.map((message, index)=>{
                                <Box
                                    key ={index}
                                    display= 'flex'
                                    justifyContent={messages.role=== 'assistant' ? 'flex-start' : 'flex-end' } >
                                        <Box
                                        bgcolor={
                                            messages.role === 'assistant'
                                            ? 'primary.main'
                                            : 'secondary.main'
                                        }
                                        color='red'
                                        borderRadius={16}
                                        p={3}>
                                            {messages.content}
                                        </Box>
                                    </Box>
                                })
                            }
                    </Stack>
            </Stack>
    </Box>
 )
}
