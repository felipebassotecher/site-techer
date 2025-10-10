console.log('"Fale conosco" init!');

const loading = {
    _element: document.getElementById('global-loading'),
    _duration: 500,
    show: () => {
        loading._element.style.opacity = '0';
        loading._element.classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        const delay = 100;
        setTimeout(() => {
            loading._element.style.opacity = '0.8';
        }, delay);
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve();
            }, loading._duration + delay);
        });
    },
    hide: () => {
        loading._element.style.opacity = '0';
        return new Promise((resolve) => {
            setTimeout(() => {
                document.body.style.overflow = 'auto';
                loading._element.classList.add('hidden');
                resolve();
            }, loading._duration);
        });
    }
};

const queryParams = location.search
    .slice(1)
    .split('&')
    .map(param => {
        const [key, value] = param.split('=');
        return { key, value };
    });

setTimeout(() => {
    loading.show();
    
    setTimeout(() => {
        loading.hide();
    }, 2500);
}, 500);

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
            'content-type': 'application/json',
            'access-control-allow-origin': '*'
        },
        body: JSON.stringify(data)
    };

    const url = 'https://crm.rdstation.com/api/v1/contacts';
    const token = queryParams.find(param => param.key === 'token')?.value ?? 'xyz';

    fetch(`${url}?token=${token}`, { ...options, mode: 'cors' })
        .then(res => res.json())
        .then(res => console.log(res))
        .catch(err => console.error(err));
});
