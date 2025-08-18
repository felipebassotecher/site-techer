const dynamicValueKey = 'data-dynamic-value';

class DynamicValues {

    valuesAndFunctions

    constructor() {
        const map = new Map();

        map.set('currentYear', () => {
            const date = new Date();
            return date.getFullYear();
        });

        this.valuesAndFunctions = map;
    }
}

const d = new DynamicValues();

const dynamicValuesElements = document.querySelectorAll(`[${dynamicValueKey}]`);

dynamicValuesElements.forEach(element => {
    const dynamicValueType = element.getAttribute(dynamicValueKey);
    const valueFn = d.valuesAndFunctions.get(dynamicValueType);
    if (valueFn) {
        element.textContent = valueFn();
    }
});
