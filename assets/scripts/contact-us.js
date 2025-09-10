console.log('"Fale conosco" init!');

const queryParams = location.search
    .slice(1)
    .split('&')
    .map(param => {
        const [key, value] = param.split('=');
        return { key, value };
    });

const form = document.getElementById('contact-form');

form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const data = {
        contact: {
            birthday: {
                day: formData.get('birthday-day'),
                month: formData.get('birthday-month'),
                year: formData.get('birthday-year')
            },
            contact_custom_fields: [
                // {
                //     custom_field_id: '646e73a3651e44000f352486',
                //     value: 'Valor X'
                // }
            ],
            deal_ids: [
                // '64dccdc7902ce80001d9fa9f',
                // '64da562812a6310001baa2a4'
            ],
            emails: [
                {
                    email: formData.get('email')
                }
            ],
            facebook: null,
            legal_bases: [
                {
                    category: 'data_processing',
                    status: 'granted',
                    type: 'consent'
                },
                {
                    category: 'communications',
                    status: 'granted',
                    type: 'vital_interest'
                }
            ],
            linkedin: null,
            name: formData.get('name'),
            organization_id: null,
            phones: [
                {
                    phone: formData.get('phone'),
                    type: 'work'
                }
            ],
            skype: null,
            title: 'Software Engineer'
        }
    };

    console.log(data);

    const options = {
        method: 'POST',
        headers: {
            'accept': 'application/json',
            'content-type': 'application/json'
        },
        body: JSON.stringify(data)
    };

    const url = 'https://crm.rdstation.com/api/v1/contacts';
    const token = queryParams.find(param => param.key === 'token')?.value ?? 'xyz';

    fetch(`${url}?token=${token}`, options)
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
});
