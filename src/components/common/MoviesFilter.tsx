import React, {ChangeEvent, FC, useEffect, useState} from "react"
import {Card} from "antd"
import {Form, Input, Select, SubmitButton} from 'formik-antd'
import {Formik, FormikHelpers} from 'formik'
import {useTranslation} from "react-i18next";
import {MoviesFilterType} from "../../types/common-types";
import styled from "styled-components"
import {LangListFilter, QualityListFilter, RatingListFilter, YearListFilter} from "../../common/static";
import {selectAllGenres} from "../../features/genres/genresSlice";
import {useSelector} from "react-redux";

const {Option} = Select;

const Wrapper = styled.div`
  .search-wrapper {
    display: grid;
    align-items: center;
    grid-template-columns: 5fr 1fr;
    grid-column-gap: 15px;
    width: 100%;

    .search-input {
    }

    .submit {
    }
  }
`;

const DropsWrapper = styled.div`
    display: grid;
    align-items: center;
    grid-template-columns: repeat(6, 1fr);
    grid-column-gap: 10px;
    width: 100%;
`;

const FlexWrapper = styled.div`
  display: flex;
  flex-direction: column;
  label{
    margin-bottom: 5px;
  }
`

const MoviesFilter: FC = (props) => {

    const {t, i18n} = useTranslation(['web', 'common']);

    const genres = useSelector(selectAllGenres);

    const formKeys = (key: keyof MoviesFilterType) => {
        return key;
    }
    // const formSchema: Yup.SchemaOf<MoviesFilterType> = Yup.object().shape({
    //     search: Yup.string().label(t('common:search')),
    //     quality: Yup.string().label(t('common:quality')),
    //     genre: Yup.string().label(t('web:genres.genre')),
    //     language: Yup.string().label(t('common:language')),
    //     rating: Yup.string().label(t('common:rating')),
    //     year: Yup.string().label(t('common:year')),
    // });
    const filtersInitial: MoviesFilterType = {
        search: null,
        genre: "all",
        quality: "all",
        year: "all",
        rating: "all",
        language: "all"
    }
    const [filters, setFilters] = useState<MoviesFilterType>(filtersInitial);
    const onSubmit = (values: MoviesFilterType, formikHelper: FormikHelpers<MoviesFilterType>) => {
        console.log(values);
        formikHelper.setSubmitting(false);
    }

    const onInputChange = (e : ChangeEvent<HTMLInputElement>)=>{
        console.log(e.target.value);
    }

    useEffect(() => {
    }, []);


    return (
        <div className="col-12 my-3">
            <Card>
                <Formik<MoviesFilterType>
                    initialValues={filters}
                    enableReinitialize={false}
                    onSubmit={(values, formikHelpers) => onSubmit(values, formikHelpers)}
                >
                    {(props) => {
                        return <Form layout={"vertical"}>
                            <Wrapper>
                                <div className="search-wrapper">
                                    <Form.Item className="search-input"
                                               label={t('common:search')}
                                               name={formKeys('search')}>
                                        <Input onChange={onInputChange} name={formKeys('search')}/>
                                    </Form.Item>
                                    <SubmitButton className="submit"
                                                  disabled={!props.isValid || props.isSubmitting}>{t('common:search')}</SubmitButton>
                                </div>
                            </Wrapper>
                            <DropsWrapper>
                                <FlexWrapper>
                                    <label htmlFor={formKeys('quality')}>{t('common:quality')}</label>
                                    <Select id={formKeys('quality')}
                                            name={formKeys("quality")}
                                    >
                                        {
                                            QualityListFilter.map((item) =>
                                                <Option key={item.val}
                                                        value={item.val}>{item.name}</Option>
                                            )
                                        }
                                    </Select>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <label htmlFor={formKeys('genre')}>{t('web:genres.genre')}</label>
                                    <Select id={formKeys('genre')}
                                            name={formKeys("genre")}
                                    >
                                        {
                                            genres.map((item) =>
                                                <Option key={item._id}
                                                        value={item._id}>{item.name}</Option>
                                            )
                                        }
                                    </Select>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <label htmlFor={formKeys('rating')}>{t('common:rating')}</label>
                                    <Select id={formKeys('rating')}
                                            name={formKeys("rating")}
                                    >
                                        {
                                            RatingListFilter.map((item) =>
                                                <Option key={item.val}
                                                        value={item.val}>{item.name}</Option>
                                            )
                                        }
                                    </Select>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <label htmlFor={formKeys('year')}>{t('common:year')}</label>
                                    <Select id={formKeys('year')}
                                            name={formKeys("year")}
                                    >
                                        {
                                            YearListFilter.map((item) =>
                                                <Option key={item.val}
                                                        value={item.val}>{item.name}</Option>
                                            )
                                        }
                                    </Select>
                                </FlexWrapper>
                                <FlexWrapper>
                                    <label htmlFor={formKeys('language')}>{t('common:language')}</label>
                                    <Select id={formKeys('language')}
                                            name={formKeys("language")}
                                    >
                                        {
                                            LangListFilter.map((item) =>
                                                <Option key={item.val}
                                                        value={item.val}>{item.name}</Option>
                                            )
                                        }
                                    </Select>
                                </FlexWrapper>
                            </DropsWrapper>
                        </Form>
                    }}
                </Formik>
            </Card>
        </div>
    )
}

export default MoviesFilter;