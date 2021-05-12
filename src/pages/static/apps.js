import React from 'react';
import logo from '../../assets/img/logo.png';
import AS from '../../assets/img/ios.svg';
import PM from '../../assets/img/android.svg';

import s from './static.module.scss';

const Apps = () => {
    return (
        <div className={s.container}>
            <img className={s.logo} src={logo} alt="logo" />
            <div className={s.row}>
                <a 
                    className={s.link} 
                    href="https://apps.apple.com/us/app/squadix/id1538492084?itsct=apps_box&amp;itscg=30200"
                >
                    <img src={AS} alt="Download on the App Store" />
                </a>
                <a 
                    className={s.link} 
                    href="https://play.google.com/store/apps/details?id=com.airsoft.android&amp;utm_source=site&amp;utm_campaign=promo&amp;pcampaignid=pcampaignidMKT-Other-global-all-co-prtnr-py-PartBadge-Mar2515-1"
                >
                    <img alt="Get it on Google Play" src={PM} />
                </a>
            </div>
        </div>
    )
}

export default Apps;