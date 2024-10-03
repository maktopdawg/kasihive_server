const luhnCheck = (idNumber: string): boolean => {
    let sum = 0;
    let shouldDouble = false;

    for (let i = idNumber.length - 1; i >= 0; i--) {
        let digit = parseInt(idNumber.charAt(i), 10);

        if (shouldDouble) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
        shouldDouble = !shouldDouble;
    }

    return sum % 10 === 0;
}

export const isValidID = (idNumber: string): boolean => {
    const idPattern = /^\d{13}$/;

    if (!idPattern.test(idNumber)) {
        return false;
    }

    return luhnCheck(idNumber);
}


export const generateUsername = (name: string, surname: string) => {
    return `${name.toLowerCase().slice(0,3)}_${surname.toLowerCase().slice(0,3)}_${Math.floor(1000 + Math.random() * 9000)}`
}
