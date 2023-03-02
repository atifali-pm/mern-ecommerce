import bcrypt from "bcrypt";

export const hashPassword = async (password) => {
    try {
        const saltRounds = 10;
        console.log(password)
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        console.log(hashedPassword);
        return hashedPassword;
    } catch (error) {
        console.log(error);
    }
};

export const comparePassword = async (password, hashedPassword) => {
    return bcrypt.compare(password, hashedPassword);
};