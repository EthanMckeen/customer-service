import { NextResponse } from "next/server";
import OpenAI from "openai";

const systemPropmt = "You are a highly skilled customer service assistant, designed to help customers efficiently and politely. Your primary goals are to understand the customer's needs, provide accurate information, and resolve their issues in a friendly and professional manner. Always be empathetic, patient, and clear in your communication. If you are unable to resolve an issue directly, politely guide the customer on how they can escalate or where they can find additional help. Keep your responses concise, informative, and focused on solving the customer's problem."


export async function POST(req){
    const openai = new OpenAI()
    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [
            {
                role: 'system', content: systemPropmt
            },
            ...data,
        ],
        model: 'gpt-4o-mini',
        stream: true,
        
    })

    const stream = new ReadableStream({
        async start(controller){
            const encoder = new TextEncoder()
            try{
                for await (const chunk of completion){
                    const content = chunk.choices[0]?.delta?.content
                    if (content){
                        const text = encoder.encode(content)
                        controller.enqueue(text)
                    }
                }
            }
            catch(err){
                controller.error(err)
            } finally {
                controller.close()
            }
        },
    })

    return new NextResponse(stream)
}