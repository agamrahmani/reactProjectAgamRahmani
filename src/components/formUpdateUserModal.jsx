import { Row, Col } from 'react-bootstrap';
import Input from "./common/input.jsx";
import { useFormik } from "formik";
import  validationSchema  from '../js/schemaUpdateUser.js';


function FormUpdateUserModal({ onSubmit, user }) {
    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            name: { 
                first: user.name.first || "", 
                middle: user.name.middle || "", 
                last: user.name.last || "", },
            phone: user.phone || "",
            image: { 
                url: user.image.url || "",
                alt: user.image.alt || "" },
            address: { 
                state: user.address.state === "not defined" ? "" : user.address.state, 
                country: user.address.country || "", 
                city: user.address.city || "", 
                street: user.address.street || "", 
                houseNumber: user.address.houseNumber || "", 
                zip: user.address.zip || "", },          
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
        },
    });

    return (
            <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
                <Row>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("name.first")}
                    label="First Name"
                    autoComplete="off"
                    required
                    isValid={!form.errors.name?.first && form.touched.name?.first}
                    error={form.touched.name?.first && form.errors["name.first"]}
                />
                </Col>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("name.middle")}
                    label="Middle Name"
                    autoComplete="off"
                    isValid={!form.errors.name?.middle && form.touched.name?.middle}
                    error={form.touched.name?.middle && form.errors["name.middle"]}
                /> 
                </Col>
                <Col md={4}>
                <Input
                    {...form.getFieldProps("name.last")}
                    label="Last Name"
                    autoComplete="off"
                    required
                    isValid={!form.errors.name?.last && form.touched.name?.last}
                    error={form.touched.name?.last && form.errors["name.last"]}
                />
                </Col>
                </Row>
                <Input
                    {...form.getFieldProps("phone")}
                    label="Phone"
                    autoComplete="off"
                    required
                    isValid={!form.errors.phone && form.touched.phone}
                    error={form.touched.phone && form.errors.phone}
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
                <button className="btn btn-primary" type="submit" disabled={!form.isValid}>Update</button>
            </div>
            </form>
        );
}
export default FormUpdateUserModal;