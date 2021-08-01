import React, {ChangeEvent, FC, Ref, useEffect, useRef, useState} from "react"
import {Card} from "antd"
import {Form, Input, Select, SubmitButton} from 'formik-antd'
import {Formik, FormikHelpers, FormikProps, useFormikContext} from 'formik'
import {useTranslation} from "react-i18next";
import {CommonOption, MoviesFilterType} from "../../types/common-types";
import styled from "styled-components"
import {LangListFilter, QualityListFilter, RatingListFilter, YearListFilter} from "../../common/static";
import {selectAllGenres} from "../../features/genres/genresSlice";
import {useDispatch, useSelector} from "react-redux";
import {useQuery} from "../../hooks/custom-hooks";
import {useHistory, useLocation} from "react-router-dom";
import {filterMoviesAsync} from "../../features/movies/moviesSlice";

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

const FilterContext = ()=>{
    const dispatch = useDispatch();
    const {values,setValues,submitForm} = useFormikContext<MoviesFilterType>();
    const query = useQuery();
    const location = useLocation();

    useEffect(()=>{
        //watch > manually trigger action on specific form state
    },[values]);

    useEffect(()=>{
        const searchQuery : MoviesFilterType = JSON.parse(query.get('searchQuery'));
        if(searchQuery){
            setValues(searchQuery);
            dispatch(filterMoviesAsync({filter:searchQuery}))
        }
    },[location.search]);
    return null;
}

const MoviesFilter: FC = (props) => {

    const {t, i18n} = useTranslation(['web', 'common']);
    const dispatch = useDispatch();
    const query = useQuery();
    const history = useHistory();
    const location = useLocation();

    const genres = useSelector(selectAllGenres);
    const genresFilter : CommonOption[] = [{name:'all',val:'all'},...genres.map(g=>{
        return{name:g.name,val:g._id}
    })]

    const formKeys = (key: keyof MoviesFilterType) => {
        return key;
    }

    const filtersInitial: MoviesFilterType = {
        search: null,
        genre: "all",
        quality: "all",
        year: "all",
        rating: "all",
        language: "all"
    }
    const [filters] = useState<MoviesFilterType>(filtersInitial);
    const onSubmit = (values: MoviesFilterType, formikHelper: FormikHelpers<MoviesFilterType>) => {
        const searchQuery = JSON.stringify(values);
        history.push(`${location.pathname}?searchQuery=${encodeURIComponent(searchQuery)}`);
        formikHelper.setSubmitting(false);
    }

    const onInputChange = (e : ChangeEvent<HTMLInputElement>)=>{
        const str = e.target.value;
        if(!str){

        }
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
                            <FilterContext/>
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
                                            genresFilter.map((item) =>
                                                <Option key={item.val}
                                                        value={item.val}>{item.name}</Option>
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