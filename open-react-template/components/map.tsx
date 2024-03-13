'use client'

import React, {useState, useEffect} from 'react';
import {Map, APILoader, Provider, Marker, InfoWindow} from '@uiw/react-baidu-map';
import {Request} from "@/app/api/axios";


const BaiduMap = () => {

    const center = {lng: -73.754968, lat: 42.6511674}

    const icon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
        scale: 2, // 图标缩放大小
        fillColor: "red", // 填充颜色
        fillOpacity: 0.8, // 填充透明度
    })

    const [isOpen, setIsOpen] = useState(false)
    const [text, setText] = useState('none')
    const [point, setPoint] = useState({lng: -73.754968, lat: 42.6511674})

    const content = `<p style='font-size: 16px'>${text}</p>`;

    function markerRef(props: any) {
        if (props && props.marker) {
            console.log('marker::', props.marker, props.map, props.BMap);
        }
    }

    function infoWindowRef(props: any) {
        if (props && props.infoWindow) {
            console.log('infoWindow:', props.infoWindow, props.map, props.BMap);
        }
    }

    return (

        <Map zoom={10} center={center} enableScrollWheelZoom={true}>

            {/* 标记 */}
            <Marker ref={markerRef} position={point} icon={icon}
                    onClick={() => setIsOpen(!isOpen)}/>

            {/* 条件渲染信息窗口 */}
            <InfoWindow ref={infoWindowRef} position={point} content={content} isOpen={isOpen}/>

        </Map>
    )
}

export default function MapComponent() {
    return (
        <div style={{width: 1200, height: 800}}>
            <APILoader akay="WDDVx86wFkDa8vMCDReijDGFIB4EWLxi">
                <Provider>
                    <BaiduMap/>
                </Provider>
            </APILoader>
        </div>
    )
}






