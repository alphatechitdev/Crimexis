import { useEffect } from "react";
import { useAuth } from "../Context/Auth.Context";
import { useRouter } from "next/navigation";






const ProtectedRoute = () => {


    const {isAuthenticated} = useAuth();
    const router = useRouter();

    useEffect(() => {
        if(isAuthenticated === false) {
            router.push('/');
        }
    }, [isAuthenticated]);

    if (isAuthenticated === null) {
        return 
    }

    return (
        <div className="protected-route">

        </div>
    )
};



export default ProtectedRoute;