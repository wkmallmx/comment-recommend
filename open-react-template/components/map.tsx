"use client";

import React, { useState } from "react";
import {
  Map,
  APILoader,
  Provider,
  Marker,
  InfoWindow,
} from "@uiw/react-baidu-map";
const BaiduMap = () => {
  const center = { lng: -73.754968, lat: 42.6511674 };

  const icon = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
    scale: 2, // 图标缩放大小
    fillColor: "red", // 填充颜色
    fillOpacity: 0.8, // 填充透明度
  });
    const iconR = new BMap.Symbol(BMap_Symbol_SHAPE_POINT, {
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

    const [firstTwelve, setFirstTwelve] = useState([])

    const handleRequest = async () => {
        let formData = new FormData();
        formData.append("username", user.name);
        formData.append("search_text", user.text);

        console.log(user.name)
        console.log(user.text)

        try {
            const response = await axios.post("http://127.0.0.1:5000/search/business", formData);
            setFirstTwelve(JSON.parse(response.data.data).slice(0, 12))
            console.log(response.data)

        } catch (error: any) {
            // error.response 可能包含来自服务器的响应对象
            if (error.response) {
                console.error('响应状态码:', error.response.status);
                console.error('错误响应数据:', error.response.data);
            } else {
                console.error('请求失败:', error.message);
            }
        }
    }

    useEffect(() => {
        handleRequest()
    }, []);

    return (

        <Map zoom={12} center={center} enableScrollWheelZoom={true}>

            {/* 标记 */}
            <Marker ref={markerRef} position={center} icon={iconR}
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






