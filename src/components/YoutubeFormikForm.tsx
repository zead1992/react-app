import React from 'react';
import {Button} from "antd";

type IForm = {
    name: string;
    email: string;
    channel: string;
}

function YoutubeFormikForm(props) {

    const formKeys = (key: keyof IForm) => {
        return key;
    }

    return (
        <div className="row">
            <div className="col-6">
                <form>
                    <h1>Formik Form</h1>
                    <div className="form-group">
                        <label htmlFor={formKeys('name')}>name</label>
                        <input name={formKeys('name')}
                               type="text"
                               value={""}
                               className="form-control"
                               id={formKeys('name')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('email')}>email</label>
                        <input name={formKeys('email')}
                               type="email"
                               value={""}
                               className="form-control"
                               id={formKeys('email')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('channel')}>name</label>
                        <input name={formKeys('channel')}
                               type="text"
                               value={""}
                               className="form-control"
                               id={formKeys('channel')}/>
                    </div>
                    <Button type={"primary"} loading={false} draggable={"true"}>
                        Submit
                    </Button>
                </form>
            </div>
        </div>
    );
}

export default YoutubeFormikForm;