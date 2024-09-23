import { Modal } from 'react-bootstrap';
import Input from "../components/common/input";
import { useFormik } from "formik";
import Joi from "joi";
import PageHeader from "../components/common/pageHeader";
import { useAuth } from "../contexts/autoContext";
import { toast } from 'react-toastify';
import { useDarkMode } from '../contexts/darkModeContext';

const passwordSchema = Joi.string()
    .min(9) 
    .max(20)
    .required()
    .pattern(/(?=.*[a-z])/, 'lowercase letter') 
    .pattern(/(?=.*[A-Z])/, 'uppercase letter') 
    .pattern(/(?=.*\d)/, 'digit') 
    .pattern(/(?=.*[\W_])/, 'special character') 
    .messages({
        'string.empty': 'Password is required.',
        'string.min': 'Password must be at least 9 characters long.',
        'string.max': 'Password must be at most 20 characters long',
        'string.pattern.base': 'Password must include at least one lowercase letter, one uppercase letter, one digit, and one special character.'
    });

function SigninModal( {show, handleClose }) {
    const { login } = useAuth();
    const { darkMode } = useDarkMode();

    const form = useFormik({
        validateOnMount: true,
        initialValues: {
            email: "",
            password: "",
        },
        validate(values) {
            const schema = Joi.object({
                email: Joi.string().min(6).max(255).required().email({ tlds: { allow: false } }).label("Email"),
                password: passwordSchema,
            });

            const { error } = schema.validate(values, { abortEarly: false });
            if ((!error)) {
                return null;
            }
            const errors = {};
            for (const detail of error.details) {
                const key = detail.path[0];
                errors[key] = detail.message;
            }
            return errors;
        },
        async onSubmit(values) {
            try{
            await login(values);
            toast.success("login sucess", {theme: darkMode ? 'dark' : 'light'});
            form.resetForm();         
            handleClose();
            } catch (error) {
                toast.error(error.response ? error.response.data : error.message, {theme: darkMode ? 'dark' : 'light'});
            }
        },
    });

    const handelModalClose = () =>{
        form.resetForm();
        handleClose();
    }


    return (
    <Modal show={show} onHide={handelModalClose}>
            <Modal.Header closeButton className={darkMode ? "bg-dark text-light" : "bg-light text-dark"} >
                <Modal.Title>Sign In</Modal.Title>
            </Modal.Header>
            <Modal.Body className={darkMode ? "bg-dark text-light" : "bg-light text-dark"}> 
            <PageHeader
                title=""
                description="Sign in with a your account!"
            />

            <form onSubmit={form.handleSubmit} noValidate autoComplete="off">
                <Input
                    {...form.getFieldProps("email")}
                    type="email"
                    label="Email"
                    autoComplete="off"
                    required
                    isValid={!form.errors.email && form.touched.email}
                    error={form.touched.email && form.errors.email}
                    autoFocus
                />
                <Input
                    {...form.getFieldProps("password")}
                    type="password"
                    label="Password"
                    autoComplete="off"
                    required
                    isValid={!form.errors.password && form.touched.password}
                    error={form.touched.password && form.errors.password}
                />


                <div className="my-2">
                    <button className="btn btn-primary" type="submit" disabled={!form.isValid}>Sign in</button>
                </div>
            </form>
            </Modal.Body>
        </Modal>
    );
}

export default SigninModal;