import * as Yup from "yup"
Yup.setLocale({
    mixed:{
        required:'field is required',
        notType:'field is required'
    },
});

export default Yup;