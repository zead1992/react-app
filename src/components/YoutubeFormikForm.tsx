import React from 'react';
import {ErrorMessage, Field, FieldArray, Form, Formik, FormikProps} from "formik";
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
    };
    phoneNumbers: string[];
    categories: string[];
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
        },
        phoneNumbers: ['', ''],
        categories: ['val 1', 'val 2']
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
        phoneNumbers: Yup.array().of<string>(Yup.string().required('required')),
        categories: Yup.array().of<string>(Yup.string().required('required'))
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
                            <button onClick={props.validateForm}
                                    className="btn btn-primary m-3">
                                validate form
                            </button>
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
                            {/*social nested*/}
                            <div className="form-group">
                                <label htmlFor={socialKeys('facebook')}>facebook</label>
                                <Field
                                    name={socialNames('facebook')}>
                                    {/*social.name*/}
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
                            {/*phone numbers*/}
                            <div className="form-group">
                                <label htmlFor="primaryPh">primary phone</label>
                                <Field
                                    name={`${formKeys('phoneNumbers')}[0]`}>
                                    {/*phoneNumbers[index]*/}
                                    {({field, form}) => {
                                        const formProps = form as FormikProps<IForm>;
                                        return <input
                                            {...field}
                                            className="form-control"
                                            id="primaryPh"
                                        />
                                    }}
                                </Field>
                                <ErrorMessage name={`${formKeys('phoneNumbers')}[0]`}
                                              component={TextError}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="secondaryPh">secondary phone</label>
                                <Field
                                    name={`${formKeys('phoneNumbers')}[1]`}>
                                    {({field, form}) => {
                                        const formProps = form as FormikProps<IForm>;
                                        return <input
                                            {...field}
                                            className="form-control"
                                            id="secondaryPh"
                                        />
                                    }}
                                </Field>
                                <ErrorMessage name={`${formKeys('phoneNumbers')}[1]`}
                                              component={TextError}/>
                            </div>
                            {/*categories*/}
                            <h2>Categories Fields</h2>
                            <div className="form-group">
                                <FieldArray name={formKeys('categories')}>
                                    {(categoriesProps) =>
                                        <div>
                                            {
                                                props.values.categories
                                                    .map((cat, index) =>
                                                        <div className="row align-items-center justify-content-start"
                                                             key={index}>
                                                            <div className="col-12 m-0">
                                                                <label
                                                                    htmlFor={`${formKeys('categories')}[${index}]`}>category {index + 1}
                                                                </label>
                                                            </div>
                                                            <div className="col-10">
                                                                <Field
                                                                    name={`${formKeys('categories')}[${index}]`}>
                                                                    {({field}) => {
                                                                        return <input
                                                                            {...field}
                                                                            className="form-control"
                                                                            id={`${formKeys('categories')}[${index}]`}
                                                                        />
                                                                    }}
                                                                </Field>
                                                                <ErrorMessage
                                                                    name={`${formKeys('categories')}[${index}]`}
                                                                    component={TextError}/>
                                                            </div>
                                                            <div className="col-2">
                                                                <button onClick={() => categoriesProps.remove(index)}
                                                                        className="btn btn-primary m-2"
                                                                        type="button">
                                                                    -
                                                                </button>
                                                            </div>
                                                        </div>
                                                    )
                                            }
                                            <button onClick={() => categoriesProps.push("")}
                                                    className="btn btn-primary m-2"
                                                    type="button">
                                                Add Category
                                            </button>
                                            {props.values.categories.length > 0 ?
                                                <button onClick={() => categoriesProps.pop()}
                                                        className="btn btn-primary m-2"
                                                        type="button">
                                                    Remove Category
                                                </button>
                                                : null
                                            }
                                        </div>
                                    }
                                </FieldArray>
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