import { useNavigate } from "react-router-dom";
export const errUtils = () => {
    const navigate = useNavigate()
    const goError = (e, location) => {
        navigate('/error', {
            state: {
                error: e.message,
                custom: e.response?.data?.error,
                status: e.response?.status,
                path: location
            }
        });
    }
    return { goError }
}

