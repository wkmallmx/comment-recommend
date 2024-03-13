'use client'

import React, {useState} from 'react';
import {Map, APILoader, Provider, Marker, InfoWindow} from '@uiw/react-baidu-map';

const BaiduMap = () => {

    const center = {lng: -73.754968, lat: 42.6511674}

    const icon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
        scale: 2, // 图标缩放大小
        fillColor: "red", // 填充颜色
        fillOpacity: 0.8, // 填充透明度
    })

    const [isOpen, setIsOpen] = useState(false)
    const [content, setContent] = useState('这是信息')

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

        <Map zoom={13} center={center} enableScrollWheelZoom={true}>

            {/* 标记 */}
            <Marker ref={markerRef} position={{lng: -73.754968, lat: 42.6511674}} icon={icon}
                    onClick={() => setIsOpen(!isOpen)}/>

            {/* 条件渲染信息窗口 */}
            <InfoWindow ref={infoWindowRef} position={center} content="<p style='font-size: 16px'>信息</p>" isOpen={isOpen}/>

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






