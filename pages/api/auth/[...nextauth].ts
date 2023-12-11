import { signInWithEmailAndPassword } from "firebase/auth";
import NextAuth from "next-auth"
import CreaditialsProvider from "next-auth/providers/credentials"
import { auth } from "@/app/firebase"

export const authOptions = {
    pages: {
        signIn: '/'
    },
    providers: [
        CreaditialsProvider({
            name: 'Credentials',
            credentials: {},
            async authorize(credentials): Promise<any> {
                return await signInWithEmailAndPassword(auth, (credentials as any).email || '', (credentials as any).password || '')
                    .then(userCredential => {
                        if (userCredential.user) {
                            return userCredential.user;
                        }
                        return null;
                    })
                    .catch(error => (console.log(error)))
            }
        })
    ],
}

export default NextAuth(authOptions)