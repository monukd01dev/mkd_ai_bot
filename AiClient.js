import 'dotenv/config.js'
import { HfInference } from "@huggingface/inference"
const client = new HfInference(process.env.HF_API_KEY);



export default async function askAi(message) {
    let output = "";

    const stream = client.chatCompletionStream({
        model: "Qwen/QwQ-32B-Preview",
        messages: [
            { role: "system", content: "you are a friendly chatbot.Your Ower Name is MKD_AI_Corp. usually generate short responses and to the point responses but can also genereate long responses is user asked for it but your first priority is shorter responses." },
            { role: "user", content: message }
        ],
        temperature: 0.5,
        max_tokens: 2048,
        top_p: 0.7
    });

    for await (const chunk of stream) {
        if (chunk.choices && chunk.choices.length > 0) {
            const newContent = chunk.choices[0].delta.content;
            output += newContent;
            // process.stdout.write(newContent); // live streaming output
        }
    }
    return output;
}