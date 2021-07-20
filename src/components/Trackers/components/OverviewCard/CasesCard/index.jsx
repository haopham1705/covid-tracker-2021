import React, { useState, useEffect } from 'react';

import { Card, Skeleton} from '@material-ui/core'; 
import _ from 'lodash';
import numeral from 'numeral';

function CasesCard(props) {
  const { covidData } = props;
  const [cases, setCases] = useState(0);
  const [todayCases, setTodayCases] = useState(0);
  const [casesPerMillion, setCasesPerMillion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setCases(numeral(covidData.cases).format('0.0a'));
    setTodayCases(numeral(covidData.todayCases).format('0.0a'));
    setCasesPerMillion(numeral(covidData.casesPerOneMillion).format('0.0a'));
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, [covidData]);

  return (
    <Card >
      <h2>SỐ ca</h2>
      {isLoading ? (
        <>
          <p>{cases}</p>
          <p>
            +{todayCases} <br></br>
            <span>ca/ngày</span>
          </p>
          <p>
            ~ {casesPerMillion}
            <span>/1M</span>
          </p>
        </>
      ) : (
          <Skeleton variant="rect" width="100%">
            <div style={{ paddingTop: '57%' }} />
          </Skeleton>
      )}
    </Card>
  );
}

export default CasesCard;
