import React, { useRef, useEffect, useState } from 'react'
import './styles.css'
import { select, scaleLinear, line, scalePoint, max, axisLeft, axisBottom, format, scaleBand } from 'd3'


function BarChart({data}) {

    const yValue = (d) => d.dimensions[0].value
    const xValue = (d) => d.measures[0].value

    const svgRef = useRef()

    useEffect(() => {
        const svg = select(svgRef.current)

        const width = +svg.attr('width')
        const height = +svg.attr('height')
        const margin = { top: 40, right: 20, bottom: 140, left: 100}
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
            .padding(0.4)
            // console.log(yScale.domain())
            // console.log(yScale.range())
        


        const g = svg.append('g')
                .attr('transform', `translate(${margin.left},${margin.top})` )

        const xAxisTickFormat = number => 
            format('.1s')(number)
            
        
        const xAxis = axisBottom(xScale)
            .tickFormat(xAxisTickFormat) 
            .tickSize(-innerHeight)       

        g.append('g')
        .call(axisLeft(yScale))
        .selectAll('.domain, .tick line')
        .remove()

        const xAxisG = g.append('g').call(xAxis)
            .attr('transform', `translate(0 ,${innerHeight})` )

            xAxisG.selectAll('.domain')
            .remove()

            xAxisG.append('text')
            .attr('class', 'bottomAxisLabel')
            .attr('y', 30)
            .attr('x', innerWidth / 2)
            .attr('fill', 'whitesmoke')
            .text('total sales') 
                
        g.selectAll('rect')
            .data(data)
            .enter()
            .append('rect')
            .attr('width', d => xScale(xValue(d)))
            .attr('height', yScale.bandwidth())
            .attr('y', d => yScale(yValue(d)))
            .attr('fill', 'lime')

        g.append('text')
            .attr('class', 'chartTitle')
            .attr('y', - 10)
            .attr('x', innerWidth / 2 - 60)
            .attr('fill', 'whitesmoke')
            .text('Sales by Rep')    
    })


    return (
        <>
            <svg ref={svgRef} width="710" height="600">

            </svg>
        </>
    )
}

export default BarChart;
