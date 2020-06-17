// import React, { useRef, useEffect, useState } from 'react'
// import './styles.css'
// import { select, scaleLinear, line, scalePoint, max, axisLeft, axisBottom, format, svg } from 'd3'


// function ScatterPlot({data}) {
//     console.log('chart data', data)
//     const svgRef = useRef()

//     useEffect(() => {
//       const width = +svg.attr('width')
//       const height = +svg.attr('height')

//       svg.selectAll('circle')
//       .data(data)
//       .enter()
//       .append('circle')
//       .attr('height', 300)
//       .attr('width', 300)
//     }, [])



//     return (
//         <>
//             <svg ref={svgRef} width="700" height="400">
//             </svg>
//         </>
//     )
// }

// export default ScatterPlot;

