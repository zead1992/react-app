import React from 'react';

type IForm = {
    name:string;
    email:string;
    channel:string;
}

function YoutubeFormikForm(props) {

    const formKeys = (key:keyof IForm)=>{
        return key;
    }

    return (
        <div className="row">
            <div className="col-6">
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
            </div>
        </div>
    );
}

export default YoutubeFormikForm;