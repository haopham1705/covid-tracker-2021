import React, { useState, useEffect } from 'react';

import { Pie } from '@ant-design/charts';
import 'antd/dist/antd.css';
import axios from 'axios';

import './OverviewPieChart.scss';

function OverviewPieChart(props) {
  const [casesNA, setCasesNA] = useState([]);
  const [casesSA, setCasesSA] = useState([]);
  const [casesAsia, setCasesAsia] = useState([]);
  const [casesEur, setCasesEur] = useState([]);
  const [casesAfrica, setCasesAfrica] = useState([]);
  const [casesAus, setCasesAus] = useState([]);

  useEffect(() => {
    const getCovidData = () => {
      axios
        .get(`https://disease.sh/v3/covid-19/continents`)
        .then((response) => {
          setCasesNA(response.data[0].cases);
          setCasesAsia(response.data[1].cases);
          setCasesSA(response.data[2].cases);
          setCasesEur(response.data[3].cases);
          setCasesAfrica(response.data[4].cases);
          setCasesAus(response.data[5].cases);
        })

        .catch(() => {
          alert(`Request to API failed, Please try again !!!`);
        });
    };

    getCovidData();
  }, []);

  let dataChart = [
    {
      type: 'NA',
      value: casesNA,
    },
    {
      type: 'SA',
      value: casesSA,
    },
    {
      type: 'Australia',
      value: casesAus,
    },
    {
      type: 'Africa',
      value: casesAfrica,
    },
    {
      type: 'Europe',
      value: casesEur,
    },
    {
      type: 'Asia',
      value: casesAsia,
    },
  ];

  var config = {
    appendPadding: 10,
    data: dataChart,
    angleField: 'value',
    colorField: 'type',
    radius: 0.8,
    autoFit: true,
    label: {
      type: 'outer',
      content: '{name} {percentage}',
    },
    interactions: [{ type: 'pie-legend-active' }, { type: 'element-active' }],
  };

  return (
    <div className="overviewpiechart">
      <Pie {...config} />;
    </div>
  );
}
export default OverviewPieChart;
