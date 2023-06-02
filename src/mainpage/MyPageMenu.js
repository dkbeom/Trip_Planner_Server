import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Update from './Update' 


function MyPageMenu() {
  const [showModal, setShowModal] = useState(false);
  const handleModalClose = () => setShowModal(false);
  const handleModalToggle = () => {
    setShowModal(prevState => !prevState);
  };

  return (
    <div>
      <h1>My Page</h1>
      <div>
     
      <div className='dd' style={{ fontSize: "20px", marginRight: "200px" }}>
      <Update show={showModal} handleClose={handleModalClose} />
        </div>
      </div>
      <div>
        <Link to="/sample">
          <button>내 일정 보기</button>
        </Link>
      </div>

      {showModal && (
        <div className="modal">
          <div className="modal-content">
            {/* 모달 폼 내용을 구현하세요 */}
            <h2>내 정보 수정</h2>
            {/* 폼 요소들과 필요한 이벤트 핸들러를 추가하세요 */}
          </div>
        </div>
      )}
    </div>
  );
}

export default MyPageMenu;
