import { useEffect, useState } from "react";
import { useNewCamp } from "../hooks/useNewCamp";
import { NavLink } from "react-router";
import { useForm } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap'; // Import Spinner
import { ToastContainer } from 'react-toastify';
import { useToast } from "../hooks/useToast";
import { useLocation } from "react-router";
import CampForm from "../components/CampForm";
import Spinner from "../components/Spinner";

const NewCamp = () => {
    const { sendNewCamp } = useNewCamp();
    const location = useLocation();
    const { toasting } = useToast();
    const { register, handleSubmit, formState: { errors, dirtyFields } } = useForm({
        mode: 'onChange',
    });
    const [loading, setLoading] = useState(false); // Add loading state

    useEffect(() => {
        toasting();
    }, []);

    const onSubmit = async (data) => {
        setLoading(true); // Start loading
        const campground = new FormData();
        campground.append("title", data.title);
        campground.append("price", data.price);
        campground.append("location", data.location);
        campground.append("description", data.description);
        for (let i = 0; i < data.image.length; i++) {
            campground.append("image", data.image[i]);
        }
        await sendNewCamp(campground, location);
        setLoading(false); // Stop loading
    };

    const validations = {
        title: { required: "Title is required" },
        location: { required: "Location is required" },
        description: { required: "Description is required" },
        price: {
            required: "Price is required",
            min: { value: 0, message: "Price must be greater than 0" },
        },
        image: {
            validate: {
                maxLength: (files) =>
                    files.length <= 6 || "You can upload up to 6 images only",
                maxSize: (files) => {
                    for (let file of files) {
                        if (file.size > 5 * 1024 * 1024) {
                            return "Each image must be less than 5MB";
                        }
                    }
                    return true;
                },
            },
        },
    };

    return (
        <Container fluid>
            <ToastContainer theme="colored" />
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    {loading ? (
                        <Spinner texto={'Creating...'} />
                    ) : (
                        <>
                            <h1 className="my-3 text-center">New Campground</h1>
                            <CampForm
                                onSubmit={onSubmit}
                                register={register}
                                handleSubmit={handleSubmit}
                                validations={validations}
                                errors={errors}
                                dirtyFields={dirtyFields}
                            />
                            <NavLink to={`/campgrounds`}>
                                Back to campgrounds
                            </NavLink>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default NewCamp;