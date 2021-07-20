import React, { useState, useEffect } from 'react';

import { Card, Skeleton } from 'antd';
import 'antd/dist/antd.css';
import _ from 'lodash';
import numeral from 'numeral';

function RecoveredCard(props) {
  const { covidData } = props;
  const [recovered, setRecovered] = useState(0);
  const [todayRecovered, setTodayRecovered] = useState(0);
  const [recoveredPerMillion, setRecoveredPerMillion] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setRecovered(numeral(covidData.recovered).format('0.0a'));
    setTodayRecovered(numeral(covidData.todayRecovered).format('0.0a'));
    setRecoveredPerMillion(
      numeral(covidData.recoveredPerOneMillion).format('0.0a')
    );
    setTimeout(() => {
      setIsLoading(true);
    }, 2000);
  }, [covidData]);

  return (
    <Card title="Đã khỏi">
      {isLoading ? (
        <>
          <p>{recovered}</p>
          <p>
            +{todayRecovered} <br></br>
            <span>ca/ngày</span>
          </p>
          <p>
            ~{recoveredPerMillion}
            <span>/1M</span>
          </p>
        </>
      ) : (
        <Skeleton className="cardskeleton" active />
      )}
    </Card>
  );
}

export default RecoveredCard;
