import React, {FC, useEffect, useState} from 'react';
import {CreateMovie} from "../store/types/movieTypes";
import {fetchGenresAsync} from "../store/reducers/genreReducers";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";
import {RouteComponentProps} from 'react-router-dom';
import {addMovieAsync} from "../store/reducers/movieReducer";
import * as Yup from "yup"
import {Typography} from "antd";
import {Form, SubmitButton, ResetButton, Input, InputNumber,Select} from 'formik-antd'
import {Formik, FormikHelpers} from 'formik'


type IProps = RouteComponentProps;

const MovieForm: FC<IProps> = (props) => {

    const {Title} = Typography;
    const {Option} = Select;

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
    const [formValues, setFormValues] = useState<CreateMovie>(
        {
            title: null,
            genreId: null,
            numberInStock: null,
            dailyRentalRate: null
        }
    );

    //store
    const {list: genres} = useSelector((state: RootState) => state.genre);
    const {genreList: loadingGenres} = useSelector((state: RootState) => state.loading);
    const {newMovie: loadingNewMovie} = useSelector((state: RootState) => state.loading);


    const formKeys = (key: keyof CreateMovie) => {
        return key;
    }

    const onSubmit = async (values: CreateMovie, formikHelpers: FormikHelpers<CreateMovie>) => {
        console.log(values);
        return;
        await dispatch(addMovieAsync(formValues));
        formikHelpers.setSubmitting(false);
        props.history.push('/movies');
    }


    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-12 my-3">
                <Title level={1}>Add Movie</Title>
                <Formik<CreateMovie>
                    initialValues={formValues}
                    enableReinitialize={true}
                    validateOnMount={true}
                    onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
                    validationSchema={formSchema}
                >
                    {(props) => {
                        return <Form layout={"vertical"}>
                            <div className="col-4">
                                <Form.Item label={"Title"}
                                           name={formKeys('title')}>
                                    <Input name={formKeys('title')}/>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <Form.Item label={"Stock"}
                                           name={formKeys('numberInStock')}>
                                    <InputNumber name={formKeys('numberInStock')}/>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <Form.Item label={"Rental Rate"}
                                           name={formKeys('dailyRentalRate')}>
                                    <InputNumber name={formKeys('dailyRentalRate')}/>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <Select name={formKeys("genreId")}
                                        placeholder={"Select Genre"}
                                        style={{ width: 120 }}>
                                    {
                                        genres.map((g)=>
                                            <Option value={g._id}>{g.name}</Option>
                                        )
                                    }
                                </Select>
                            </div>
                            <div className="col-12 my-3">
                                <SubmitButton disabled={!props.isValid}>Add Movie</SubmitButton>
                            </div>
                        </Form>
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default MovieForm;