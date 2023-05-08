import Carousel from 'react-bootstrap/Carousel';

function UncontrolledExample() {
  return (
    <Carousel>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/first_page.png"
          alt="First slide"
        />
        <Carousel.Caption>
          <h3>맞춤형 여행지</h3>
          <p>오직 당신을 위해 맞춰진 특별한 여행을 누리세요!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/second_page.png"
          alt="Second slide"
        />

        <Carousel.Caption>
          <h3>최적의 동선</h3>
          <p>최적의 동선으로 효율적인 여행을 누리세요!</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="/third_page.png"
          alt="Third slide"
        />

        <Carousel.Caption>
          <h3>시간별 스케줄</h3>
          <p>
            보기 좋게 정리된 스케줄로 편안한 여행을 누리세요!
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default UncontrolledExample;