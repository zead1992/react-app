import React from 'react';
import {FormikErrors, useFormik} from "formik";
import * as Yup from 'yup';

type IForm = {
    name: string;
    email: string;
    channel: string;
}

function YoutubeFormikForm(props) {

    //formik
    const formSchema = Yup.object<IForm>({
        name: Yup.string().required('required'),
        email: Yup.string().email('invalid format').required('required'),
        channel: Yup.string().required('required')
    });
    const formik = useFormik<IForm>({
        initialValues: {
            name: '',
            email: '',
            channel: ''
        },
        isInitialValid: false,
        validationSchema:formSchema,
        // validate: (values) => {
        //     let errors: FormikErrors<IForm> = {};
        //
        //     if (!values.name) {
        //         errors.name = 'field is required'
        //     }
        //
        //     if (!values.email) {
        //         errors.email = 'field is required'
        //     }
        //
        //     if (!values.channel) {
        //         errors.channel = 'field is required'
        //     }
        //
        //     return errors;
        // },
        onSubmit: (values) => {
            console.log(values);
        },

    });

    const formKeys = (key: keyof IForm) => {
        return key;
    }


    return (
        <div className="row">
            <div className="col-6">
                <form onSubmit={formik.handleSubmit}>
                    <h1>Formik Form</h1>
                    <div className="form-group">
                        <label htmlFor={formKeys('name')}>name</label>
                        <input name={formKeys('name')}
                               type="text"
                               value={formik.values.name}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               className="form-control"
                               id={formKeys('name')}/>
                        {
                            formik.touched.name && formik.errors.name &&
                            <small className="text-danger">
                                {formik.errors.name}
                            </small>
                        }

                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('email')}>email</label>
                        <input name={formKeys('email')}
                               type="email"
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               className="form-control"
                               id={formKeys('email')}/>
                        {
                            formik.touched.email && formik.errors.email &&
                            <small className="text-danger">
                                {formik.errors.email}
                            </small>
                        }
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('channel')}>channel</label>
                        <input name={formKeys('channel')}
                               type="text"
                               value={formik.values.channel}
                               onChange={formik.handleChange}
                               onBlur={formik.handleBlur}
                               className="form-control"
                               id={formKeys('channel')}/>
                        {
                            formik.touched.channel && formik.errors.channel &&
                            <small className="text-danger">
                                {formik.errors.channel}
                            </small>
                        }
                    </div>
                    <button
                        disabled={!formik.isValid}
                        type="submit"
                        className="btn btn-primary">
                        Submit
                    </button>
                </form>
            </div>
        </div>
    );
}

export default YoutubeFormikForm;