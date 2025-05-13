import { useEffect, useState } from 'react';
import { useParams, useLocation, NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import { useForm } from 'react-hook-form';
import { Container, Row, Col } from 'react-bootstrap';
import { useAuthContext } from '../hooks/useAuthContext';
import { useToast } from '../hooks/useToast';
import { useShowCamp } from '../hooks/useShowCamp';
import { useEditCamp } from '../hooks/useEditCamp';
import CampForm from '../components/CampForm'; // Reusable form component for editing campgrounds
import Spinner from '../components/Spinner';

const EditCamp = () => {
    const location = useLocation(); // Get the current location object
    const [deletedImages, setDeletedImages] = useState([]); // State to track images marked for deletion
    const { id } = useParams(); // Get the campground ID from the URL
    const [camping, setCamping] = useState(null); // State to store the campground data
    const { toasting } = useToast(); // Custom hook for toast notifications
    const { sendNewCamp } = useShowCamp(); // Hook to fetch campground data
    const { editCamp } = useEditCamp(); // Hook to handle editing campground data
    const { register, handleSubmit, setValue, formState: { errors, dirtyFields } } = useForm({
        mode: 'onChange', // Enable real-time validation
    });
    const { user } = useAuthContext(); // Get the current authenticated user
    const [loading, setLoading] = useState(false); // Add loading state

    // Fetch campground data when the component mounts
    useEffect(() => {
        const getCamping = async () => {
            const data = await sendNewCamp(id, '/campgrounds'); // Fetch campground data by ID
            setCamping(data); // Store the fetched data in state

            // Dynamically set form values
            ['title', 'price', 'description', 'location', 'image'].forEach((field) => {
                setValue(field, data[field]);
            });
        };
        getCamping();
    }, []);

    // Trigger toast notifications when the component mounts
    useEffect(() => {
        toasting();
    }, []);

    // Handle form submission
    const onSubmit = async (data) => {
        const existingImages = camping?.image || []; // Get existing images
        const deletedCount = deletedImages.length; // Count of images marked for deletion
        const newImages = data.image && data.image[0] instanceof File ? data.image.length : 0; // Count of new images
        const remainingImages = existingImages.length - deletedCount; // Remaining images after deletion
        const total = remainingImages + newImages; // Total images after adding new ones

        // Check if total images is greater than 6 and trigger error toast in that case
        if (total > 6) {
            toast.error('You can only have a maximum of 6 images per campground.', {
                position: 'top-center',
                autoClose: 3000,
            });
            return;
        }

        // Prepare form data for submission
        setLoading(true); // Start loading spinner
        const campground = new FormData();
        campground.append('title', data.title);
        campground.append('price', data.price);
        campground.append('location', data.location);
        campground.append('description', data.description);
        campground.append('deletedImages', deletedImages);

        // Append new images to the form data in case they are added in the form 
        if (data.image && data.image[0] instanceof File) {
            for (let i = 0; i < data.image.length; i++) {
                campground.append('image', data.image[i]);
            }
        }

        // Submit the edited campground data
        await editCamp(campground, id, location, user);
        setLoading(true); // Stop loading spinner
    };

    // Handle selecting or deselecting images for deletion
    const handleImageSelect = (event, filename) => {
        if (event.target.checked) {
            setDeletedImages((prev) => [...prev, filename]); // Add image to the deletion list
        } else {
            setDeletedImages((prev) => prev.filter((img) => img !== filename)); // Remove image from the deletion list
        }
    };

    // Validation rules for the form fields
    const validations = {
        title: { required: 'Title is required' },
        location: { required: 'Location is required' },
        description: { required: 'Description is required' },
        price: {
            required: 'Price is required',
            min: { value: 0, message: 'Price must be greater than 0' },
        },
        image: {
            validate: {
                maxSize: (files) => {
                    if (!files || files.length === 0) return true; // Allow empty files
                    for (let file of files) {
                        if (file.size > 5 * 1024 * 1024) { // Check file size (5MB limit)
                            return 'Each image must be less than 5MB';
                        }
                    }
                    return true;
                },
            },
        },
    };

    return (
        <Container fluid>
            {/* Toast notifications */}
            <ToastContainer theme="colored" />
            <Row>
                <Col md={{ span: 4, offset: 4 }}>
                    {loading ? (
                        //While the camp is being edited we show the spinner
                        <Spinner texto={'Editing...'} />
                    ) : (
                        <>
                            {/* Page title */}
                            <h1 className="mt-3 text-center">Edit Campground</h1>

                            {/* Reusable form component */}
                            <CampForm
                                onSubmit={onSubmit} // Form submission handler
                                register={register} // React Hook Form's register function
                                handleSubmit={handleSubmit} // React Hook Form's handleSubmit function
                                validations={validations} // Validation rules
                                errors={errors} // Validation errors
                                dirtyFields={dirtyFields} // Fields that have been modified
                                preloadedValues={camping || {}} // Preloaded values for editing
                                campingImages={camping?.image || []} // Existing images for editing
                                handleImageSelect={handleImageSelect} // Image selection handler
                            />

                            {/* Link to navigate back to the campground */}
                            <NavLink to={`/campgrounds/${id}`}>Back to campground</NavLink>
                        </>
                    )}
                </Col>
            </Row>
        </Container>
    );
};

export default EditCamp;