import React, {FC, useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {RouteComponentProps, useLocation} from 'react-router-dom';
import {Typography} from "antd";
import {Form, Input, InputNumber, Select, SubmitButton,Checkbox} from 'formik-antd'
import {Formik, FormikHelpers} from 'formik'
import Yup from '../plugins/yup-plugin';
import {RootState} from "../store/store";
import {addMovieAsync, editMovieAsync, selectMovieById} from "../features/movies/moviesSlice";
import {CreateMovie} from "../features/movies/movieTypes";
import {fetchGenresAsync} from "../features/genres/genresSlice";
import {useTranslation} from "react-i18next";
import {LangList, QualityList, RatingList} from "../common/static";
import styled from "styled-components";

const Wrapper = styled.div`
  [class^="col-"]{
  margin-bottom: 24px;
}
`


type IProps = RouteComponentProps<{ id: string }>;

const MovieForm: FC<IProps> = (props) => {

    const {t,i18n} = useTranslation(['common','web']);

    const location = useLocation();
    const test = new URLSearchParams(location.search).get('test');

    const {Title} = Typography;
    const {Option} = Select;


    const dispatch = useDispatch();
    const [isEdit, setIsEdit] = useState(false);
    const [uiText, setUiText] = useState<{ formTitle: string, submit: string }>({
        formTitle: t('web:movies.add'),
        submit: t('common:save')
    });
    const movieDetail = useSelector((state: RootState) => selectMovieById(state, props.match.params.id));

    //form scheme
    const formSchema: Yup.SchemaOf<CreateMovie> = Yup.object().shape({
        title: Yup.string().required().min(3).label(t('web:movies.title')),
        dailyRentalRate: Yup.number().required().positive().max(50).label(t('common:dailyRental')),
        numberInStock: Yup.number().integer().required().positive().min(1).integer().label(t('common:stock')),
        genreId: Yup.string().required().label(t('web:genres.genre')),
        isFavorite:Yup.boolean().label(t('common:favorite')),
        rating:Yup.string().required().label(t('common:rating')),
        quality:Yup.string().required().label(t('common:quality')),
        lang:Yup.string().required().label(t('common:language')),
    });

    //state
    const formInitValues: CreateMovie = {
        title: null,
        genreId: null,
        numberInStock: null,
        dailyRentalRate: null,
        isFavorite:false,
        rating:null,
        quality:null,
        lang:null
    }
    const [formValues, setFormValues] = useState<CreateMovie>(
        formInitValues
    );

    const initAdd = () => {
        setIsEdit(false);
        setUiText({
            formTitle: t('web:movies.add'),
            submit: t('common:save')
        });
        setFormValues(formInitValues);
    }
    const initEdit = () => {
        if(!movieDetail){
           return  props.history.push(`/${i18n.language}/movies`);
        }
        setIsEdit(true);
        setUiText( {
            formTitle: t('web:movies.edit'),
            submit: t('common:save')
        });
        setFormValues({
            title: movieDetail.title,
            genreId: movieDetail.genre._id,
            numberInStock: movieDetail.numberInStock,
            dailyRentalRate: movieDetail.dailyRentalRate,
            isFavorite:movieDetail.isFavorite,
            rating:movieDetail.rating.val,
            quality:movieDetail.quality.val,
            lang:movieDetail.lang.val
        })
    }

    //store
    const {list: genres} = useSelector((state: RootState) => state.genre);

    useEffect(() => {
        dispatch(fetchGenresAsync());

        const movieId = props.match.params.id;
        if (movieId) {
            initEdit();
        } else {
            initAdd();
        }

    }, [location,i18n.language]);


    const formKeys = (key: keyof CreateMovie) => {
        return key;
    }

    const onSubmit = async (values: CreateMovie, formikHelpers: FormikHelpers<CreateMovie>) => {
        try {
            formikHelpers.setSubmitting(true);
            if(isEdit){
                await dispatch(editMovieAsync({values:{...values,id:props.match.params.id}}));
            }else{
                await dispatch(addMovieAsync({newMovie: values}));
            }
            props.history.push(`/${i18n.language}/movies`);
        } catch (e) {
            console.log(e);
            formikHelpers.setSubmitting(false);
        }
    }


    return (
        <Wrapper className="row align-items-center justify-content-center">
            <div className="col-12 my-3">
                <Title level={1}>{uiText.formTitle}</Title>
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
                                <Form.Item label={t('web:movies.movieName')}
                                           name={formKeys('title')}>
                                    <Input name={formKeys('title')}/>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <Form.Item label={t('common:stock')}
                                           name={formKeys('numberInStock')}>
                                    <InputNumber name={formKeys('numberInStock')}/>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <Form.Item label={t('common:dailyRental')}
                                           name={formKeys('dailyRentalRate')}>
                                    <InputNumber name={formKeys('dailyRentalRate')}/>
                                </Form.Item>
                            </div>
                            <div className="col-4">
                                <Select name={formKeys("genreId")}
                                        placeholder={t('web:genres.selectGenre')}
                                        style={{width: 120}}>
                                    {
                                        genres.map((g) =>
                                            <Option key={g._id}
                                                    value={g._id}>{g.name}</Option>
                                        )
                                    }
                                </Select>
                            </div>

                            <div className="col-4">
                                <Select name={formKeys("quality")}
                                        placeholder={t('common:quality')}
                                        style={{width: 120}}>
                                    {
                                        QualityList.map((item) =>
                                            <Option key={item.val}
                                                    value={item.val}>{item.name}</Option>
                                        )
                                    }
                                </Select>
                            </div>

                            <div className="col-4">
                                <Select name={formKeys("rating")}
                                        placeholder={t('common:rating')}
                                        style={{width: 120}}>
                                    {
                                        RatingList.map((item) =>
                                            <Option key={item.val}
                                                    value={item.val}>{item.name}</Option>
                                        )
                                    }
                                </Select>
                            </div>

                            <div className="col-4">
                                <Select name={formKeys("lang")}
                                        placeholder={t('common:language')}
                                        style={{width: 120}}>
                                    {
                                        LangList.map((item) =>
                                            <Option key={item.val}
                                                    value={item.val}>{item.name}</Option>
                                        )
                                    }
                                </Select>
                            </div>

                            <div className="col-4 my-3">
                                <Checkbox name={formKeys('isFavorite')}>
                                    {t('common:favorite')}
                                </Checkbox>
                            </div>
                            <div className="col-12 my-3">
                                <SubmitButton disabled={!props.isValid || props.isSubmitting}>{uiText.submit}</SubmitButton>
                            </div>
                        </Form>
                    }}
                </Formik>
            </div>
        </Wrapper>
    );
};

export default MovieForm;