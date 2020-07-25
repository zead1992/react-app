import React, {ChangeEvent, FormEvent, useEffect, useState} from 'react';
import {CreateMovie} from "../store/types/movieTypes";
import {fetchGenresAsync} from "../store/reducers/genreReducers";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store/reducers/rootReducer";

function MovieForm(props) {

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGenresAsync());
    }, []);

    //state
    const [formValuesState, setFormValues] = useState<CreateMovie>({
        title: '',
        numberInStock: 0,
        dailyRentalRate: 0,
        genreId: ''
    });

    const {list: genres} = useSelector((state: RootState) => state.genre);
    const {genreList: loadingGenres} = useSelector((state: RootState) => state.loading);


    const formKeys = (key: keyof CreateMovie) => {
        return key;
    }

    const handleInputChange = ({currentTarget: input}: ChangeEvent<HTMLInputElement>) => {
        const values = {...formValuesState};
        values[input.name] = input.value;
        setFormValues(values);
    }

    const handleSelectChange = ({currentTarget: select}: ChangeEvent<HTMLSelectElement>) => {
        const values = {...formValuesState};
        values[select.name] = select.value;
        setFormValues(values);
    }

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(formValuesState);
    }


    return (
        <div className="row align-items-center justify-content-center">
            <div className="col-12">
                <h1>movie form</h1>
            </div>
            <div className="col-12">
                <form onSubmit={(event) => handleSubmit(event)}>
                    <div className="form-group">
                        <label htmlFor={formKeys('title')}>title</label>
                        <input name={formKeys('title')}
                               type="text"
                               onChange={(event) => handleInputChange(event)}
                               value={formValuesState.title}
                               className="form-control"
                               id={formKeys('title')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('numberInStock')}>stock</label>
                        <input name={formKeys('numberInStock')}
                               type="number"
                               value={formValuesState.numberInStock}
                               onChange={(event) => handleInputChange(event)}
                               className="form-control"
                               id={formKeys('numberInStock')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('dailyRentalRate')}>rate</label>
                        <input name={formKeys('dailyRentalRate')}
                               type="number"
                               value={formValuesState.dailyRentalRate}
                               onChange={(event) => handleInputChange(event)}
                               className="form-control"
                               id={formKeys('dailyRentalRate')}/>
                    </div>
                    <div className="form-group">
                        <label htmlFor={formKeys('genreId')}>genre</label>
                        <select name={formKeys('genreId')}
                                value={formValuesState.genreId}
                                onChange={(event) => handleSelectChange(event)}
                                className="form-control"
                                id={formKeys('genreId')}>
                            <option/>
                            {genres.map((g) =>
                                <option key={g._id} value={g._id}>{g.name}</option>
                            )}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary">Add Movie</button>
                </form>
            </div>
        </div>
    );
}

export default MovieForm;