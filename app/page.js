'use client'
import { Box, Stack, TextField, Button } from "@mui/material";
import { ST } from "next/dist/shared/lib/utils";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
 const [messages, setMessages] = useState([{
  role: 'assistant',
  content: 'Hi how can I help?'
 }])

 const [message, setMessage] = useState('')
 
 const sendMessage = async () => {
    setMessage(''); // Clear the input field after sending the message
    setMessages((prevMessages) => [
      ...prevMessages,
      { role: 'user', content: message }, // Add the user's message
      { role: 'assistant', content: '' }, // Placeholder for the assistant's response
    ]);
  
    const response = await fetch('/api/chat', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify([...messages, { role: 'user', content: message }]),
    });
  
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
  
    let result = '';
  
    const processText = async ({ done, value }) => {
      if (done) {
        return result;
      }
  
      const text = decoder.decode(value || new Int8Array(), { stream: true });
      result += text;
  
      setMessages((prevMessages) => {
        const lastMessage = prevMessages[prevMessages.length - 1];
        const otherMessages = prevMessages.slice(0, prevMessages.length - 1);
        return [
          ...otherMessages,
          {
            ...lastMessage,
            content: lastMessage.content + text, // Append new text to the assistant's response
          },
        ];
      });
  
      return reader.read().then(processText);
    };
  
    await reader.read().then(processText);
  };
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
                            {messages.map((message, index)=>(
                                <Box
                                    key ={index}
                                    display= 'flex'
                                    justifyContent={message.role=== 'assistant' ? 'flex-start' : 'flex-end' } >
                                        <Box
                                        bgcolor={
                                            message.role === 'assistant'
                                            ? 'primary.main'
                                            : 'secondary.main'
                                        }
                                        color='white'
                                        borderRadius={16}
                                        p={3}>
                                            {message.content}
                                        </Box>
                                    </Box>
                                ))
                            }
                    </Stack>
                    <Stack direction='row' spacing={2}>
                        <TextField label='message' fullWidth value={message}
                            onChange={(e) => setMessage(e.target.value)}/>
                        <Button variant='contained' onClick={sendMessage}>Send</Button>

                    </Stack>
            </Stack>
    </Box>
 )
}
