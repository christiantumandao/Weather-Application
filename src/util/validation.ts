
const validateSignUp = (firstName: string, lastName: string, 
    email: string, password: string, confirmPassword: string,
    setErrorMessage: (msg: string) => void) => {
    if (password !== confirmPassword) {
        setErrorMessage("Passwords must match!");
        return false;
    }
    return true;
}

export { validateSignUp };