import { useEffect, useState } from 'react';
import { auth } from '../config'; // Assuming you have firebase auth configured
import { useRouter } from 'next/router';

const useAuth = () => {
    const [user, setUser] = useState(null);
    const router = useRouter();

    useEffect(() => {
        const unsubscribe = auth.onAuthStateChanged((user) => {
            if (user) {
                setUser(user);  // User is logged in
            } else {
                setUser(null);  // User is logged out
                router.push('/components/LoginPage');  // Redirect if logged out
            }
        });

        return () => unsubscribe();  // Cleanup the listener on unmount
    }, [router]);

    return user;
};

export default useAuth;