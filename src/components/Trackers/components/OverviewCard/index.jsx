import React, { useState, useEffect } from 'react';

import 'antd/dist/antd.css';

import './OverviewCard.scss';
import CasesCard from './CasesCard';
import DeathsCard from './DeathsCard';
import ActiveCasesCard from './ActiveCasesCard';
import RecoveredCard from './RecoveredCard';
import { getCovidData } from '../../utils/GetCovidData/index';

function OverviewCard(props) {
  const [covidData, setCovidData] = useState({});

  useEffect(() => {
    const handleCovidData = async () => {
      setCovidData(await getCovidData(`https://disease.sh/v3/covid-19/all`));
    };
    handleCovidData();
  }, []);

  return (
    <>
      <div className="overviewcard">
        <CasesCard covidData={covidData} />
        <DeathsCard covidData={covidData} />
        <ActiveCasesCard covidData={covidData} />
        <RecoveredCard covidData={covidData} />
      </div>
    </>
  );
}

export default OverviewCard;
