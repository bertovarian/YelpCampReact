import { useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";

export const useToast = () => {
    const [searchParams, setSearchParams] = useSearchParams();
    const toasting = () => {
        if (searchParams.get("cosa")) {
            setSearchParams({});
            return toast.success("Welcome to YelpCamp!", { position: 'top-center', toastId: 'cosa' });
        }
        if (searchParams.get("logout")) {
            setSearchParams({});
            return toast.success("See you soon!", { position: 'top-center', toastId: 'logout' });
        }
        if (searchParams.get("erase")) {
            setSearchParams({});
            return toast.success("Succesfully deleted campground!", { position: 'top-center', toastId: 'erase' });
        }
        if (searchParams.get("success")) {
            setSearchParams({});
            return toast.success("Succesfully created campground!", { position: 'top-center', toastId: 'success' });
        }
        if (searchParams.get("edit")) {
            setSearchParams({});
            return toast.success("Succesfully modified campground!", { position: 'top-center', toastId: 'edit' });
        }
    }
    return { toasting }
}