import React, { useState, useEffect } from 'react';

import { Card, Skeleton } from '@material-ui/core';
import 'antd/dist/antd.css';
import _ from 'lodash';
import numeral from 'numeral';

function ActiveCasesCard(props) {
  const { covidData } = props;
  const [activeCases, setActiveCases] = useState(0);
  const [activeCasesPerMillion, setActiveCasesPerMillion] = useState(0);
  const [criticalCases, setCriticalCases] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setActiveCases(numeral(covidData.active).format('0.0a'));
    setActiveCasesPerMillion(
      numeral(covidData.activePerOneMillion).format('0.0a')
    );
    setCriticalCases(numeral(covidData.critical).format('0.0a'));
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, [covidData]);

  return (
    <Card>
      {isLoading ? (
        <>
          <p>{activeCases}</p>
          <p>
            {criticalCases}
            <br></br>
            <span>nguy kịch</span>
          </p>
          <p>
            ~ {activeCasesPerMillion}
            <span>/1M</span>
          </p>
        </>
      ) : (
        <Skeleton className="cardskeleton" active />
      )}
    </Card>
  );
}

export default ActiveCasesCard;
