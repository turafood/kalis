import { useState, memo } from 'react'
import { ComposableMap, Geographies, Geography } from 'react-simple-maps'
import { Tooltip as ReactTooltip } from 'react-tooltip'
import 'react-tooltip/dist/react-tooltip.css'

const geoUrl = '/data/features.json'

const _MapChart = ({ setTooltipContent }) => {
    return (
        <div id="map">
            <ComposableMap
                data-tip=""
                height={200}
                projectionConfig={{ scale: 80 }}
            >
                <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                        geographies.map((geo) => (
                            <Geography
                                key={geo.rsmKey}
                                geography={geo}
                                style={{
                                    default: {
                                        fill: '#D6D6DA',
                                        outline: 'none',
                                    },
                                    hover: {
                                        fill: '#F53',
                                        outline: 'none',
                                    },
                                    pressed: {
                                        fill: '#E42',
                                        outline: 'none',
                                    },
                                }}
                                onMouseEnter={() => {
                                    setTooltipContent(`${geo.properties.name}`)
                                }}
                                onMouseLeave={() => {
                                    setTooltipContent('')
                                }}
                            />
                        ))
                    }
                </Geographies>
            </ComposableMap>
        </div>
    )
}

const MapChart = memo(_MapChart)

function Map() {
    const [content, setContent] = useState('')
    return (
        <div>
            <MapChart setTooltipContent={setContent} />
            <ReactTooltip float anchorId="map" content={content} />
        </div>
    )
}

function MapChartWithTooltip() {
    return <Map />
}

export default MapChartWithTooltip
