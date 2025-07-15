import argon2 from 'argon2';


export default async function hashPassword(password:string) : Promise<string> {
    try {
        const hashedPassword = await argon2.hash(password , {
            type: argon2.argon2id,
            memoryCost: 2 ** 16,
            timeCost: 3,
            parallelism: 1,
        });
        return hashedPassword;
    } catch (error) {
        console.error("Error While Hashing, ", error);
        throw error;
    }
}

export async function verifyPassword(hashedPassword : string, password: string) : Promise<boolean>{
    try {
        if (! await argon2.verify(hashedPassword, password)) {
            console.error("False Creds");
            return false;
        } else {
            return true;
        }
    } catch (error) {
        console.error("Error While verification, ", error);
        return false;
    }
}

