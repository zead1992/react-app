import * as Yup from "yup"
Yup.setLocale({
    mixed:{
        required:'${label} is required',
        notType:(props)=> {
            return `${props.label} is required`
        }
    },
});

export default Yup;