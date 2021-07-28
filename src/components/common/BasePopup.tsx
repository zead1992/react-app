import React, {FC} from "react";
import {Button, Popconfirm} from "antd";
import {PopconfirmProps} from "antd/lib/popconfirm";

type IProp = PopconfirmProps;
const BasePopup : FC<IProp> = (props)=>{
    return(
        <Popconfirm {...props}>
            <Button
                className="col-auto"
                style={{marginTop: "10px"}}
                type="primary"
                danger
            >
                {props.title}
            </Button>
        </Popconfirm>
    );
}

export default BasePopup;