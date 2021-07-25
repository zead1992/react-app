import React, {FC} from "react";
import {Button, Popconfirm} from "antd";

type IProp = {
    title:string;
    onConfirm:()=>void
    confirmTitle:string;
}
const BasePopup : FC<IProp> = (props)=>{
    return(
        <Popconfirm title={props.confirmTitle}
                    placement="bottom"
                    onConfirm={props.onConfirm}
        >
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