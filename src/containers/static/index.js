import React from 'react';
import Layout from '../layout';

import s from './static.module.scss';

const StaticContainer = ({children}) => {

    return (
        <Layout>
            <div className={s.container}>
                {children}
            </div>
        </Layout>
    )
}

export default StaticContainer;