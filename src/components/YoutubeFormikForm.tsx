import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikErrors, useFormik} from "formik";
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
    const initialValues: IForm = {
        name: '',
        email: '',
        channel: ''
    }
    // const formik = useFormik<IForm>({
    //     initialValues: {
    //         name: '',
    //         email: '',
    //         channel: ''
    //     },
    //     isInitialValid: false,
    //     validationSchema:formSchema,
    //     // validate: (values) => {
    //     //     let errors: FormikErrors<IForm> = {};
    //     //
    //     //     if (!values.name) {
    //     //         errors.name = 'field is required'
    //     //     }
    //     //
    //     //     if (!values.email) {
    //     //         errors.email = 'field is required'
    //     //     }
    //     //
    //     //     if (!values.channel) {
    //     //         errors.channel = 'field is required'
    //     //     }
    //     //
    //     //     return errors;
    //     // },
    //     onSubmit: (values) => {
    //         console.log(values);
    //     },
    //
    // });

    const formKeys = (key: keyof IForm) => {
        return key;
    }

    const onSubmit = (values: IForm) => {
        console.log(values);
    }


    return (
        <div className="row">
            <div className="col-6">
                <Formik<IForm>
                    initialValues={initialValues}
                    isInitialValid={false}
                    onSubmit={onSubmit}
                    validationSchema={formSchema}
                >
                    {(props) => {
                        return <Form>
                            <h1>Formik Form</h1>
                            <div className="form-group">
                                <label htmlFor={formKeys('name')}>name</label>
                                <Field name={formKeys('name')}
                                       type="text"
                                       className="form-control"
                                       id={formKeys('name')}/>
                                <ErrorMessage name={formKeys('name')}>
                                    {errorMessage => <small className="text-danger">{errorMessage}</small>}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <label htmlFor={formKeys('email')}>email</label>
                                <Field name={formKeys('email')}
                                       type="email"
                                       className="form-control"
                                       id={formKeys('email')}/>
                                <ErrorMessage name={formKeys('email')}>
                                    {errorMessage => <small className="text-danger">{errorMessage}</small>}
                                </ErrorMessage>
                            </div>
                            <div className="form-group">
                                <label htmlFor={formKeys('channel')}>channel</label>
                                <Field name={formKeys('channel')}
                                       type="text"
                                    // value={formik.values.channel}
                                    // onChange={formik.handleChange}
                                    // onBlur={formik.handleBlur}
                                       className="form-control"
                                       id={formKeys('channel')}/>
                                <ErrorMessage name={formKeys('channel')}>
                                    {errorMessage => <small className="text-danger">{errorMessage}</small>}
                                </ErrorMessage>
                            </div>
                            <button
                                disabled={!props.isValid}
                                type="submit"
                                className="btn btn-primary">
                                Submit
                            </button>
                        </Form>
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default YoutubeFormikForm;