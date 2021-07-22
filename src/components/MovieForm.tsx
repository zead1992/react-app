import React, {FC, useEffect, useState} from 'react';
import {fetchGenresAsync} from "../store/reducers/genreReducers";
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps, useLocation,useParams} from 'react-router-dom';
import {Typography} from "antd";
import {Form, SubmitButton, ResetButton, Input, InputNumber, Select} from 'formik-antd'
import {Formik, FormikHelpers} from 'formik'
import Yup from '../plugins/yup-plugin';
import {RootState} from "../store/store";
import {addMovieAsync, selectMovieById} from "../features/movies/moviesSlice";
import {CreateMovie, IMovie} from "../features/movies/movieTypes";


type IProps = RouteComponentProps<{ id: string }>;

const MovieForm: FC<IProps> = (props) => {

    const location = useLocation();
    const test = new URLSearchParams(location.search).get('test');
    console.log(test);

    const {Title} = Typography;
    const {Option} = Select;

    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [formTitle, setFormTitle] = useState('Add Movie');

    const movieDetail = useSelector((state: RootState) => selectMovieById(state, props.match.params.id));

    useEffect(() => {
        dispatch(fetchGenresAsync());

        const movieId = props.match.params.id;
        if (movieId) {
            setIsEdit(true);
            setFormTitle('Edit Movie');
            setFormValues({
                title:movieDetail.title,
                genreId:movieDetail.genre._id,
                numberInStock:movieDetail.numberInStock,
                dailyRentalRate:movieDetail.dailyRentalRate
            })
        }

    }, [location]);

    //form scheme
    const formSchema: Yup.SchemaOf<CreateMovie> = Yup.object().shape({
        title: Yup.string().required().min(3).label('username'),
        dailyRentalRate: Yup.number().required().positive().max(50).label('Rental Rate'),
        numberInStock: Yup.number().integer().required().positive().min(1).integer().label('stock'),
        genreId: Yup.string().required().label('genre')
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
        try {
            formikHelpers.setSubmitting(true);
            await dispatch(addMovieAsync({newMovie: values}));
            props.history.push('/movies');
        } catch (e) {
            console.log(e);
            formikHelpers.setSubmitting(false);
        }
    }


    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-12 my-3">
                <Title level={1}>{formTitle}</Title>
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
                                        style={{width: 120}}>
                                    {
                                        genres.map((g) =>
                                            <Option key={g._id}
                                                    value={g._id}>{g.name}</Option>
                                        )
                                    }
                                </Select>
                            </div>
                            <div className="col-12 my-3">
                                <SubmitButton disabled={!props.isValid || props.isSubmitting}>Add Movie</SubmitButton>
                            </div>
                        </Form>
                    }}
                </Formik>
            </div>
        </div>
    );
}

export default MovieForm;