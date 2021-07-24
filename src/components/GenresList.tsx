import React, {FC, useState} from "react";
import {RouteChildrenProps} from "react-router-dom";
import {List, Typography} from "antd";
import {CreateGenre, IGenre} from "../features/genres/genreTypes";
import {useDispatch, useSelector} from "react-redux";
import {addGenreAsync, selectAllGenres} from "../features/genres/genresSlice";
import styled from "styled-components";
import Yup from "../plugins/yup-plugin";
import {CreateMovie} from "../features/movies/movieTypes";
import {Checkbox, Form, Input, InputNumber, Select, SubmitButton} from 'formik-antd'
import {Formik, FormikHelpers} from 'formik'
import {addMovieAsync, editMovieAsync} from "../features/movies/moviesSlice";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
`

type IProp = RouteChildrenProps
const GenresList: FC<IProp> = (props) => {

    const dispatch = useDispatch();
    const genres: IGenre[] = useSelector(selectAllGenres);

    const formSchema: Yup.SchemaOf<CreateGenre> = Yup.object().shape({
        name: Yup.string().required().min(3).label('genre name'),
    });

    const [formValues, setFormValues] = useState<CreateGenre>(
        {
            name: null
        }
    );

    const onSubmit = async (values: CreateGenre, formikHelpers: FormikHelpers<CreateGenre>) => {
        try {
            formikHelpers.setSubmitting(true);
            await dispatch(addGenreAsync({entityData:values}));
            formikHelpers.resetForm();
        } catch (e) {
            console.log(e);
            formikHelpers.setSubmitting(false);
        }
    }

    return (
        <Wrapper className="my-3">
            <div className="p-start">
                <List
                    dataSource={genres.map(g => g.name)}
                    bordered
                    renderItem={item => (
                        <List.Item>
                            <Typography.Text>{item}</Typography.Text>
                        </List.Item>
                    )}
                />
            </div>
            <div className="p-end">
                <Typography.Title level={4}>Add Genre</Typography.Title>
                <div className="row">
                    <div className="col-12">
                        <Formik<CreateGenre>
                            initialValues={formValues}
                            enableReinitialize={true}
                            validateOnMount={true}
                            onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
                            validationSchema={formSchema}
                        >
                            {(props) => {
                                return <Form layout={"vertical"}>
                                    <div className="col-12">
                                        <Form.Item label={"genre name"}
                                                   name={"name"}>
                                            <Input name={"name"}/>
                                        </Form.Item>
                                    </div>

                                    <div className="col-12 my-3">
                                        <SubmitButton disabled={!props.isValid || props.isSubmitting}>Submit</SubmitButton>
                                    </div>
                                </Form>
                            }}
                        </Formik>
                    </div>
                </div>
            </div>
        </Wrapper>
    )
}

export default GenresList;