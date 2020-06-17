import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import { select, scaleLinear, line, scalePoint, max, axisLeft, axisBottom, format, scaleBand } from 'd3'


function LineChart({data}) {

    const yValue = (d) => d.dimensions[0].value
    const xValue = (d) => d.measures[0].value

    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)

        const width = +svg.attr('width')
        const height = +svg.attr('height')
        const margin = { top: 10, right: 20, bottom: 120, left: 100}
        const innerWidth = width - margin.left - margin.right
        const innerHeight = width -margin.top - margin.bottom

        const xScale = scaleLinear()
            .domain([0, max(data, xValue)])
            .range([0, innerWidth])
            // console.log(xScale.domain())
            // console.log(xScale.range())

        const yScale = scaleBand()
            .domain(data.map(yValue))
            .range([0, innerHeight])
            .padding(0.1)
            // console.log(yScale.domain())
            // console.log(yScale.range())
        


        const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})` )

        g.append('g').call(axisLeft(yScale))
        g.append('g').call(axisBottom(xScale))
            .attr('transform', `translate(0 ,${innerHeight})` )
                
        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
            .attr('y', d => yScale(yValue(d)))
            .attr('fill', 'lime')
    })


    return (
        <>
            <svg ref={svgRef} width="700" height="600">

            </svg>
        </>
    )
}

export default LineChart;
