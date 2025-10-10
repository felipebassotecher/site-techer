import { LOCAL_STORAGE_KEYS, LocalStorageHelper } from './local-storage-helper.js';

const queryParams = (() => {
    const keyValueParams = location.search
        .slice(1)
        .split('&')
        .map(param => {
            const [key, value] = param.split('=');
            return { key, value };
        });

    const map = new Map([['', '']]);
    map.clear();
    keyValueParams.forEach(({ key, value }) => {
        map.set(key, value);
    });

    return map;
})();

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

const contactContainerMode = {
    _successContainer: document.getElementById('contact-success-container'),
    _formContainer: document.getElementById('contact-form-container'),
    showSuccess: () => {
        contactContainerMode._formContainer.classList.add('hidden');
        contactContainerMode._formContainer.remove();
        contactContainerMode._successContainer.classList.remove('hidden');
    },
    showForm: () => {
        contactContainerMode._successContainer.classList.add('hidden');
        contactContainerMode._successContainer.remove();
        contactContainerMode._formContainer.classList.remove('hidden');
    }
};

const errorMessage = {
    _element: document.getElementById('form-error-message'),
    show: (message) => {
        const messageElement = errorMessage._element.querySelector('#form-error-message-text');
        messageElement.textContent = message;
        errorMessage._element.classList.remove('hidden');
    },
    hide: () => {
        errorMessage._element.classList.add('hidden');
    }
};

const redirectToForm = (success) => {
    location.href = `fale-conosco/index.html?success=${success.toString()}#entre-em-contato`;
};

const isValidFormData = (data) => {
    if (!data.aceitaPoliticaDePrivacidade) {
        errorMessage.show('Você precisa aceitar a política de privacidade para continuar.');
        return false;
    }

    return true;
};

const form = document.getElementById('contact-form');

if (queryParams.get('success') === 'true') {
    const showSuccess = LocalStorageHelper.get(LOCAL_STORAGE_KEYS.FaleConosco.ShowSuccessMessage);

    if (showSuccess) {
        contactContainerMode.showSuccess();
        LocalStorageHelper.set(LOCAL_STORAGE_KEYS.FaleConosco.ShowSuccessMessage, false);
    } else {
        redirectToForm(false);
    }
} else {
    contactContainerMode.showForm();

    const honeypotElement = document.querySelector('[data-contact-us-automatically]');
    honeypotElement.style.display = 'none';
    
    form.addEventListener('submit', (event) => {
        event.preventDefault();

        errorMessage.hide();
    
        const formData = new FormData(form);
        const payload = {
            nome: formData.get('name'),
            email: formData.get('email'),
            telefone: formData.get('phone'),
            mensagem: formData.get('message'),
            spam: formData.get('contact-us-automatically'),
            aceitaPoliticaDePrivacidade: formData.get('accept-terms')
        };

        if (!isValidFormData(payload)) {
            return;
        }

        // const options = {
        //     method: 'POST',
        //     headers: {
        //         'accept': 'application/json',
        //         'content-type': 'application/json',
        //         'access-control-allow-origin': '*'
        //     },
        //     body: JSON.stringify(payload)
        // };
    
        // const url = 'https://techer.com.br/api/contato';

        // const request$ = fetch(url, { ...options, mode: 'cors' });
        const request$ = new Promise((resolve) => {
            setTimeout(() => {
                resolve({
                    success: false,
                    message: 'Envio de mensagens temporariamente indisponível :( Tente novamente mais tarde, ou envie um email para contato@techer.com.br'
                });
            }, 5000);
        });

        loading.show()
            .then(() => request$)
            // .then(res => res.json())
            .then(res => {
                if (res?.success) {
                    return {
                        success: true,
                        message: 'Mensagem enviada com sucesso!'
                    };
                };

                return {
                    success: false,
                    message: res?.message ?? 'Erro ao enviar mensagem. Tente novamente mais tarde.'
                };
            })
            .catch((err) => {
                console.error(err);
                return {
                    success: false,
                    message: 'Não foi possível salvar sua mensagem agora. Por favor, tente novamente mais tarde.'
                };
            })
            .then(response => {
                if (response.success) {
                    loading.hide();
                    redirectToForm(true);
                    LocalStorageHelper.set(LOCAL_STORAGE_KEYS.FaleConosco.ShowSuccessMessage, true);
                } else {
                    loading.hide();
                    errorMessage.show(response.message);
                }
            });
    });
}
