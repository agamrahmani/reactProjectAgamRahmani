import { Row, Col } from 'react-bootstrap';
import { useFormik } from "formik";
import Input from "./common/input.jsx";
import  validationSchema  from '../js/scheamaCard.js';


function FormCardModal({ onSubmit }) {
    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            title: "",
            subtitle: "",
            description: "",
            phone: "",
            email: "",
            web: "",
            image: { url: "", alt: "", },
            address: { state: "", country: "", city: "", street: "", houseNumber: "", zip: "", }, 
        },
        validate(values) {
            const { error } = validationSchema.validate(values, { abortEarly: false });
            if ((!error)) {
                return null;    
            }
            const errors = {};
            for (const detail of error.details) {
                const path = detail.path.join('.'); 
                errors[path] = detail.message;
            }
            return errors;
        },
        onSubmit(values) {
            onSubmit(values);
            form.resetForm();
        },
    });

    return (
            <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
                <Row>
                <Col md={6}>
                <Input
                    {...form.getFieldProps("title")}
                    label="Title"
                    autoComplete="off"
                    required
                    isValid={!form.errors.title && form.touched.title}
                    error={form.touched.title && form.errors.title}
                    autoFocus
                />
                </Col>
                <Col md={6}>
                <Input
                    {...form.getFieldProps("subtitle")}
                    label="Subtitle"
                    autoComplete="off"
                    required
                    isValid={!form.errors.subtitle && form.touched.subtitle}
                    error={form.touched.subtitle && form.errors.subtitle}
                /> 
                </Col>
                </Row>
                <Input
                    {...form.getFieldProps("description")}
                    type="textarea"
                    label="Description"
                    autoComplete="off"
                    required
                    isValid={!form.errors.description && form.touched.description}
                    error={form.touched.description && form.errors.description}
                    style= {{height: '150px'}}
                />
                <Input
                    {...form.getFieldProps("phone")}
                    label="Phone"
                    autoComplete="off"
                    required
                    isValid={!form.errors.phone && form.touched.phone}
                    error={form.touched.phone && form.errors.phone}
                />
                <Input
                    {...form.getFieldProps("email")}
                    type="email"
                    label="Email"
                    autoComplete="off"
                    required
                    isValid={!form.errors.email && form.touched.email}
                    error={form.touched.email && form.errors.email}
                />
                <Input
                    {...form.getFieldProps("web")}
                    label="Web"
                    autoComplete="off"
                    isValid={!form.errors.web && form.touched.web}
                    error={form.touched.web && form.errors.web}
                />

                <Row>
                <Col md={6}>
                <Input
                    {...form.getFieldProps("image.url")}
                    label="Image Url"
                    autoComplete="off"
                    isValid={!form.errors.image?.url && form.touched.image?.url}
                    error={form.touched.image?.url && form.errors["image.url"]}
                />
                </Col>
                <Col md={6}>
                <Input
                    {...form.getFieldProps("image.alt")}
                    label="Image Alt"
                    autoComplete="off"
                    isValid={!form.errors.image?.alt && form.touched.image?.alt}
                    error={form.touched.image?.alt && form.errors["image.alt"]}
                /> 
                </Col>
                </Row>
                <Row>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("address.state")}
                    label="State"
                    autoComplete="off"
                    isValid={!form.errors.address?.state && form.touched.address?.state}
                    error={form.touched.address?.state && form.errors["address.state"]}
                />
                </Col>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("address.country")}
                    label="Country"
                    autoComplete="off"
                    required
                    isValid={!form.errors.address?.country && form.touched.address?.country}
                    error={form.touched.address?.country && form.errors["address.country"]}
                />
                </Col>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("address.city")}
                    label="City"
                    autoComplete="off"
                    required
                    isValid={!form.errors.address?.city && form.touched.address?.city}
                    error={form.touched.address?.city && form.errors["address.city"]}
                />
                </Col>
                </Row>
                <Row>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("address.street")}
                    label="Street"
                    autoComplete="off"
                    required
                    isValid={!form.errors.address?.street && form.touched.address?.street}
                    error={form.touched.address?.street && form.errors["address.street"]}
                />
                </Col>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("address.houseNumber")}
                    type="number"
                    label="House Number"
                    autoComplete="off"
                    required
                    isValid={!form.errors.address?.houseNumber && form.touched.address?.houseNumber}
                    error={form.touched.address?.houseNumber && form.errors["address.houseNumber"]}
                />
                </Col>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("address.zip")}
                    type="number"
                    label="Zip"
                    autoComplete="off"
                    required
                    isValid={!form.errors.address?.zip && form.touched.address?.zip}
                    error={form.touched.address?.zip && form.errors["address.zip"]}
                />
                </Col>
                </Row>


            <div className="my-2">
                <button className="btn btn-primary" type="submit" disabled={!form.isValid}>Submit</button>
            </div>
            </form>
        );
}
export default FormCardModal;