import React, { useContext, useEffect, useState, useCallback  } from 'react';
import QlikContext from '../../context/QlikContext';
import ObjectsContext from '../../context/ObjectsContext';

import BarChart from '../d3/BarChart';
import ScatterPlot from '../d3/ScatterPlot';




const Chart = ({ objectId }) => {
    const [model, setModel] = useState(null)
    const [data, setData] = useState([])

    const { app } = useContext(QlikContext)
    const { getObject, getObjectLayout } = useContext(ObjectsContext)


    const updateLayout = useCallback(
       (model) => {
           return getObjectLayout(model).then(layout => {
            const { qDimensionInfo: dimensionInfo, qMeasureInfo: measureInfo } = layout.qHyperCube
            console.log('qDimensionInfo', dimensionInfo)
            console.log('qMeasureInfo', measureInfo)
            const newData = layout.qHyperCube.qDataPages[0].qMatrix.map((x) => {
              return {
                  qElemNumber: x[0].qElemNumber,
                  dimensions: x.slice(0, dimensionInfo.length).map((d, i) => {
                    return {
                      label: dimensionInfo[0].qFallbackTitle,
                      value: d.qText,
                    }
                  }),
                  measures: x.slice(dimensionInfo.length).map((d, i) => {
                    return {
                      label: measureInfo[i].qFallbackTitle,
                      value: d.qNum,
                    }
                  }),
                }
              })
              console.log('newData', newData)
              setData(newData)
           })
       },
       [getObjectLayout]
    )


    useEffect(() => {
        if(!model) {
            if(objectId) {
                getObject(objectId).then(model => {
                    setModel(model)
                    updateLayout(model).then(layout => {
  
                    })
                })
            }
        }
    }, [])


    return (
      <div className="chartContainer">
        <BarChart data={data} />
        <ScatterPlot data={data} />
      </div>
    )
}

export default Chart;