import React from 'react';
import Form from './components/forms';

export default function ContactPage() {

    const title = "Besoin d'un renseignement ?";
    const description = "Remplissez le formulaire ci-dessous et nous vous répondrons dans les plus brefs délais.";
    const email = "contact@eatybox.com";
    const phone = "02 31 45 67 89";
    const address = "Rue Capitaine Crochet, 14000 Caen, France";
    return (
        <div class="min-h-screen flex flex-col items-center justify-center">
            <Form title={title} description={description} email={email} phone={phone} address={address}/>
        </div>

    );
}