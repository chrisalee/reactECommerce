import React from 'react';
import spinner from './loading.gif';
import './Loading.css';

const Loading = () => {
    return (
        <div className='loading'>
            <img src={spinner} alt='Loading' className='loading__gif' />
            <h1 className='loading__text'>Loading...</h1>
        </div>
    )
}

export default Loading
