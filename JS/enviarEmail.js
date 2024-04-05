import { user } from "./form.js";


const status = document.getElementById('status-bar');


export async function sendEmail() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    const responses = user.anwsers.map(answer => `${answer.id}: ${answer.resposta}`).join('\n');
    console.log("nome: "+userData.name);
    console.log("responses: "+responses.toString())
    const data = {
        service_id: 'service_il5i8uk',
        template_id: 'template_pi8r4oi',
        user_id: '-7pvU3I_b0BG5G-rg',
        template_params: {
            'name': userData.name +" "+userData.lastname,
            'response': responses
        }
    };

    try {
        const res = await fetch('https://api.emailjs.com/api/v1.0/email/send', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            }
        });
        console.log(JSON.stringify(data))
        console.log("certo: "+res);
    } catch (err) {
        console.log("erro:  "+err.stack);
        
    }
}


