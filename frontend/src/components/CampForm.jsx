// import React from 'react';
// import { Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap';

// const CampForm = ({
//     onSubmit,
//     register,
//     handleSubmit,
//     validations,
//     errors,
//     dirtyFields,
//     preloadedValues = {}, // Preloaded values for editing
//     campingImages = [], // Existing images for editing
//     handleImageSelect, // Function to handle image deletion
// }) => {
//     return (
//         <Form className="mb-2" noValidate encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
//             {/* Title Field */}
//             <FloatingLabel label="Title" className="mb-3" controlId="title">
//                 {/* <Form.Label>Title</Form.Label> */}
//                 <Form.Control
//                     name="title"
//                     placeholder="Title"
//                     defaultValue={preloadedValues.title || ''}
//                     {...register('title', validations.title)}
//                     isInvalid={errors.title}
//                     isValid={dirtyFields.title && !errors.title}
//                 />
//                 <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Price Field */}
//             <FloatingLabel label="Price" className="mb-3" controlId="price">
//                 <Form.Control
//                     name="price"
//                     type="number"
//                     placeholder="Price"
//                     defaultValue={preloadedValues.price || ''}
//                     {...register('price', validations.price)}
//                     isInvalid={errors.price}
//                     isValid={dirtyFields.price && !errors.price}
//                 />
//                 <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Location Field */}
//             <FloatingLabel label="Location" className="mb-3" controlId="location">
//                 <Form.Control
//                     name="location"
//                     placeholder="Location"
//                     defaultValue={preloadedValues.location || ''}
//                     {...register('location', validations.location)}
//                     isInvalid={errors.location}
//                     isValid={dirtyFields.location && !errors.location}
//                 />
//                 <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Image Upload Field */}
//             <InputGroup className="mb-3" controlId="image">
//                 <Form.Control
//                     name="image"
//                     multiple
//                     type="file"
//                     {...register('image', validations.image)}
//                     isInvalid={errors.image}
//                     isValid={dirtyFields.image && !errors.image}
//                     className="custom-file-input"
//                 />
//                 <InputGroup.Text>Images</InputGroup.Text>
//                 <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
//             </InputGroup>

//             {/* Description Field */}
//             <FloatingLabel label="Description" className="mb-3" controlId="description">
//                 <Form.Control
//                     name="description"
//                     as="textarea"
//                     placeholder="Description"
//                     style={{ height: '150px' }}
//                     defaultValue={preloadedValues.description || ''}
//                     {...register('description', validations.description)}
//                     isInvalid={errors.description}
//                     isValid={dirtyFields.description && !errors.description}
//                 />
//                 <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
//                 <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
//             </FloatingLabel>

//             {/* Existing Images for Editing */}
//             {campingImages.length > 0 && (
//                 <>
//                     <Form.Label className="mb-2">Delete Images</Form.Label>
//                     <div className="d-flex flex-wrap justify-content-center justify-content-md-start mt-3">
//                         {campingImages.map((ele) => (
//                             <div key={ele?.filename} className="mb-3 col-md-5 mx-3">
//                                 <img className="col-12" src={ele?.show} alt="nada" />
//                                 <Form.Check
//                                     type="checkbox"
//                                     label="Select"
//                                     id={`selectImage-${ele?.filename}`}
//                                     name={`selectImage-${ele?.filename}`}
//                                     className="mt-2"
//                                     onChange={(event) => handleImageSelect(event, ele.filename)}
//                                 />
//                             </div>
//                         ))}
//                     </div>
//                 </>
//             )}

//             {/* Submit Button */}
//             <Button className="justify-content-center" variant="primary" type="submit">
//                 Submit
//             </Button>
//         </Form>
//     );
// };

// export default CampForm;

import React from 'react';
import { Form, FloatingLabel, InputGroup, Button } from 'react-bootstrap';

const CampForm = ({
    onSubmit,
    register,
    handleSubmit,
    validations,
    errors,
    dirtyFields,
    preloadedValues = {}, // Preloaded values for editing
    campingImages = [], // Existing images for editing
    handleImageSelect, // Function to handle image deletion
}) => {
    return (
        <Form className="mb-2" noValidate encType="multipart/form-data" onSubmit={handleSubmit(onSubmit)}>
            {/* Title Field */}
            <Form.Group className="mb-3" controlId="title">
                <Form.Label>Title</Form.Label>
                <Form.Control
                    name="title"
                    placeholder="Title"
                    defaultValue={preloadedValues.title || ''}
                    {...register('title', validations.title)}
                    isInvalid={errors.title}
                    isValid={dirtyFields.title && !errors.title}
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.title?.message}</Form.Control.Feedback>
            </Form.Group>

            {/* Price Field */}
            <Form.Group className="mb-3" controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                    name="price"
                    type="number"
                    placeholder="Price"
                    defaultValue={preloadedValues.price || ''}
                    {...register('price', validations.price)}
                    isInvalid={errors.price}
                    isValid={dirtyFields.price && !errors.price}
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.price?.message}</Form.Control.Feedback>
            </Form.Group>

            {/* Location Field */}
            <Form.Group label="Location" className="mb-3" controlId="location">
                <Form.Label>Location</Form.Label>
                <Form.Control
                    name="location"
                    placeholder="Location"
                    defaultValue={preloadedValues.location || ''}
                    {...register('location', validations.location)}
                    isInvalid={errors.location}
                    isValid={dirtyFields.location && !errors.location}
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.location?.message}</Form.Control.Feedback>
            </Form.Group>

            {/* Image Upload Field */}
            <Form.Group className="mb-3" controlId="image">
                <Form.Label>Images</Form.Label>
                <Form.Control
                    name="image"
                    multiple
                    type="file"
                    {...register('image', validations.image)}
                    isInvalid={errors.image}
                    isValid={dirtyFields.image && !errors.image}
                    className="custom-file-input"
                />
                {/* <InputGroup.Text>Images</InputGroup.Text> */}
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.image?.message}</Form.Control.Feedback>
            </Form.Group>

            {/* Description Field */}
            <Form.Group className="mb-3" controlId="description">
                <Form.Label>Description</Form.Label>
                <Form.Control
                    name="description"
                    as="textarea"
                    placeholder="Description"
                    style={{ height: '150px' }}
                    defaultValue={preloadedValues.description || ''}
                    {...register('description', validations.description)}
                    isInvalid={errors.description}
                    isValid={dirtyFields.description && !errors.description}
                />
                <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid">{errors.description?.message}</Form.Control.Feedback>
            </Form.Group>

            {/* Existing Images for Editing */}
            {campingImages.length > 0 && (
                <>
                    <Form.Label className="mb-2">Delete Images</Form.Label>
                    <div className="d-flex flex-wrap justify-content-center justify-content-md-start mt-3">
                        {campingImages.map((ele) => (
                            <div key={ele?.filename} className="mb-3 col-md-5 mx-3">
                                <img className="col-12" src={ele?.show} alt="nada" />
                                <Form.Check
                                    type="checkbox"
                                    label="Select"
                                    id={`selectImage-${ele?.filename}`}
                                    name={`selectImage-${ele?.filename}`}
                                    className="mt-2"
                                    onChange={(event) => handleImageSelect(event, ele.filename)}
                                />
                            </div>
                        ))}
                    </div>
                </>
            )}

            {/* Submit Button */}
            <Button className="justify-content-center" variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default CampForm;