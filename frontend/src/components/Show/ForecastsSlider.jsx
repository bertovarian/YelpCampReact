import Slider from "react-slick";
import { Card } from 'react-bootstrap';

const ForecastSlider = ({ forecast }) => {
    const weatherSliderSettings = {
        dots: false,
        infinite: false,
        speed: 500,
        slidesToShow: 3, // Adjust based on card size and screen
        slidesToScroll: 3,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                },
            },
            {
                breakpoint: 480,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                },
            },
        ],
    };

    return (
        <Card className="weather-card p-0 mx-0">
            <Card.Body>
                <Slider {...weatherSliderSettings}>
                    {forecast.map((item, index) => {
                        const iconCode = item.weather[0].icon;
                        const date = new Date(item.dt_txt);
                        const day = date.toLocaleDateString(undefined, { weekday: 'short' });
                        const hour = date.getHours();
                        const isDay = hour >= 6 && hour < 18;
                        const iconUrl = `https://openweathermap.org/img/wn/${iconCode.replace(/[dn]/, isDay ? 'd' : 'n')}@2x.png`;

                        return (
                            <div key={index} className="px-2">
                                <div className="text-center border rounded p-2 mx-1" style={{ backgroundColor: '#f9f9f9' }}>
                                    <div className="fw-semibold">{day}</div>
                                    <div className="text-muted" style={{ fontSize: '0.8em' }}>{hour}:00</div>
                                    <div className="d-flex justify-content-center"><img src={iconUrl} alt={item.weather[0].description} style={{ width: '50px' }} /></div>
                                    <div>{Math.round(item.main.temp)}°C</div>
                                    <small>{item.weather[0].main}</small>
                                </div>
                            </div>
                        );
                    })}
                </Slider>
            </Card.Body>
        </Card>
    );
}

export default ForecastSlider;
