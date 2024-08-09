const phone_FR = /^(?:(?:\()(?:\+)33)(?:\))\s*[1-9](?:[\s.-]*\d{2}){4}$/

export const phoneValidator_FR = (phoneNumber: string) => {
    return phone_FR.test(phoneNumber)
}