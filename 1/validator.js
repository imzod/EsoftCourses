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

        if (schema.type === 'number' && typeof dataToValidate === 'number') {
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
            // return isValid;
        } else {
            this._errors.push('Type is incorrect');
            isValid = false;
            // return isValid;
        }
        if (schema.type === 'string' && typeof dataToValidate === 'string') {
            if (schema.maxLength !== undefined && dataToValidate.length > schema.maxLength) {
                this._errors.unshift('Too long string');
                isValid = false;
            }
            if (schema.format === 'email') {
                const pattern = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/;
                isValid = pattern.test(dataToValidate);
            }
            if (schema.format === 'date' && schema.format === dataToValidate) {
                isValid = false;
                /* const pattern = /^([\w.*-]+@([\w-]+\.)+[\w-]{2,4})?$/;
                 isValid = pattern.test(dataToValidate);*/
            }
            /*if (schema.minLength !== undefined && dataToValidate < schema.minLength) {
                isValid = false;
            }*/
            // return isValid;
        }
        /*if (dataToValidate === null) {
            return true;
        } else if (schema.minimum < dataToValidate) {
            return true;
        } else if (typeof dataToValidate === schema.type) {
            return true;
        }
        /!*else if (dataToValidate > schema.maximum) {
            this._errors.push('Value is greater than it can be')
            return true
        } *!/
        else if (dataToValidate !== schema.oneOf) {
            this._errors.push('None schemas are valid');
        }
        /!*else if (typeof dataToValidate !== schema.type) {
            this._errors.push('Type is incorrect');
        }*!/
        else if (typeof dataToValidate === schema.anyOf[0].type || schema.anyOf[1].type) {
            return true;
        }*/
        return isValid;

    }

}

/*
if (!schema.nullable && dataToValidate === null) {
  this._errors.push('Value is null, but nullable false');

  return false;*/
/*}*/
