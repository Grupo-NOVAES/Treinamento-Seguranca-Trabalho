import { user } from "./form.js";


const status = document.getElementById('status-bar');


export async function sendEmail() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    //Configurando as Respostas
    const responses = JSON.stringify(user.answers);
    const responsesArray = responses.split(',');
    const formattedResponses = responsesArray.join('\n');
    const cleanedFormattedResponses = formattedResponses.replace(/["\[\]]/g, '');

    //Configurando o tempo
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const finalTime = `${hours}:${minutes}:${seconds}`;
    const initTime = JSON.stringify(sessionStorage.getItem('initTime'));

    const time = `comecei as: ${initTime} -- finalizei as: ${finalTime}`;

    const formatedTime = time.replace(/\\"/g, '').replace(/"/g, '');
    console.log(formatedTime);

    
    console.log("nome: "+userData.name);
    console.log("responses: "+responses.toString())
    console.log(`Time: ${formatedTime}`)
    const data = {
        service_id: 'service_4y6ezxe',
        template_id: 'template_agz5d9u',
        user_id: 'dRZHmDTwH7gvncr8a',
        template_params: {
            'name': userData.name +" "+userData.lastname,
            'response': cleanedFormattedResponses,
            'time':formatedTime
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
        await sendEmailForMe();
    } catch (err) {
        console.log("erro:  "+err.stack);
        
    }
    
}

export async function sendEmailForMe() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    //Configurando as Respostas
    const responses = JSON.stringify(user.answers);
    const responsesArray = responses.split(',');
    const formattedResponses = responsesArray.join('\n');
    const cleanedFormattedResponses = formattedResponses.replace(/["\[\]]/g, '');

    //Configurando o tempo
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const finalTime = `${hours}:${minutes}:${seconds}`;
    const initTime = JSON.stringify(sessionStorage.getItem('initTime'));

    const time = `comecei as: ${initTime} -- finalizei as: ${finalTime}`;

    const formatedTime = time.replace(/\\"/g, '').replace(/"/g, '');
    console.log(formatedTime);
    

    console.log("nome: "+userData.name);
    console.log("responses: "+responses.toString())
    const data = {
        service_id: 'service_798mtu5',
        template_id: 'template_pi8r4oi',
        user_id: '-7pvU3I_b0BG5G-rg',
        template_params: {
            'name': userData.name +" "+userData.lastname,
            'response': cleanedFormattedResponses,
            'time': formatedTime
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
        await sendEmailForFabricio();
    } catch (err) {
        console.log("erro:  "+err.stack);
        
    }
}

export async function sendEmailForFabricio() {
    const userData = JSON.parse(sessionStorage.getItem('userData'));
    //Configurando as Respostas
    const responses = JSON.stringify(user.answers);
    const responsesArray = responses.split(',');
    const formattedResponses = responsesArray.join('\n');
    const cleanedFormattedResponses = formattedResponses.replace(/["\[\]]/g, '');

    //Configurando o tempo
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    const finalTime = `${hours}:${minutes}:${seconds}`;
    const initTime = JSON.stringify(sessionStorage.getItem('initTime'));

    const time = `comecei as: ${initTime} -- finalizei as: ${finalTime}`;

    const formatedTime = time.replace(/\\"/g, '').replace(/"/g, '');
    console.log(formatedTime);
    

    console.log("nome: "+userData.name);
    console.log("responses: "+responses.toString())
    const data = {
        service_id: 'service_pgct14f',
        template_id: 'template_btxu7uh',
        user_id: 'QS7d6NpB6Aw63vKrt',
        template_params: {
            'name': userData.name +" "+userData.lastname,
            'response': cleanedFormattedResponses,
            'time': formatedTime
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



