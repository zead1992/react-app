import React, {FC, useEffect, useState} from "react";
import {RouteChildrenProps} from "react-router-dom";
import {List, Typography, Spin} from "antd";
import {CreateGenre, IGenre} from "../features/genres/genreTypes";
import {useDispatch, useSelector} from "react-redux";
import {addGenreAsync, deleteGenreAsync, fetchGenresAsync, selectAllGenres} from "../features/genres/genresSlice";
import styled from "styled-components";
import Yup from "../plugins/yup-plugin";
import {Form, Input, SubmitButton} from 'formik-antd'
import {Formik, FormikHelpers} from 'formik'
import BasePopup from "./common/BasePopup";
import {RootState} from "../store/store";

const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-column-gap: 20px;
`

type IProp = RouteChildrenProps
const GenresList: FC<IProp> = (props) => {

    const dispatch = useDispatch();
    const genres: IGenre[] = useSelector(selectAllGenres);
    const {genreList: listLoading} = useSelector((state: RootState) => state.loading);

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
            await dispatch(addGenreAsync({entityData: values}));
            formikHelpers.resetForm();
        } catch (e) {
            console.log(e);
            formikHelpers.setSubmitting(false);
        }
    }

    const deleteGenre = async (args: { id: string }) => {
        try {
            await dispatch(deleteGenreAsync({genreId: args.id}))
        } catch (e) {
            console.log(e);
        }
    }

    useEffect(() => {
        dispatch(fetchGenresAsync());
    }, []);

    return (
        <Wrapper className="my-3">
            {
                listLoading && <Spin/>
            }
            {
                !listLoading &&
                <React.Fragment>
                    <div className="p-start">
                        <List
                            dataSource={genres}
                            bordered
                            renderItem={item => (
                                <List.Item actions={[
                                    <BasePopup title={"Delete"}
                                               onConfirm={() => deleteGenre({id: item._id})}
                                               confirmTitle={"Delete Genre?"}/>
                                ]}>
                                    <Typography.Text>{item.name}</Typography.Text>
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
                </React.Fragment>
            }

        </Wrapper>
    )
}

export default GenresList;