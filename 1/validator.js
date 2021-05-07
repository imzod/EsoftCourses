class Validator {
    constructor() {
        this._errors = [];
    }

    get Errors() {
        return this._errors;
    }


    /**
     *
     * @param schema
     * @param dataToValidate
     * @returns {boolean}
     */
    isValid(schema = {}, dataToValidate) {
        let isValid = true;

        if (schema.type !== undefined && typeof dataToValidate !== schema.type) {
            this._errors.unshift('Unknown type')
            isValid = false;
        }
        if (schema.anyOf !== undefined) {
            let any = schema.anyOf
            for (let i = 0; i < any.length; i++) {
                if (typeof dataToValidate === any[i].type) {
                    isValid = true;
                } else {
                    this._errors.unshift('None schemas are valid')
                    isValid = false;
                }
            }
        }

        if (schema.oneOf !== undefined) {
            let one = schema.oneOf
            for (let i = 0; i < one.length; i++) {
                if (typeof dataToValidate === one[i].type) {
                    if ('properties' in one[i]) {
                        let keys = Object.keys(one[i].properties)
                        keys.forEach(key => {
                            if (key in dataToValidate) {
                                one[i].properties[key].type === typeof dataToValidate[key]
                                /*console.log(isValid)*/
                            }
                            /*console.log(isValid)*/
                        })
                        /*console.log(isValid)*/
                    }
                    console.log(isValid)
                }
                console.log(isValid)
            }
            /*console.log(isValid)*/
        }

        if (schema.type === 'number' && typeof dataToValidate === 'number') {

            if (typeof schema.type === 'number' && typeof dataToValidate === 'number') {
                isValid = true;
            }
            if (schema.minimum !== undefined && dataToValidate < schema.minimum) {
                this._errors.push('Value is less than it can be')
                isValid = false;
            }
            if (schema.maximum !== undefined && dataToValidate > schema.maximum) {
                this._errors.push('Value is greater than it can be')
                isValid = false;
            }
            if (schema.enum !== undefined && !schema.enum.includes(dataToValidate)) {
                this._errors.push('The enum does not support value');
                isValid = false;
            }

        }

        if (typeof schema.type === 'string' && typeof dataToValidate === 'string') {
            if (typeof schema.type === 'string' && typeof dataToValidate === 'string') {
                isValid = true;
            }
            if (schema.enum !== undefined && schema.enum.includes(dataToValidate) === true) {
                isValid = true;
            }
            if (schema.enum !== undefined && schema.enum.includes(dataToValidate) !== true) {
                this._errors.unshift('The enum does not support value');
                isValid = false;
            }
            if (schema.maxLength !== undefined && dataToValidate.length > schema.maxLength) {
                this._errors.unshift('Too long string');
                isValid = false;
            }
            if (schema.minLength !== undefined && dataToValidate.length < schema.minLength) {
                this._errors.unshift('Too short string');
                isValid = false;
            }
            if (schema.minLength !== undefined && dataToValidate.length > schema.minLength) {
                isValid = true;
            }
            if (schema.maxLength !== undefined && dataToValidate.length < schema.maxLength) {
                isValid = true;
            }
            if (schema.format === 'email') {
                const pattern = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/;
                isValid = pattern.test(dataToValidate);
            }
            if (schema.format === 'date') {
                isValid = true;
                const pattern = /\d{4}-\d{1,2}-\d{1,2}/;
                isValid = pattern.test(dataToValidate);
            }
            if (schema.format === 'date') {
                this._errors.unshift('Format of string is not valid');
                isValid = false;
                const pattern = /\d{4}-\d{1,2}-\d{1,2}/;
                isValid = pattern.test(dataToValidate);
            }
            if (!dataToValidate.match(schema.pattern)) {
                this._errors.unshift('String does not match pattern')
                isValid = false;
            }
        }
        if (schema.type === 'number' && typeof dataToValidate !== schema.type) {
            this._errors.unshift('Type is incorrect')
            isValid = false;
        }
        if (schema.type === 'string' && typeof dataToValidate !== schema.type) {
            this._errors.unshift('Type is incorrect')
            isValid = false;
        }
        if (schema.type === 'boolean') {
            if (schema.type === 'boolean' && dataToValidate !== 'boolean') {
                this._errors.unshift('Type is incorrect')
                isValid = false;
            }
            if (typeof dataToValidate === schema.type) {
                isValid = true;
            }
            if (schema.nullable !== undefined && schema.nullable === true) {
                isValid = true;
            }

        }
        if (schema.type === 'array') {
            if (schema.type !== undefined && typeof dataToValidate !== schema.type) {
                this._errors.unshift('Type is incorrect')
                isValid = false;
            }
            if (schema.nullable !== undefined && schema.nullable === true && dataToValidate === null) {
                isValid = true;
            }
            /*if (Array.isArray(dataToValidate) && schema.type === 'array') {
                isValid = true;
            }*/
            /*if (schema.items.type !== undefined && Array.isArray(dataToValidate) && schema.type === 'array') {
                for (let i = 0; i < dataToValidate.length; i++) {
                    if (typeof dataToValidate[i] === schema.items.type) {
                        isValid = true;
                    } else {
                        this._errors.unshift('Type is incorrect')
                        isValid = false;
                    }
                }
                console.log(isValid)
            }*/
            if (schema.maxItems !== undefined && dataToValidate.length < schema.maxItems) {
                isValid = true;
            }
            if (schema.maxItems !== undefined && dataToValidate.length > schema.maxItems) {
                isValid = false;
                this._errors.unshift('Items count more than can be')
            }
            if (schema.minItems !== undefined && dataToValidate.length > schema.minItems) {
                isValid = true;
            }
            if (schema.minItems !== undefined && dataToValidate.length < schema.minItems) {
                isValid = false;
                this._errors.unshift('Items count less than can be')
            }
            if (dataToValidate === null && schema.nullable === true) {
                isValid = true;
            }
        }

        if (schema.type === 'object') {
            if (dataToValidate === null && schema.nullable === true) {
                isValid = true;
            }
            /*if (typeof dataToValidate === schema.type) {

            }*/
            if (Array.isArray(dataToValidate) && schema.type === 'object') {
                isValid = false;
                this._errors.unshift('Type is incorrect')
            }
            if (Object.values(dataToValidate).length <= schema.maxProperties) {
                isValid = true;
            }
            if (Object.values(dataToValidate).length > schema.maxProperties) {
                isValid = false;
                this._errors.unshift('Too many properties in object')
            }
            if (Object.values(dataToValidate).length >= schema.minProperties) {
                isValid = true;
            }
            if (Object.values(dataToValidate).length < schema.minProperties) {
                isValid = false;
                this._errors.unshift('Too few properties in object')
            }
            /*if (schema.required !== undefined) {
                for (let i = 0; i < Object.keys(dataToValidate).length; i++) {
                    if (Object.keys(dataToValidate)[i] !== schema.required[i]) {
                        console.log(isValid)
                    }
                }
            }*/
        }
        if (schema.type === 'number' && schema.nullable === true) {
            if (dataToValidate === null) {
                isValid = true;
            }
        }
        if (schema.type === 'number' && schema.nullable === false) {
            if (dataToValidate === null) {
                isValid = false;
                this._errors.unshift('Value is null, but nullable false')
            }
        }
        return isValid;
    }
}

/*
if (!schema.nullable && dataToValidate === null) {
  this._errors.push('Value is null, but nullable false');

  return false;*/
/*}*/
