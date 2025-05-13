import React from 'react';
import { Modal, Button, Form, FloatingLabel } from 'react-bootstrap';
import { Controller } from 'react-hook-form';
import { Rating } from '@mui/material';
import { FaStar, FaRegStar } from 'react-icons/fa';

const ReviewModal = ({ show, handleClose, onSubmit, control, register, validations, errors, dirtyFields, handleSubmit }) => {
    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Body>
                <Form className="mb-2" noValidate onSubmit={handleSubmit(onSubmit)}>
                    <Form.Group className="my-3" controlId="rating">
                        <Controller
                            name="rating"
                            control={control}
                            defaultValue={0}
                            rules={validations.rating}
                            render={({ field }) => (
                                <Rating
                                    {...field}
                                    value={Number(field.value)} // Ensure the value is a number
                                    onChange={(event, newValue) => field.onChange(newValue)} // Handle change
                                    precision={1}
                                    size="large"
                                    icon={<FaStar style={{ color: 'gold' }} />}
                                    emptyIcon={<FaRegStar />}
                                />
                            )}
                        />
                        {errors.rating && <div className="invalid-feedback d-block">{errors.rating.message}</div>}
                    </Form.Group>

                    <FloatingLabel label="Body" className="my-3" controlId="title">
                        <Form.Control
                            name="body"
                            as="textarea"
                            placeholder="Body"
                            {...register('body', validations.body)}
                            isInvalid={errors.body}
                            isValid={dirtyFields.body && !errors.body}
                        />
                        <Form.Control.Feedback type="valid">Looks good!</Form.Control.Feedback>
                        <Form.Control.Feedback type="invalid">{errors.body?.message}</Form.Control.Feedback>
                    </FloatingLabel>

                    <Button variant="outline-primary" type="submit">
                        Submit
                    </Button>
                    <Button className="mx-1" variant="outline-secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Form>
            </Modal.Body>
        </Modal>
    );
};

export default ReviewModal;