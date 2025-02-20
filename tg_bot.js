import 'dotenv/config.js'
import {Telegraf} from 'telegraf'
import askAi from './AiClient.js'
import customMessage from './response.js'
import {message} from 'telegraf/filters'

const bot = new Telegraf(process.env.MKD_BOT_TOKEN)

bot.start((ctx) => {
    ctx.reply(`👋 Hello ${ctx.from.first_name || 'there'}!  
Welcome to MKD_AI_BOT 🤖✨  
-Try me by sending an sticker 😁
I'm here to assist you 
Let’s get started! 🚀`);
});


bot.on(message('sticker'), ctx => ctx.reply(customMessage.sticker))

bot.on(message('text'),async ctx=>{
    const userMessage = ctx.message.text;
    // console.log(`User said: ${userMessage}`);
    // Start showing typing indicator in a loop
    let keepTyping = true;
    const typingInterval = setInterval( () => {
        if (keepTyping) {
             ctx.sendChatAction('typing');
        }
    }, 4000); // Re-send typing action every 4 seconds (before it times out)

    // Generate AI response (this might take some time)
    const aiResponse = await askAi(userMessage);

    // Stop the typing animation once the response is ready
    keepTyping = false;
    clearInterval(typingInterval);

    ctx.reply(aiResponse); // Reply with AI-generated output
})

export default bot;