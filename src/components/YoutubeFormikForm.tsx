import React from 'react';
import {ErrorMessage, Field, Form, Formik, FormikProps} from "formik";
import * as Yup from 'yup';
import TextError from "./common/TextError";

type IForm = {
    name: string;
    email: string;
    channel: string;
    comment: string;
    social: {
        facebook: string;
        twitter: string;
    }
}

function YoutubeFormikForm(props) {

    const initialValues: IForm = {
        name: '',
        email: '',
        channel: '',
        comment: '',
        social: {
            facebook: '',
            twitter: ''
        }
    }


    //formik
    const formSchema = Yup.object().shape<IForm>({
        name: Yup.string().required('required'),
        email: Yup.string().email('invalid format').required('required'),
        channel: Yup.string().required('required'),
        comment: Yup.string().required('required').max(200, 'allowed string length 200'),
        social: Yup.object().shape<typeof initialValues.social>({
            facebook: Yup.string().required(),
            twitter: Yup.string().required()
        }),
    });
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

    const socialKeys = (key: keyof typeof initialValues.social) => {
        return key;
    }

    const socialNames = (key: keyof typeof initialValues.social) => {
        return `${formKeys('social')}.${key}`
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
                                <Field name={formKeys('name')}>
                                    {({field, form}) => {
                                        const formProps = form as FormikProps<IForm>;
                                        return <input
                                            {...field}
                                            className="form-control"
                                            id={formKeys('name')}
                                            placeholder={'name...'}
                                        />
                                    }}
                                </Field>
                                <ErrorMessage name={formKeys('name')}
                                              component={TextError}/>
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
                            {/*comment*/}
                            <div className="form-group">
                                <label htmlFor={formKeys('comment')}>comment</label>
                                <Field
                                    as='textarea'
                                    name={formKeys('comment')}
                                    type="text"
                                    placeholder={'comment'}
                                    className="form-control"
                                    id={formKeys('comment')}/>
                                <ErrorMessage name={formKeys('comment')}>
                                    {errorMessage => <small className="text-danger">{errorMessage}</small>}
                                </ErrorMessage>
                            </div>
                            {/*social*/}
                            <div className="form-group">
                                <label htmlFor={socialKeys('facebook')}>facebook</label>
                                <Field
                                    name={socialNames('facebook')}>
                                    {({field, form}) => {
                                        const formProps = form as FormikProps<IForm>;
                                        return <input
                                            {...field}
                                            className="form-control"
                                            id={socialKeys('facebook')}
                                            placeholder={'url...'}
                                        />
                                    }}
                                </Field>
                                <ErrorMessage name={socialNames('facebook')}
                                              component={TextError}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor={socialKeys('twitter')}>twitter</label>
                                <Field
                                    name={socialNames('twitter')}>
                                    {({field, form}) => {
                                        const formProps = form as FormikProps<IForm>;
                                        return <input
                                            {...field}
                                            className="form-control"
                                            id={socialKeys('twitter')}
                                            placeholder={'url...'}
                                        />
                                    }}
                                </Field>
                                <ErrorMessage name={socialNames('twitter')}
                                              component={TextError}/>
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