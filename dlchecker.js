window.dataLayerChecker = (function() {

    function toString() {
        return JSON.stringify(dataLayerChecker, null, 2);
    }

    function addProperty(name, value, type) {
        dataLayerChecker[name] = {
            'value': value,
            'type': type
        };
        return this.toString();
    }



    function isValidString(name, value, regex, minLength, maxLength) {
        if (typeof value !== "string") {
            console.log(name + " deveria ser uma string");
            return false;
        }
        if (typeof regex !== "undefined" && !regex.test(value)) {
            console.log(name + " não corresponde ao formato esperado");
            return false;
        }
        if (typeof minLength !== "undefined" && value.length < minLength) {
            console.log(name + "tem tamanho menor do que o esperado");
            return false;
        }
        if (typeof maxLength !== "undefined" && value.length > maxLength) {
            console.log(name + "tem tamanho maior do que o esperado");
            return false;
        }
        return true;
    }

    function isValidBoolean(name, value) {
        if (typeof value !== 'boolean') {
            console.log(name + " deveria ser do tipo booleano");
        }
        return true;
    }

    function isValidNumber(name, value, minValue, maxValue) {
        if (typeof value !== "number") {
            if (typeof value === "string") {
                console.log(name + " deveria ser do tipo number, mas é uma string");
            } else {
                console.log(name + " deveria ser do tipo number número");
            }
            return false;
        }
        if (typeof minValue !== "undefined" && value < minValue) {
            console.log(name + " abaixo do valor mínimo esperado (valor mínimo é " + minValue + ")");
        }
        if (typeof maxValue !== "undefined" && value > maxValue) {
            console.log(name + " acima do valor máximo esperado (valor máximo é " + maxValue + ")");
        }
        return true;
    }

    function isValidVector(name, vec, expectedObject, minLength, maxLength) {
        if (typeof vec !== "object" || !vec.length) {
            console.log(name + " deveria ser um vetor");
            return false;
        }
        if (typeof minLength === "number" && vec.length < minLength) {
            console.log(name + " tem tamanho menor do que o esperado (valor mínimo é " + minLength + ");");
            return false;
        }
        if (typeof expectedObject !== "undefined") {
            if (typeof expectedObject === "object" && expectedObject.forEach) {
                vec.forEach(function(elem, idx) {
                    validate(name + "[" + idx + "]", elem, expectedObject);
                });
            } else if (typeof expectedObject === "object" && expectedObject.type === "string") {
                vec.forEach(function(elem, idx) {
                    isValidString(name + "[" + idx + "]", elem, expectedObject.regex, expectedObject.minLength, expectedObject.maxLength);
                });
            } else {
                console.log(name + " apresenta objetos de tipo não suportados");
            }
        }
        if (typeof maxLength === "number" && vec.length > maxLength) {
            console.log(name + " tem tamanho maior do que o esperado (valor máximo é " + maxLength + ");");
            return false;
        }
        return true;
    }

    function validate(name, dataNow, expected) {
        if (typeof expected === "object" && expected.length) {
            expected.forEach(function(data) {
                var checker = data.validate || {};
                switch (data.type) {
                    case 'string':
                        /*isValidString(name, value, regex, minLength, maxLength) {*/
                        isValidString(name + '.' + data.name, dataNow[data.name], checker.regex, checker.minLength, checker.maxLength);
                        break;

                    case 'boolean':
                        /*isValidBoolean(name, value)*/
                        isValidBoolean(name + '.' + data.name, dataNow[data.name]);
                        break;

                    case 'number':
                        /*isValidNumber(name, value, minValue, maxValue)*/
                        isValidNumber(name + '.' + data.name, dataNow[data.name], checker.minValue, checker.maxValue);
                        break;

                    case 'vector':
                        isValidVector(name + '.' + data.name, dataNow[data.name], checker.expectedStructure, checker.minLength, checker.maxLength);
                        break;
                    default:
                        console.log("tipo de dado não reconhecido");
                }
            });
        }
    }

    return {
        'toString': toString,
        'addProperty': addProperty
    };
})();
