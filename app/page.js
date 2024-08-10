'use client'
import { Box } from "@mui/material";
import Image from "next/image";
import { useState } from "react";


export default function Home() {
 const [messages, setMessages] = useState({
  role: 'assistant',
  content: 'Hi how can I help?'
 })

 const [msg, setMsg] = useState('')

 return(
  <Box/>
 )
}
