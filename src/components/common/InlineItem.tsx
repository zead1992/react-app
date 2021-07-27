import React, {FC} from "react";
import {Typography} from "antd";
type IProp = {
    label:string;
    val:string | number;
}

const {Text } = Typography;

const InlineItem : FC<IProp> = (props)=>{
    return(
        <div style={{display: "flex"}}>
            <Text strong
                  style={{marginInlineEnd: '10px'}}>{props.label}:</Text><Text>{props.val}</Text>
        </div>
    )
}

export default InlineItem;