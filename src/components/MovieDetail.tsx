import React from 'react';
import {RouteComponentProps} from 'react-router-dom';

type IProps = RouteComponentProps<{ id: string }>;

function MovieDetail(props: IProps) {
    return (
        <div>
            Movie Detail : {props.match.params.id}
        </div>
    );
}

export default MovieDetail;