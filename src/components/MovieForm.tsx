import React, {ChangeEvent, FC, useEffect, useState} from 'react';
import {CreateMovie} from "../store/types/movieTypes";
import {fetchGenresAsync} from "../store/reducers/genreReducers";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {RouteComponentProps} from 'react-router-dom';
import {addMovieAsync} from "../store/reducers/movieReducer";
import * as Yup from "yup"
import {FormikHelpers, Formik, Field, Form} from "formik";
import {Typography} from "antd";


type IProps = RouteComponentProps;

const MovieForm : FC<IProps> = (props) => {

    const {Title} = Typography;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenresAsync());
    }, []);

    //form scheme
    const formSchema: Yup.SchemaOf<CreateMovie> = Yup.object().shape({
        title: Yup.string().required().min(3),
        dailyRentalRate: Yup.number().required().positive().max(50),
        numberInStock: Yup.number().required().positive().min(1).integer(),
        genreId: Yup.string().required()
    });

    //state
    const [formValues, setFormValues] = useState<CreateMovie>();

    //store
    const {list: genres} = useSelector((state: RootState) => state.genre);
    const {genreList: loadingGenres} = useSelector((state: RootState) => state.loading);
    const {newMovie: loadingNewMovie} = useSelector((state: RootState) => state.loading);


    const formKeys = (key: keyof CreateMovie) => {
        return key;
    }

    const onSubmit = async (values: CreateMovie, formikHelpers: FormikHelpers<CreateMovie>) => {
        console.log(values);
        await dispatch(addMovieAsync(formValues));
        formikHelpers.setSubmitting(false);
        props.history.push('/movies');
    }


    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-12">
                <Formik<CreateMovie>
                    initialValues={formValues}
                    enableReinitialize={true}
                    validateOnMount={true}
                    onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
                    validationSchema={formSchema}
                >
                    {(props) => {
                        return <Form>
                            <Title level={1}>Add Movie</Title>

                        </Form>
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default MovieForm;