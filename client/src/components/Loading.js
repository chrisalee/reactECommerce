import React from 'react';
import './Loading.css';
import { Icon } from '@iconify/react';
import loadingaltIcon from '@iconify-icons/whh/loadingalt';

const Loading = () => {
    return (
        <div className='loading'>
            <Icon icon={loadingaltIcon} />  Loading...
        </div>
    )
}

export default Loading
