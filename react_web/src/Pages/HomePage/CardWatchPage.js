import { Card, Row, Button, Col } from "react-bootstrap"
const CardWatchPage = () => {

    return (
        <div main-page>
            <div className="container-watch">

                <div className="box-left">
                    <img alt="" src="https://templates.microweber.com/simple-shop/userfiles/cache/thumbnails/1080/tn-glassess-1443650118.webp"></img>
                </div>
                <div className="box-right">
                    <Card style={{ width: '40rem' }}>
                        <Card.Header><h3>Sunglasses</h3></Card.Header>
                        <Card.Body style={{ width: '40rem' }}>
                            <Row style={{width:"40rem"}} xs={4} md={8} class="mx-4">
                                <Card.Title style={{ marginRight:'300px'}}>$ 57.00</Card.Title> 
                                 <Card.Title> .In Stock (0) </Card.Title>
                            </Row>
                            <span>SKU - Sunglasses</span> <br /><br />
                            <span>This text is a description of the product.</span> <br /><br />
                            <span>The description of a product can significantly increase its sales. Try to describe the characteristics and all
                                its qualities. A good product description leads to a better performance. Try to describe in the best
                                way the product you are selling so that the consumer can understand its qualities.
                            </span>
                        </Card.Body>
                        <Card.Footer>
                            <Row xs={4} md={8}>
                                <Card.Subtitle style={{ marginRight:'300px'}}>price : $ 57.00</Card.Subtitle>
                                <Button>ADD TO CARD</Button>
                            </Row>
                        </Card.Footer>
                    </Card>
                </div>

            </div>
        </div>
    )

}

export default CardWatchPage;