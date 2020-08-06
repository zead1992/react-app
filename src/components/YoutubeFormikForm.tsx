import React from 'react';
import {useFormik} from "formik";
import * as Yup from 'yup';

type IForm = {
    name: string;
    email: string;
    channel: string;
}

function YoutubeFormikForm(props) {

    //formik
    const formik = useFormik<IForm>({
        initialValues: {
            name: '',
            email: '',
            channel: ''
        },
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
                               className="form-control"
                               id={formKeys('name')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('email')}>email</label>
                        <input name={formKeys('email')}
                               type="email"
                               value={formik.values.email}
                               onChange={formik.handleChange}
                               className="form-control"
                               id={formKeys('email')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('channel')}>channel</label>
                        <input name={formKeys('channel')}
                               type="text"
                               value={formik.values.channel}
                               onChange={formik.handleChange}
                               className="form-control"
                               id={formKeys('channel')}/>
                    </div>
                    <button
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