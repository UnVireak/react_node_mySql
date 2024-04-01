
import {Link, useNavigate} from "react-router-dom"
import { useState } from 'react';
import { Button, Card, Col, Row,Space, Text} from 'antd';
import CardWatchPage from "./CardWatchPage";
const { Meta } = Card;
const HomePage = () => {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const x = 7;
    const arrPerson = ["Dara", 10, 2002]
    const arrObj = [
        {
            id: 101,
            Name: "Dara",
            age: 20
        },
        {
            id: 102,
            Name: "Daro",
            age: 22
        }
    ]
    const navigate = useNavigate();
    const onClickMenu = (value) => {
        navigate(value);
    }
    return (

        <div main-box>

            <div className='box-container'>
                <div><Row gutter={16}>
                    <Col span={8} >
                    <div onClick={()=>onClickMenu ("/Watch")}>
                        <Card bordered={true} className='box1'
                            cover={<img src='https://templates.microweber.com/simple-shop/userfiles/cache/thumbnails/850/tn-glassess-3534825388.webp' alt='example' 
                         />}>
                            <Meta title="Red watch" description="$57.00"/>     
                           <Button>Buy</Button>
                           
                        </Card>
                 </div> 
                    </Col>
                    <Col span={8} >
                        <Card bordered={true} className='box1'

                            cover={<img alt='example' src='https://templates.microweber.com/simple-shop/userfiles/cache/thumbnails/850/tn-watch-1074698374.webp' />}>
                             <Meta title="Sunglasses" description="$57.00"/> 
                            <Button >Buy</Button>
                           
                        </Card>
                    </Col>
                    <Col span={8} >
                        <Card bordered={true} className='box1'
                            cover={<img alt='example' src='https://templates.microweber.com/simple-shop/userfiles/cache/thumbnails/850/tn-elen-3974214402.webp' />}>
                             <Meta  title="Sunglasses" description  ="$89.00"/> 
                            <Button>Buy</Button>
                        </Card>
                    </Col>
                </Row>
                </div>
                <br/>
                
                <div><Row gutter={16}>
                    <Col span={8} >
                        <Card bordered={true} className='box1'
                            cover={<img src='https://templates.microweber.com/simple-shop/userfiles/cache/thumbnails/850/tn-glassess-3534825388.webp' alt='example' />}>
                            <Meta title="Red watch" description="$57.00"/>     
                           <Button>Buy</Button>
                        </Card>
                    </Col>
                    <Col span={8} >
                        <Card bordered={true} className='box1'

                            cover={<img alt='example' src='https://templates.microweber.com/simple-shop/userfiles/cache/thumbnails/850/tn-watch-1074698374.webp' />}>
                             <Meta title="Sunglasses" description="$57.00"/> 
                            <Button >Buy</Button>
                           
                        </Card>
                    </Col>
                    <Col span={8} >
                        <Card bordered={true} className='box1'
                            cover={<img alt='example' src='https://templates.microweber.com/simple-shop/userfiles/cache/thumbnails/850/tn-elen-3974214402.webp' />}>
                             <Meta  title="Sunglasses" description  ="$89.00"/> 
                            <Button>Buy</Button>
                        </Card>
                    </Col>
                </Row>
                </div>
            </div>
        </div>
    );


}
export default HomePage;